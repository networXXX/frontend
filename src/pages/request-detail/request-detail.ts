import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';

@Component({
    selector: 'page-request-detail',
    templateUrl: 'request-detail.html'
})
export class RequestDetailPage {

    item: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService) {
        this.item = this.navParams.data;
        // service.findById(this.broker.id).then(
        //     broker => this.broker = broker
        // );
    }

}
