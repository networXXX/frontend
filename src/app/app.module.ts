import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HaversineService } from "ng2-haversine";
import { NgPipesModule } from 'ngx-pipes';

import { DefaultApi } from './../providers/api/DefaultApi';
import { AppConstants } from './../constants/app.constants';
import { MyApp } from './app.component';
//import {WelcomePage} from '../pages/welcome/welcome';
import {LocationListPage} from '../pages/location-list/location-list';
import {LocationDetailPage} from '../pages/location-detail/location-detail';
import {FriendListPage} from '../pages/friend-list/friend-list';
import {FriendDetailPage} from '../pages/friend-detail/friend-detail';
import {RequestListPage} from '../pages/request-list/request-list';
import {AboutPage} from '../pages/about/about';
import {PropertyService} from "../providers/property-service-mock";
import {BrokerService} from "../providers/broker-service-mock";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { LogoutPage } from '../pages/logout/logout';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    //WelcomePage,
    AboutPage,
    LocationListPage,
    LocationDetailPage,
    RequestListPage,
    FriendListPage,
    FriendDetailPage,
    LoginPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgPipesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //WelcomePage,
    AboutPage,
    LocationListPage,
    LocationDetailPage,
    RequestListPage,
    FriendListPage,
    FriendDetailPage,
    LoginPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PropertyService,
    BrokerService,
    HaversineService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConstants,
    DefaultApi,
    Facebook
  ]
})
export class AppModule {}
