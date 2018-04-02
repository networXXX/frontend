import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
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

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
                private _haversineService: HaversineService, private storage: Storage,
                public menu: MenuController) {
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
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                //this.location = position.coords;
                console.log(position.coords); 
                let madrid: GeoCoord = {
                    latitude: 33.91918,
                    longitude: -118.416465
                };

//El Segundo, CA, USA
//atitude: 33.91918 | Longitude: -118.416465

                let current: GeoCoord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                let meters = this._haversineService.getDistanceInMeters(madrid, current);
                let kilometers = this._haversineService.getDistanceInKilometers(madrid, current);
                let miles = this._haversineService.getDistanceInMiles(madrid, current);
 
                console.log(`
                    The distance between Current and Bilbao is:
                        - ${meters} meters
                        - ${kilometers} kilometers
                        - ${miles} miles
                `);
          });
        }

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
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
