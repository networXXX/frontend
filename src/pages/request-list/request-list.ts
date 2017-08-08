import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock';
import {LocationDetailPage} from '../location-detail/location-detail';

@Component({
    selector: 'page-request-list',
    templateUrl: 'request-list.html'
})
export class RequestListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: PropertyService) {
        this.getFavorites();
    }

    itemTapped(favorite) {
        this.navCtrl.push(LocationDetailPage, favorite.property);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
