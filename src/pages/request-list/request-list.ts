import { OnInit, Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { DefaultApi } from '../../providers/api/DefaultApi';
import { RequestDetailPage } from '../request-detail/request-detail';
import * as models  from '../../providers/model/models';
import { Storage } from '@ionic/storage';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'page-request-list',
    templateUrl: 'request-list.html'
})
export class RequestListPage implements OnInit {

  loading: Loading;
  icons: string[];
  items: Array<models.User>;
  noMoreItemsAvailable: boolean = false; 

  searchInput: string = '';
  QUERY_STR: string = '';
  LIMIT: string = '15'
  CURSOR: string = undefined;
  SEARCH_TEXT: string = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: DefaultApi,
              private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.items = [];    
  }

  ngOnInit(): any {

    this.storage.get('user').then((val) => {  
      if (val === undefined || val === null) {
        this.navCtrl.setRoot('LoginPage');
      } else {
        let loginUser: models.LoginUserResponse = val; 
        this.QUERY_STR = 'userId:' + loginUser.item.id;   
        this.api.configuration = Utils.getConfiguration(loginUser); 
        //this.getUsers(this.QUERY_STR);  
      }        
    });    
  }  

  getUsers(query:string) {
    if (this.noMoreItemsAvailable == false) {
      this.showLoading(); 
    }
    this.api.usersSearchGet(query, this.LIMIT, this.CURSOR).subscribe(response => {   
        if (response != null && response.items.length > 0) {                    
          response.items.forEach(property => {
            this.items.push(property);
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

  doInfinite(infiniteScroll) {
    if (this.noMoreItemsAvailable == true) {
      this.noMoreItemsAvailable = false;
      setTimeout(() => {
        if (this.SEARCH_TEXT !== undefined) {
          this.getUsers(this.SEARCH_TEXT);
        } else {
          this.getUsers(this.QUERY_STR);
        }
        
        infiniteScroll.complete();
      }, 500);
    }
  }


  itemTapped(event, item) {
    console.log("itemTapped");
    console.log(item)
    this.navCtrl.push(RequestDetailPage, { 'secret': item });
  }

  addItem(item) {

  }

  onInput(event) {
    
    if (this.searchInput.length >= 3) {
      this.items = [];
      this.CURSOR = undefined;
      this.SEARCH_TEXT = this.QUERY_STR + '&searchText:' + this.searchInput;
      this.getUsers(this.SEARCH_TEXT);
    } else if (this.searchInput.length == 0) {
      this.SEARCH_TEXT = undefined;
      this.CURSOR = undefined;
      this.items = [];
      this.getUsers(this.QUERY_STR);
    } 

    
  }

  onCancel(event) {

  }

  // presentConfirm(event, secret) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Confirm delete',
  //     message: 'Do you want to delete this secret?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           //console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Ok',
  //         handler: () => {            
  //           this.deleteItem(secret);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }  

  openAdd() {
    this.navCtrl.push('AddSecret');
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
