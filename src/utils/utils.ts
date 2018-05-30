import { Injectable } from "@angular/core";
import * as models from "../providers/model/models";
import { Configuration } from "../providers/configuration";

import * as CryptoJS from "crypto-js/crypto-js";
import { UserStorage } from "../providers/user-storage";
import { GeoCoord } from "ng2-haversine";

@Injectable()
export class Utils {
  
  static getConfiguration(loginUser: models.LoginUserResponse): Configuration {
    let configuration: Configuration = new Configuration();
    let map: { [key: string]: string } = {};
    map["Authorization"] = loginUser.token;
    configuration.apiKeys = map;
    if (loginUser.auth !== undefined) {
      configuration.accessToken = loginUser.auth.token;
    }
    configuration.username = loginUser.item.email;
    configuration.withCredentials = false;
    return configuration;
  }

  static getConfig(user: UserStorage): Configuration {
    let configuration: Configuration = new Configuration();
    let map: { [key: string]: string } = {};
    map["Authorization"] = user.token;
    configuration.apiKeys = map;
    if (user.auth !== undefined) {
      configuration.accessToken = user.auth;
    }
    configuration.username = user.email;
    configuration.withCredentials = false;
    return configuration;
  }

  static getDEcryptedCode(pwd: string, key: string): string {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(pwd.toString(), key);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }

  static getEncryptCode(pwd: string, key: string): string {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(pwd, key);
    return ciphertext.toString();
  }

  public static convertToUserStorage(user: models.LoginUserResponse ): UserStorage {
    let userStorage: UserStorage = {} as UserStorage;
    userStorage.displayName = user.item.displayName;
    userStorage.email = user.item.email;
    userStorage.id = user.item.id;
    userStorage.imageUrl = user.item.imageUrl;
    userStorage.status = user.item.status;
    userStorage.token = user.auth.token;
    userStorage.displayName = user.item.displayName;
    userStorage.auth = user.auth.token;

    let location: GeoCoord = {
      latitude: 0,
      longitude: 0
    };
    location.latitude = user.item.lat;
    location.longitude = user.item.lng;
    userStorage.pos = location;

    return userStorage;
  }
}
