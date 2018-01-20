import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {FriendDetailPage} from '../friend-detail/friend-detail';
import {PropertyService} from '../../providers/property-service-mock';

import leaflet from 'leaflet';

@Component({
    selector: 'page-location-detail',
    templateUrl: 'location-detail.html'
})
export class LocationDetailPage {

    property: any;
    map;
    markersGroup;
    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController) {
        this.property = this.navParams.data;
        propertyService.findById(this.property.id).then(
            property => this.property = property
        );
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(FriendDetailPage, broker);
    }

    favorite(property) {
        this.propertyService.favorite(property)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

    showMap(property) {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([property.lat, property.long], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers(property);
        })
    }

    showMarkers(property) {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        
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
                        {icon: myIcon, title: property.title});

                marker.data = property;
                this.markersGroup.addLayer(marker);
            }
        this.map.addLayer(this.markersGroup);
    }

}
