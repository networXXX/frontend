import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock';
import {LocationDetailPage} from '../location-detail/location-detail';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { RoundPipe } from 'ngx-pipes/src/app/pipes/math/round';

import leaflet from 'leaflet';

@Component({
    selector: 'page-location-list',
    templateUrl: 'location-list.html'
})
export class LocationListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    current: GeoCoord = {
            latitude: 0,
            longitude: 0
        };
    map;
    markersGroup;
    constructor(public navCtrl: NavController, public service: PropertyService, 
                public config: Config, private _haversineService: HaversineService) {
        this.getLocation();
        this.findAll();
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
