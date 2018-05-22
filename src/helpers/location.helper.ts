import {Injectable} from '@angular/core';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { DefaultService } from '../providers/api/default.service';

import * as models  from '../providers/model/models';
import { Utils } from '../utils/utils';

@Injectable()
export class LocationHelper {

    constructor(private storage: Storage, private api: DefaultService, private _haversineService: HaversineService) {

    }

    doUpdate(pos: Coordinates) {
        this.storage.get('curPos').then((val) => {

            if (val === undefined || val === null) {
                this.updateLocation(pos);                
            } else {
                let oldPos: GeoCoord = {
                    latitude: val.latitude,
                    longitude: val.longitude
                };

                let curPos: GeoCoord = {
                    latitude: pos.latitude,
                    longitude: pos.longitude
                };

                let meters = this._haversineService.getDistanceInMeters(oldPos, curPos); 

                //Checks whether it has got a new position
                if (meters > 200) {
                    console.log(meters);
                    this.updateLocation(pos);
                } 

            }
        });
    }    

    updateLocation(cur: Coordinates) {
        this.storage.get('user').then((val) => {  
            if (val === undefined || val === null) {

                // this.rootPage = LoginPage;
                // this.nav.setRoot('LoginPage');

            } else {

                let loginUser: models.LoginUserResponse = val; 
        
                this.api.configuration = Utils.getConfiguration(loginUser); 
                var request: models.UpdateLocationRequest = {} as models.UpdateLocationRequest;
                request.userId = loginUser.item.id;

                request.lng = cur.longitude;
                request.lat = cur.latitude; 

                this.api.usersUpdatelocationPost(request).subscribe(response => {
                    this.storage.set('curPos', cur);
                },
                error => {                    
                    console.log(error);                      
                });

            }       
             
        });  
    }

}
