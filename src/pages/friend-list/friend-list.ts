import {Component, OnInit} from '@angular/core';
import {NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';
import {FriendDetailPage} from '../friend-detail/friend-detail';

import { DefaultService } from '../../providers/api/default.service';
import * as models  from '../../providers/model/models';
import { Storage } from '@ionic/storage';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'page-friend-list',
    templateUrl: 'friend-list.html'
})
export class FriendListPage implements OnInit {

    brokers: Array<any>;
	loading: Loading;
	LIMIT: string = '15'
  	CURSOR: string = undefined;
  	QUERY_STR: string = '';
    noMoreItemsAvailable: boolean = false;
    userId: string = undefined;

    items: Array<models.User>;

    constructor(public navCtrl: NavController, public service: BrokerService,  private loadingCtrl: LoadingController,
    	private api: DefaultService, private storage: Storage , private alertCtrl: AlertController) {
        //service.findAll().then(data => this.brokers = data);
    }

    ngOnInit(): any {

debugger;
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

    openBrokerDetail(broker) {
        this.navCtrl.push(FriendDetailPage, broker);
    }

    getRequestingUsers(query:string) {
    if (this.noMoreItemsAvailable == false) {
      this.showLoading(); 
    }
    this.api.usersSearchGet(query, this.LIMIT, this.CURSOR).subscribe(response => {   
        if (response != null && response.items.length > 0) {                    
          response.items.forEach(property => {
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

}
