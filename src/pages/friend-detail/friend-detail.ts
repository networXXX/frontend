import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';

@Component({
    selector: 'page-friend-detail',
    templateUrl: 'friend-detail.html'
})
export class FriendDetailPage {

    broker: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService) {
        this.broker = this.navParams.data;
        service.findById(this.broker.id).then(
            broker => this.broker = broker
        );
    }

}
