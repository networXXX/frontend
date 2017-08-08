import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';
import {FriendDetailPage} from '../friend-detail/friend-detail';

@Component({
    selector: 'page-friend-list',
    templateUrl: 'friend-list.html'
})
export class FriendListPage {

    brokers: Array<any>;

    constructor(public navCtrl: NavController, public service: BrokerService) {
        service.findAll().then(data => this.brokers = data);
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(FriendDetailPage, broker);
    }

}
