import { UserStorage } from './../providers/user-storage';
import { AppConstants } from './../constants/app.constants';
import { UserResponse } from './../providers/model/userResponse';
import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController, AlertController, NavController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HaversineService, GeoCoord } from "ng2-haversine";

import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import {LocationListPage} from '../pages/location-list/location-list';
import {FriendListPage} from '../pages/friend-list/friend-list';
import {RequestListPage} from '../pages/request-list/request-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import { DefaultService } from '../providers/api/default.service';

import {ObjectObserverFactory} from 'typescript-object-observer';

import * as models  from '../providers/model/models';
import { Utils } from '../utils/utils';
import {Observable} from 'rxjs'


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    current: GeoCoord = undefined;

    inprogress: Boolean = false;

    user: UserStorage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
                private _haversineService: HaversineService, private storage: Storage,
                public menu: MenuController, private alertCtrl: AlertController, private api: DefaultService) {
        
        this.initializeApp();

        this.appMenuItems = [
            {title: 'Locations', component: LocationListPage, icon: 'home'},
            {title: 'Friends', component: FriendListPage, icon: 'people'},
            {title: 'Request', component: RequestListPage, icon: 'star'},
            //{title: 'Approved', component: WelcomePage, icon: 'checkmark-circle'},
        ];

        this.accountMenuItems = [
            {title: 'My Account', component: WelcomePage, icon: 'ios-contact'},
            {title: 'Logout', component: LogoutPage, icon: 'log-out'},
        ];

        this.helpMenuItems = [
            //{title: 'Welcome', component: WelcomePage, icon: 'bookmark'},
            {title: 'About', component: AboutPage, icon: 'information-circle'}
        ];
    }

    initializeApp() {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });

        this.scheduleUpdatePos();
    }

    doUpdatePos() {
        if (this.inprogress == false) {
            console.log("doUpdatePos()...");
                
            if(navigator.geolocation){
                this.inprogress = true;
                navigator.geolocation.getCurrentPosition(position => {
                    let cur: GeoCoord = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    this.processLocation(cur);
                });
            } else {
                //this.storage.set('curPos', undefined);
                this.rootPage = LoginPage;
                this.nav.setRoot(this.rootPage);   
            }

        }
    }

    scheduleUpdatePos() {
        Observable.interval(5000000).subscribe(()=>{
            this.doUpdatePos();
        });
    }

    processLocation(newPos: GeoCoord) {

        if (this.current === undefined || this.current === null) {

            this.doProcessUpdate(newPos);
        } else {

            let oldPos: GeoCoord = {
                latitude: this.current.latitude,
                longitude: this.current.longitude
            };

            let meters = this._haversineService.getDistanceInMeters(oldPos, newPos); 

            if (meters > AppConstants.MAX_METER) {
                console.log(meters);
                this.doProcessUpdate(newPos);
            } else {
                console.log("< 200 meter");
                this.inprogress = false;
            }
        }

    }

    doProcessUpdate(newPos: GeoCoord) {
        this.current = newPos;
        if (this.user === undefined || this.user === null) {
            this.storage.get('user').then((val) => { 
                debugger; 
                if (val === undefined || val === null) {
    
                    this.rootPage = LoginPage;
                    this.nav.setRoot('LoginPage');
    
                } else {
                    this.user = val;
                    this.updateLocation(newPos, val);
              }        
            });  
        } else {
            this.updateLocation(newPos, this.user);
        }
        
    }

     /**
     * Updates user location
     * @param cur 
     * @param user 
     */
    updateLocation(cur: GeoCoord, userStorage: UserStorage) {
        this.api.configuration = Utils.getConfig(userStorage); 
        var request: models.UpdateLocationRequest = {} as models.UpdateLocationRequest;

        request.userId = userStorage.id;
        request.lng = cur.longitude;
        request.lat = cur.latitude;
        this.user.pos = cur;

        this.api.usersUpdatelocationPost(request).subscribe(response => {
            this.storage.set('user', cur);
        },
        error => {                    
            console.log(error);                      
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        debugger;
        this.menu.close();
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        //this.nav.setRoot(page.component);
        if (page.title == 'Logout') {
            this.storage.set('user', null);
            this.nav.setRoot(this.rootPage);
        } else {
            this.nav.setRoot(page.component);
        }
    }
}
