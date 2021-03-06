import {OnInit, Component} from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';

import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';
import { Utils } from '../../utils/utils';
import { DefaultService } from '../../providers/api/default.service';

import * as models  from '../../providers/model/models';


@Component({
    selector: 'page-request-detail',
    templateUrl: 'request-detail.html'
})
export class RequestDetailPage implements OnInit {

    item: any;
    loading: Loading;
    requestForm: FormGroup;
    userId: string = '';
    status: string = '';
    submitBtn: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService,
    	public formBuilder: FormBuilder, private storage: Storage, private api: DefaultService,
    	private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
        this.item = this.navParams.data.request;
    }

    ngOnInit(): any {
	    this.requestForm = this.formBuilder.group({}
	    );

	    this.storage.get('user').then((val) => {  
	      if (val === undefined || val === null) {
	        this.navCtrl.setRoot('LoginPage');
	      } else {
	        let loginUser: models.LoginUserResponse = val; 
	        this.userId = loginUser.item.id;   
	        this.api.configuration = Utils.getConfiguration(loginUser); 
	        this.getFriend(loginUser.item.id, this.item.id);
	      }        
	    });    
	}

	getFriend(userId:string, otherId:string) {
		let query:string = 'userId:' + userId + '&otherId:' + otherId;
		this.api.friendsSearchGet(query, '1', undefined).subscribe(response => {				
	    		if (response != null && response.items != null && response.items.length > 0) {
	    			let friend: models.Friend = response.items[0];
	    			if (friend.status === 'R') {
	    				this.status = 'Requesting';
	    				this.submitBtn = '+1 Request';
	    			} else if (friend.status === 'P') {
	    				this.status = 'Requested';
	    				this.submitBtn = 'Confirm';
	    			} else {
	    				this.status = 'Friend';
	    				this.submitBtn = 'Unfriend';
	    			}
	    		} else {
	    			this.submitBtn = 'Request';
	    		}
	        },
	          error => {
	            this.showError(error);          
	    });
	}

	requestFriend() {
		var request: models.RequestFriendRequest = {} as models.RequestFriendRequest;
	    request.userId = this.userId;
	    request.otherId = this.item.id;    

	    this.api.friendsRequestPost(request).subscribe(response => {
	          this.showOK();
	        },
	          error => {
	            this.showError(error);          
	        });
	}

	confirmFriend() {
		var request: models.RequestFriendRequest = {} as models.RequestFriendRequest;
	    request.userId = this.userId;
	    request.otherId = this.item.id;    

	    this.api.friendsConfirmPost(request).subscribe(response => {
	          this.showOK();
	        },
	          error => {
	            this.showError(error);          
	        });
	}

	unFriend() {
		var request: models.RequestFriendRequest = {} as models.RequestFriendRequest;
	    request.userId = this.userId;
	    request.otherId = this.item.id;    

	    this.api.friendsUnfriendPost(request).subscribe(response => {
	          this.showOK();
	        },
	          error => {
	            this.showError(error);          
	        });
	}

	onSubmit() {
	    this.showLoading();
	    if (this.requestForm.valid == true) {
	    	if (this.status === 'Requesting') {
	    		this.loading.dismiss();
	    		let alert = this.alertCtrl.create({
			      title: 'Message',
			      subTitle: 'Already requested',
			      buttons: ['OK']
			    });
			    alert.present();

	    	} else if (this.status === 'Requested') {
	    		this.confirmFriend();
	    	} else if (this.status === 'Friend') {
	    		this.unFriend();
	    	} else {
	    		this.requestFriend();
	    	}	      
	    } else {
	      this.showError('Please fix the error field.');
	    } 
	}

	showLoading() {
	    this.loading = this.loadingCtrl.create({
	      content: 'Please wait...',
	      dismissOnPageChange: true
	    });
	    this.loading.present();
	}

	showError(text) {
	    this.loading.dismiss();
	    let errorMsg = this.getErrorMessage(text);
	    let alert = this.alertCtrl.create({
	      title: 'Fail',
	      subTitle: errorMsg,
	      buttons: ['OK']
	    });
	    alert.present();
	}

	showOK() {
	    this.loading.dismiss();
	    let alert = this.alertCtrl.create({
	      title: 'Message',
	      subTitle: 'Successfully done.',
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
