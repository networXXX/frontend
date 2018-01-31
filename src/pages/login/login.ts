import { OnInit, Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { DefaultApi } from '../../providers/api/DefaultApi';
import { AppConstants } from '../../constants/app.constants';
import { Facebook } from '@ionic-native/facebook';

import { Storage } from '@ionic/storage';
import * as models  from '../../providers/model/models';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loading: Loading;
  registerCredentials = { email: '', password: '' }; 
  isLoggedIn:boolean = false; 
  users: any;      
 
  constructor(private nav: NavController,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private api: DefaultApi, private storage: Storage,private fb: Facebook) { 
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      if (val !== undefined && val !== null) {
        //let loginUser: models.LoginUserResponse = val;
        //if (AppConstants.KEY_STATUS === loginUser.item.status) {
        this.nav.setRoot('WelcomePage');
        //}    
      }
    });
  }
 
  public createAccount(event) {
    this.nav.push('RegisterPage');
  }

  public forgetPassword(event) {
    event.preventDefault();
    this.nav.push('ResetPasswordPage');
  }

  public login() {
    this.showLoading();
    this.storage.set('user', null); 
    if (this.registerCredentials.email === null || this.registerCredentials.password === null) {
      return this.showError("Please insert credentials");
    } else {
      let request: models.LoginUserRequest = {} as models.LoginUserRequest;
      request.email = this.registerCredentials.email;
      request.password = this.registerCredentials.password;
      this.api.loginPost(request).subscribe(response => {
        if (response.token !== null) {                       
          this.storage.set('user', response);          
          this.nav.setRoot('WelcomePage');
        } else {
          this.showError("Access Denied");
        }
        this.loading.dismiss();
      },
        error => {
          this.showError(error);                  
      });
    }          
  }  

  loginWithFB() {
    debugger;
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          console.log(res);
          debugger;
          this.isLoggedIn = true;
          this.getUserDetail(res);
          
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => {
         console.log('Error logging into Facebook', e)
         console.log(e); 
      });
  }
  getUserDetail(res) {
    let token: string = res.authResponse.accessToken;
    this.fb.api("/"+res.authResponse.userID+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        let request: models.LoginWithTokenRequest = {} as models.LoginWithTokenRequest;
        request.email = this.users.email;
        request.displayName = this.users.name;
        request.token = token;
        this.api.usersLoginwithfacebookPost(request).subscribe(response => {
          debugger;
          if (response.token !== null) {                       
            this.storage.set('user', response);          
            this.nav.setRoot('WelcomePage');
          } else {
            this.showError("Access Denied");
          }
          this.loading.dismiss();
        },
          error => {
            this.showError(error);                  
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
    let errorMsg = this.getErrorMessage(text)
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: errorMsg,
      buttons: ['OK']
    });
    alert.present();
  }  

  getErrorMessage(text): string {
    try {
      var object = JSON.parse(text._body);
      return object.errorMessage;
    } catch (e){
      return text;
    }
  }
}