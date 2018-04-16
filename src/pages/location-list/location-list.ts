import {Component, OnInit} from '@angular/core';
import {Config, NavController, IonicPage, LoadingController, Loading, AlertController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock';
import {LocationDetailPage} from '../location-detail/location-detail';
import { HaversineService, GeoCoord } from "ng2-haversine";
//import { RoundPipe } from 'ngx-pipes/src/app/pipes/math/round';

import leaflet from 'leaflet';

import { DefaultService } from '../../providers/api/default.service';
import * as models  from '../../providers/model/models';
import { Storage } from '@ionic/storage';
import { Utils } from '../../utils/utils';

@IonicPage()
@Component({
    selector: 'page-location-list',
    templateUrl: 'location-list.html'
})
export class LocationListPage implements OnInit {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    current: GeoCoord = {
            latitude: 0,
            longitude: 0
        };
    map;
    markersGroup;

    loading: Loading;
    LIMIT: string = '15'
    CURSOR: string = undefined;
    QUERY_STR: string = '';
    noMoreItemsAvailable: boolean = false;
    userId: string = undefined;

    items: Array<models.User>;

    constructor(public navCtrl: NavController, public service: PropertyService, 
                public config: Config, private _haversineService: HaversineService, 
                private storage: Storage, private api: DefaultService, 
                private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.items = []; 
        this.getLocation();
        this.findAll();
    }

    ngOnInit(): any {
        this.storage.get('user').then((val) => {  
          if (val === undefined || val === null) {
            this.navCtrl.setRoot('LoginPage');
          } else {
            let loginUser: models.LoginUserResponse = val; 
     
            this.QUERY_STR = 'userId:' + loginUser.item.id + '&status:Y';  
            this.userId = loginUser.item.id;  
            this.api.configuration = Utils.getConfiguration(loginUser); 
            this.getRequestingUsers(this.QUERY_STR); 
          }        
        });           
    }

    getRequestingUsers(query:string) {
        if (this.noMoreItemsAvailable == false) {
            this.showLoading(); 
        }
        this.api.friendsQueryuserGet(query, this.LIMIT, this.CURSOR).subscribe(response => {   
            if (response != null && response.items.length > 0) {                    
              response.items.forEach(property => {
                  debugger;
                if (property.id !== this.userId) {
                  this.items.push(property);
                }
              });
              this.CURSOR = response.nextPageToken;
              this.noMoreItemsAvailable = true;
            }
            this.closeLoading();
          },
            error => {
              this.showError(error);
        });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
    }

    closeLoading() {
        this.loading.dismiss();
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

    openPropertyDetail(property: any) {
        this.navCtrl.push(LocationDetailPage, property);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    openAddFriend() {
        debugger;
        this.navCtrl.push('AddFriendPage');
    }

    findAll() {
        this.service.findAll()
            .then(data => { 
                this.properties = data;

            })
            .catch(error => alert(error));
    }

    getLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                //this.location = position.coords;
                console.log(position.coords); 
                //debugger;
                this.current.latitude = position.coords.latitude;
                this.current.longitude = position.coords.longitude;
          });
        }
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        
        this.properties.forEach(property => {
            if (property.lat, property.long) {
                let myIcon = leaflet.icon({
                            iconUrl: property.thumbnail,
                            iconSize: [38, 38],
                            iconAnchor: [22, 94],
                            popupAnchor: [-3, -76],
                            shadowUrl: '',
                            shadowSize: [68, 95],
                            shadowAnchor: [22, 94]
                        });
                let marker: any = leaflet.marker([property.lat, property.long], 
                        {icon: myIcon, title: property.title}).on('click', event => this.openPropertyDetail(event.target.data));

                marker.data = property;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

    calcDistance(property) {
        if (property.distance == 0) {
            let location: GeoCoord = {
                latitude: property.lat,
                longitude: property.long
            }
            property.distance = this._haversineService.getDistanceInKilometers(location, this.current);
            //property.distance = 2;
            console.log(property.distance);
        }
        
    }

}
