import {OnInit, Component} from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage implements OnInit {

	constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
	    
	}

	ngOnInit(): any {
		this.storage.get('user').then((val) => {  

	      if (val === undefined || val === null) {
	        this.navCtrl.setRoot('LoginPage');
	      } else {
	        // let loginUser: models.LoginUserResponse = val; 
	        // this.QUERY_STR = 'userId:' + loginUser.item.id;   
	        // this.api.configuration = Utils.getConfiguration(loginUser); 
	        // this.getSecrets(this.QUERY_STR);  
	      }        
	    });  

	}
}
