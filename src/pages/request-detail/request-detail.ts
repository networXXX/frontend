import {OnInit, Component} from '@angular/core';
import {NavController, NavParams, Loading} from 'ionic-angular';
import {BrokerService} from '../../providers/broker-service-mock';

import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

import * as models  from '../../providers/model/models';

@Component({
    selector: 'page-request-detail',
    templateUrl: 'request-detail.html'
})
export class RequestDetailPage implements OnInit {

    item: any;
    loading: Loading;
    requestForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService,
    	public formBuilder: FormBuilder,) {
        this.item = this.navParams.data.request;
    }

    ngOnInit(): any {
	    this.requestForm = this.formBuilder.group({}
	    );
	}

	onSubmit() {
	    this.showLoading();
	    // if (this.requestForm.valid == true) {
	    //   var request: models.RegisterUserRequest = {} as models.RegisterUserRequest;
	    //   request.password = this.userInfo.password;
	    //   request.displayName = this.userInfo.name;
	    //   request.email = this.userInfo.email;      

	    //   this.api.registerPost(request).subscribe(response => {
	    //       this.navCtrl.push('ActivatePage');
	    //     },
	    //       error => {
	    //         this.showError(error);          
	    //     });

	    // } else {
	    //   this.showError('Please fix the error field.');
	    // } 
	}

	showLoading() {
	    // this.loading = this.loadingCtrl.create({
	    //   content: 'Please wait...',
	    //   dismissOnPageChange: true
	    // });
	    // this.loading.present();
	  }

	showError(text) {
	  //   this.loading.dismiss();
	  //   let errorMsg = this.getErrorMessage(text)
	  //   let alert = this.alertCtrl.create({
	  //     title: 'Fail',
	  //     subTitle: errorMsg,
	  //     buttons: ['OK']
	  //   });
	  //   alert.present();
	  }  

}
