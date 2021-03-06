webpackJsonp([9],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_property_service_mock__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_detail_location_detail__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_haversine__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_haversine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_haversine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { RoundPipe } from 'ngx-pipes/src/app/pipes/math/round';

var LocationListPage = (function () {
    function LocationListPage(navCtrl, service, config, _haversineService) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.config = config;
        this._haversineService = _haversineService;
        this.searchKey = "";
        this.viewMode = "list";
        this.current = {
            latitude: 0,
            longitude: 0
        };
        this.getLocation();
        this.findAll();
    }
    LocationListPage.prototype.ngOnInit = function () {
    };
    LocationListPage.prototype.openPropertyDetail = function (property) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__location_detail_location_detail__["a" /* LocationDetailPage */], property);
    };
    LocationListPage.prototype.onInput = function (event) {
        var _this = this;
        this.service.findByName(this.searchKey)
            .then(function (data) {
            _this.properties = data;
            if (_this.viewMode === "map") {
                _this.showMarkers();
            }
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    LocationListPage.prototype.onCancel = function (event) {
        this.findAll();
    };
    LocationListPage.prototype.openAddFriend = function () {
        debugger;
        this.navCtrl.push('AddFriendPage');
    };
    LocationListPage.prototype.findAll = function () {
        var _this = this;
        this.service.findAll()
            .then(function (data) {
            _this.properties = data;
        })
            .catch(function (error) { return alert(error); });
    };
    LocationListPage.prototype.getLocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                //this.location = position.coords;
                console.log(position.coords);
                //debugger;
                _this.current.latitude = position.coords.latitude;
                _this.current.longitude = position.coords.longitude;
            });
        }
    };
    LocationListPage.prototype.showMap = function () {
        var _this = this;
        setTimeout(function () {
            _this.map = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.map("map").setView([42.361132, -71.070876], 14);
            __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(_this.map);
            _this.showMarkers();
        });
    };
    LocationListPage.prototype.showMarkers = function () {
        var _this = this;
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.layerGroup([]);
        this.properties.forEach(function (property) {
            if (property.lat, property.long) {
                var myIcon = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.icon({
                    iconUrl: property.thumbnail,
                    iconSize: [38, 38],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowUrl: '',
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                });
                var marker = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.marker([property.lat, property.long], { icon: myIcon, title: property.title }).on('click', function (event) { return _this.openPropertyDetail(event.target.data); });
                marker.data = property;
                _this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    };
    LocationListPage.prototype.calcDistance = function (property) {
        if (property.distance == 0) {
            var location_1 = {
                latitude: property.lat,
                longitude: property.long
            };
            property.distance = this._haversineService.getDistanceInKilometers(location_1, this.current);
            //property.distance = 2;
            console.log(property.distance);
        }
    };
    LocationListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-location-list',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\location-list\location-list.html"*/'<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-searchbar [(ngModel)]="searchKey" (ionInput)="onInput($event)"\n\n                       (ionCancel)="onCancel($event)"></ion-searchbar>\n\n        <ion-buttons end>\n\n            <button (click)="openAddFriend()" ion-button>\n\n                +\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="property-list">\n\n\n\n    <ion-list *ngIf="viewMode===\'list\'">\n\n\n\n        <ion-item-sliding *ngFor="let property of properties">\n\n            \n\n                <button ion-item (click)="openPropertyDetail(property)">\n\n                    <ion-thumbnail item-left>\n\n                        <img src="{{property.thumbnail}}"/>\n\n                    </ion-thumbnail>\n\n                    <h2>{{property.title}}</h2>\n\n                    {{ calcDistance(property) }}\n\n                    <p>{{property.city}}, {{property.state}} ∙ {{ property.distance | round }} km</p>\n\n\n\n                </button>\n\n                <ion-item-options>\n\n                    <button danger (click)="deleteItem(property)">Delete</button>\n\n                </ion-item-options>\n\n            \n\n        </ion-item-sliding>\n\n\n\n    </ion-list>\n\n\n\n    <div *ngIf="viewMode===\'map\'" style="width:100%;height:100%;" id="map"></div>\n\n\n\n</ion-content>\n\n\n\n<ion-footer padding>\n\n    <ion-segment [(ngModel)]="viewMode">\n\n        <ion-segment-button value="list">\n\n            <ion-icon name="list"></ion-icon>\n\n        </ion-segment-button>\n\n        <ion-segment-button value="map" (ionSelect)="showMap()">\n\n            <ion-icon name="map"></ion-icon>\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\location-list\location-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_property_service_mock__["a" /* PropertyService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_4_ng2_haversine__["HaversineService"]])
    ], LocationListPage);
    return LocationListPage;
}());

//# sourceMappingURL=location-list.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(nav, alertCtrl, loadingCtrl, api, storage, fb) {
        var _this = this;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.storage = storage;
        this.fb = fb;
        this.registerCredentials = { email: '', password: '' };
        this.isLoggedIn = false;
        fb.getLoginStatus()
            .then(function (res) {
            console.log(res.status);
            if (res.status === "connect") {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log(e); });
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val !== undefined && val !== null) {
                //let loginUser: models.LoginUserResponse = val;
                //if (AppConstants.KEY_STATUS === loginUser.item.status) {
                _this.nav.setRoot('WelcomePage');
                //}    
            }
        });
    };
    LoginPage.prototype.createAccount = function (event) {
        this.nav.push('RegisterPage');
    };
    LoginPage.prototype.forgetPassword = function (event) {
        event.preventDefault();
        this.nav.push('ResetPasswordPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoading();
        this.storage.set('user', null);
        if (this.registerCredentials.email === null || this.registerCredentials.password === null) {
            return this.showError("Please insert credentials");
        }
        else {
            var request = {};
            request.email = this.registerCredentials.email;
            request.password = this.registerCredentials.password;
            this.api.loginPost(request).subscribe(function (response) {
                if (response.token !== null) {
                    _this.storage.set('user', response);
                    _this.nav.setRoot('WelcomePage');
                }
                else {
                    _this.showError("Access Denied");
                }
                _this.loading.dismiss();
            }, function (error) {
                _this.showError(error);
            });
        }
    };
    LoginPage.prototype.loginWithFB = function () {
        var _this = this;
        debugger;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                console.log(res);
                debugger;
                _this.isLoggedIn = true;
                _this.getUserDetail(res);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) {
            console.log('Error logging into Facebook', e);
            console.log(e);
        });
    };
    LoginPage.prototype.getUserDetail = function (res) {
        var _this = this;
        var token = res.authResponse.accessToken;
        this.fb.api("/" + res.authResponse.userID + "/?fields=id,email,name,picture,gender", ["public_profile"])
            .then(function (res) {
            console.log(res);
            _this.users = res;
            var request = {};
            request.email = _this.users.email;
            request.displayName = _this.users.name;
            request.token = token;
            _this.api.usersLoginwithfacebookPost(request).subscribe(function (response) {
                debugger;
                if (response.token !== null) {
                    _this.storage.set('user', response);
                    _this.nav.setRoot('WelcomePage');
                }
                else {
                    _this.showError("Access Denied");
                }
                _this.loading.dismiss();
            }, function (error) {
                _this.showError(error);
            });
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\login\login.html"*/'<!--\n\n  Generated template for the Login page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content class="login-content" padding>\n\n  <ion-row class="logo-row">\n\n    <ion-col></ion-col>\n\n    <ion-col width-67>\n\n      <img src="../assets/icon/network.png"/>\n\n    </ion-col>\n\n    <ion-col></ion-col>\n\n  </ion-row>\n\n  <div class="login-box">\n\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            \n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required \n\n              autocapitalize="off"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required autocapitalize="off"></ion-input>\n\n            </ion-item>\n\n            <button type="button" ion-button class="forget-btn" block clear (click)="forgetPassword($event)">Forget password</button>  \n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>      \n\n      \n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>          \n\n          \n\n        </ion-col>\n\n      </ion-row>         \n\n      \n\n    </form>\n\n    <ion-row center>  \n\n     <ion-col text-center>   \n\n      <button ion-button class="login-fb-btn" (click)="loginWithFB()">\n\n        Login with\n\n        <ion-icon name="logo-facebook"></ion-icon>\n\n      </button>\n\n     </ion-col> \n\n    </ion-row>\n\n    <button ion-button class="register-btn" block clear (click)="createAccount($event)">Create New Account</button>\n\n  </div>\n\n  \n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the Logout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LogoutPage = (function () {
    function LogoutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LogoutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Logout');
    };
    LogoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-logout',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\logout\logout.html"*/'<!--\n\n  Generated template for the Logout page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>logout</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\logout\logout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], LogoutPage);
    return LogoutPage;
}());

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 120:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 120;

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/activate/activate.module": [
		300,
		4
	],
	"../pages/add-friend/add-friend.module": [
		301,
		3
	],
	"../pages/change-password/change-password.module": [
		302,
		2
	],
	"../pages/location-list/location-list.module": [
		303,
		8
	],
	"../pages/login/login.module": [
		304,
		7
	],
	"../pages/logout/logout.module": [
		305,
		6
	],
	"../pages/register/register.module": [
		306,
		1
	],
	"../pages/reset-password/reset-password.module": [
		307,
		0
	],
	"../pages/welcome/welcome.module": [
		308,
		5
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 162;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Configuration; });
var Configuration = (function () {
    function Configuration() {
    }
    return Configuration;
}());

//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__friend_detail_friend_detail__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_property_service_mock__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LocationDetailPage = (function () {
    function LocationDetailPage(actionSheetCtrl, navCtrl, navParams, propertyService, toastCtrl) {
        var _this = this;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.propertyService = propertyService;
        this.toastCtrl = toastCtrl;
        this.property = this.navParams.data;
        propertyService.findById(this.property.id).then(function (property) { return _this.property = property; });
    }
    LocationDetailPage.prototype.openBrokerDetail = function (broker) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__friend_detail_friend_detail__["a" /* FriendDetailPage */], broker);
    };
    LocationDetailPage.prototype.favorite = function (property) {
        var _this = this;
        this.propertyService.favorite(property)
            .then(function (property) {
            var toast = _this.toastCtrl.create({
                message: 'Property added to your favorites',
                cssClass: 'mytoast',
                duration: 1000
            });
            toast.present(toast);
        });
    };
    LocationDetailPage.prototype.share = function (property) {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: function () { return console.log('share via twitter'); }
                },
                {
                    text: 'Facebook',
                    handler: function () { return console.log('share via facebook'); }
                },
                {
                    text: 'Email',
                    handler: function () { return console.log('share via email'); }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { return console.log('cancel share'); }
                }
            ]
        });
        actionSheet.present();
    };
    LocationDetailPage.prototype.showMap = function (property) {
        var _this = this;
        setTimeout(function () {
            _this.map = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.map("map").setView([property.lat, property.long], 14);
            __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(_this.map);
            _this.showMarkers(property);
        });
    };
    LocationDetailPage.prototype.showMarkers = function (property) {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.layerGroup([]);
        if (property.lat, property.long) {
            var myIcon = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.icon({
                iconUrl: property.thumbnail,
                iconSize: [38, 38],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76],
                shadowUrl: '',
                shadowSize: [68, 95],
                shadowAnchor: [22, 94]
            });
            var marker = __WEBPACK_IMPORTED_MODULE_4_leaflet___default.a.marker([property.lat, property.long], { icon: myIcon, title: property.title });
            marker.data = property;
            this.markersGroup.addLayer(marker);
        }
        this.map.addLayer(this.markersGroup);
    };
    LocationDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-location-detail',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\location-detail\location-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Property</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-card *ngIf="property.id">\n\n        <img src="{{property.picture}}"/>\n\n        <ion-card-content>\n\n            <h2 class="card-title">{{property.title}}</h2>\n\n            <p>{{property.address}}, {{property.city}} {{property.state}}</p>\n\n        </ion-card-content>\n\n        <ion-list>\n\n\n\n            <ion-item>\n\n                <ion-icon item-left name="moon"></ion-icon>\n\n                <h3>Latitude</h3>\n\n                <ion-note item-right>{{property.lat}}</ion-note>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-icon item-left name="leaf"></ion-icon>\n\n                <h3>Longitude</h3>\n\n                <ion-note item-right>{{property.long}}</ion-note>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-icon item-left name="pricetag"></ion-icon>\n\n                <h3>Distance</h3>\n\n                <ion-note item-right>{{property.distance | round}} km</ion-note>\n\n            </ion-item>\n\n            <button ion-item (click)="openBrokerDetail(property.broker)">\n\n                <ion-avatar item-left>\n\n                    <img src="{{property.thumbnail}}"/>\n\n                </ion-avatar>\n\n                <!--<h2>{{property.broker.name}}</h2>\n\n                <p>{{property.broker.title}}</p>-->\n\n                <p>Privious</p>\n\n            </button>\n\n        </ion-list>\n\n\n\n        <ion-item>\n\n            <button ion-button icon-left (click)="favorite(property)" clear item-left>\n\n                <ion-icon name="star"></ion-icon>\n\n                Favorite\n\n            </button>\n\n            <button ion-button icon-left (click)="share(property)" clear item-right>\n\n                <ion-icon name="contact"></ion-icon>\n\n                Contact\n\n            </button>\n\n        </ion-item>\n\n\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\location-detail\location-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_property_service_mock__["a" /* PropertyService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], LocationDetailPage);
    return LocationDetailPage;
}());

//# sourceMappingURL=location-detail.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_broker_service_mock__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__friend_detail_friend_detail__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FriendListPage = (function () {
    function FriendListPage(navCtrl, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        service.findAll().then(function (data) { return _this.brokers = data; });
    }
    FriendListPage.prototype.openBrokerDetail = function (broker) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__friend_detail_friend_detail__["a" /* FriendDetailPage */], broker);
    };
    FriendListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-friend-list',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\friend-list\friend-list.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Brokers</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <ion-list>\n\n\n\n        <button ion-item *ngFor="let broker of brokers" (click)="openBrokerDetail(broker)">\n\n            <ion-avatar item-left>\n\n                <img src="{{broker.picture}}"/>\n\n            </ion-avatar>\n\n            <h2>{{broker.name}}</h2>\n\n            <p>{{broker.title}}</p>\n\n        </button>\n\n\n\n    </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\friend-list\friend-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_broker_service_mock__["a" /* BrokerService */]])
    ], FriendListPage);
    return FriendListPage;
}());

//# sourceMappingURL=friend-list.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RequestListPage = (function () {
    function RequestListPage(navCtrl, navParams, api, storage, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.noMoreItemsAvailable = false;
        this.searchInput = '';
        this.QUERY_STR = '';
        this.LIMIT = '15';
        this.CURSOR = undefined;
        this.SEARCH_TEXT = undefined;
        this.items = [];
    }
    RequestListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val === undefined || val === null) {
                _this.navCtrl.setRoot('LoginPage');
            }
            else {
                var loginUser = val;
                _this.QUERY_STR = 'userId:' + loginUser.item.id;
                _this.api.configuration = __WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* Utils */].getConfiguration(loginUser);
                _this.getUsers(_this.QUERY_STR);
            }
        });
    };
    RequestListPage.prototype.getUsers = function (query) {
        var _this = this;
        if (this.noMoreItemsAvailable == false) {
            this.showLoading();
        }
        this.api.usersSearchGet(query, this.LIMIT, this.CURSOR).subscribe(function (response) {
            if (response != null && response.items.length > 0) {
                for (var i in response.items) {
                    //this.items.push(response.items[i]);
                }
                _this.CURSOR = response.nextPageToken;
                _this.noMoreItemsAvailable = true;
            }
            _this.closeLoading();
        }, function (error) {
            _this.showError(error);
        });
    };
    RequestListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.noMoreItemsAvailable == true) {
            //console.log(this.CURSOR);
            this.noMoreItemsAvailable = false;
            setTimeout(function () {
                if (_this.SEARCH_TEXT !== undefined) {
                    _this.getUsers(_this.SEARCH_TEXT);
                }
                else {
                    _this.getUsers(_this.QUERY_STR);
                }
                infiniteScroll.complete();
            }, 500);
        }
    };
    RequestListPage.prototype.itemTapped = function (event, secret) {
        //console.log("itemTapped");
        //console.log(secret)
        //this.navCtrl.push(SecretDetailsPage, { 'secret': secret });
    };
    RequestListPage.prototype.onInput = function (event) {
        if (this.searchInput.length >= 3) {
            this.items = [];
            this.CURSOR = undefined;
            console.log(this.searchInput);
            this.SEARCH_TEXT = this.QUERY_STR + '&searchText:' + this.searchInput;
            this.getUsers(this.SEARCH_TEXT);
        }
        else if (this.searchInput.length == 0) {
            this.SEARCH_TEXT = undefined;
            this.CURSOR = undefined;
            this.items = [];
            this.getUsers(this.QUERY_STR);
        }
    };
    RequestListPage.prototype.onCancel = function (event) {
    };
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
    RequestListPage.prototype.openAdd = function () {
        this.navCtrl.push('AddSecret');
    };
    RequestListPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    RequestListPage.prototype.closeLoading = function () {
        this.loading.dismiss();
    };
    RequestListPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    RequestListPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    RequestListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-request-list',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\request-list\request-list.html"*/'<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-searchbar [(ngModel)]="searchKey" (ionInput)="onInput($event)"\n\n                       (ionCancel)="onCancel($event)"></ion-searchbar>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list>\n\n        <ion-item-sliding *ngFor="let favorite of favorites">\n\n            <button ion-item (click)="itemTapped(favorite)">\n\n                <ion-thumbnail item-left>\n\n                    <img src="{{favorite.property.thumbnail}}"/>\n\n                </ion-thumbnail>\n\n                <h2>{{favorite.property.title}}</h2>\n\n                <p>{{favorite.property.city}}, {{favorite.property.state}} ∙ {{favorite.property.price}}</p>\n\n            </button>\n\n            <ion-item-options>\n\n                <button danger (click)="deleteItem(favorite)">Delete</button>\n\n            </ion-item-options>\n\n        </ion-item-sliding>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\request-list\request-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__["a" /* DefaultApi */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], RequestListPage);
    return RequestListPage;
}());

//# sourceMappingURL=request-list.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\about\about.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>About</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <div class="about-header">\n\n        <img src="assets/img/dreamhouse-logo.svg">\n\n    </div>\n\n\n\n    <div padding class="about-info">\n\n\n\n        <h4>DreamHouse Application</h4>\n\n\n\n        <p>\n\n            DreamHouse is a sample application that demonstrayes how to build apps with Ionic 2, Angular 2, and Node.js\n\n        </p>\n\n\n\n    </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams, storage, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    WelcomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val === undefined || val === null) {
                _this.navCtrl.setRoot('LoginPage');
            }
            else {
                // let loginUser: models.LoginUserResponse = val; 
                // this.QUERY_STR = 'userId:' + loginUser.item.id;   
                // this.api.configuration = Utils.getConfiguration(loginUser); 
                // this.getSecrets(this.QUERY_STR);  
            }
        });
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\welcome\welcome.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title>Welcome</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce>\n\n    <ion-slides>\n\n\n\n        <ion-slide style="background-image: url(\'assets/img/slide_properties.jpg\')">\n\n            <p>Your dream house is just a few taps away! Select Properties in the menu to start your search.</p>\n\n        </ion-slide>\n\n\n\n        <ion-slide style="background-image: url(\'assets/img/slide_brokers.jpg\')">\n\n            <p>Select Brokers in the menu to connect with the best brokers in the business in a whole new way!</p>\n\n        </ion-slide>\n\n\n\n        <ion-slide style="background-image: url(\'assets/img/slide_favorites.jpg\')">\n\n            <p>Keep track of your favorites and get notified in real time when important events happen.</p>\n\n        </ion-slide>\n\n\n\n    </ion-slides>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\welcome\welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(237);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_haversine__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_haversine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_haversine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_pipes__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_api_DefaultApi__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_app_constants__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_location_list_location_list__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_location_detail_location_detail__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_friend_list_friend_list__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_friend_detail_friend_detail__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_request_list_request_list__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_about_about__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_property_service_mock__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_broker_service_mock__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_logout_logout__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_facebook__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









//import {WelcomePage} from '../pages/welcome/welcome';














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                //WelcomePage,
                __WEBPACK_IMPORTED_MODULE_14__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_location_list_location_list__["a" /* LocationListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_location_detail_location_detail__["a" /* LocationDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_request_list_request_list__["a" /* RequestListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_friend_list_friend_list__["a" /* FriendListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_friend_detail_friend_detail__["a" /* FriendDetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_logout_logout__["a" /* LogoutPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_ngx_pipes__["a" /* NgPipesModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/activate/activate.module#ActivatePageModule', name: 'ActivatePage', segment: 'activate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-friend/add-friend.module#AddFriendPageModule', name: 'AddFriendPage', segment: 'add-friend', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/location-list/location-list.module#LocationListPageModule', name: 'LocationListPage', segment: 'location-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/logout/logout.module#LogoutModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordPageModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomeModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_20__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                //WelcomePage,
                __WEBPACK_IMPORTED_MODULE_14__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_location_list_location_list__["a" /* LocationListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_location_detail_location_detail__["a" /* LocationDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_request_list_request_list__["a" /* RequestListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_friend_list_friend_list__["a" /* FriendListPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_friend_detail_friend_detail__["a" /* FriendDetailPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_logout_logout__["a" /* LogoutPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_15__providers_property_service_mock__["a" /* PropertyService */],
                __WEBPACK_IMPORTED_MODULE_16__providers_broker_service_mock__["a" /* BrokerService */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_haversine__["HaversineService"],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__constants_app_constants__["a" /* AppConstants */],
                __WEBPACK_IMPORTED_MODULE_6__providers_api_DefaultApi__["a" /* DefaultApi */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_facebook__["a" /* Facebook */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BASE_PATH; });
/* unused harmony export COLLECTION_FORMATS */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var BASE_PATH = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
//# sourceMappingURL=variables.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var properties = [
    {
        id: 1,
        address: "18 Henry st",
        city: "Cambridge",
        state: "MA",
        zip: "01742",
        price: "$975,000",
        title: "Lâm Ngọc Hằng",
        bedrooms: 4,
        bathrooms: 3,
        long: -71.11095,
        lat: 42.35663,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house01.jpg",
        //thumbnail: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house01sq.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/15894994_401920850147680_17897310796082713_n.jpg?oh=62f4a663cfa69d91ec7c8d96b0b08330&oe=59EF28A0",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 1,
            name: "Caroline Kingsley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        }
    },
    {
        id: 2,
        address: "24 Pearl st",
        city: "Cambridge",
        state: "MA",
        zip: "02420",
        price: "$1,200,000",
        //title: "Ultimate Sophistication",
        title: "Lemth Nguyen",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.10869,
        lat: 42.359103,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house02.jpg",
        //thumbnail: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house02sq.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/c57.0.240.240/p240x240/12523973_10205927663843739_1485480924116733747_n.jpg?oh=8e107b199d7e39db98c7d4d92f57d32b&oe=5A351E19",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 1,
            name: "Caroline Kingsley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        }
    },
    {
        id: 3,
        address: "61 West Cedar st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$825,000",
        title: "Quản Thị Nga",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.070061,
        lat: 42.359986,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house03.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/19989469_1217389091723233_2133214409771178201_n.jpg?oh=d709792a479eb5dbcabce82cdc6c0b23&oe=59EDE5BB",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 2,
            name: "Michael Jones",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg"
        }
    },
    {
        id: 4,
        address: "32 Prince st",
        city: "Cambridge",
        state: "MA",
        zip: "02420",
        price: "$930,000",
        title: "Thuy Duong Nguyen",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.110448,
        lat: 42.360642,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house04.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/12645228_934705903303420_8030945404463088014_n.jpg?oh=3874e2458f46ff84b33294beb72f3475&oe=5A354A61",
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 3,
            name: "Jonathan Bradley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jonathan_bradley.jpg"
        }
    },
    {
        id: 5,
        address: "211 Charles Street",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$850,000",
        title: "Quan Lam",
        bedrooms: 3,
        bathrooms: 2,
        long: -71.084454,
        lat: 42.368168,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house05.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/12274566_10153727525339812_7750744222810759303_n.jpg?oh=d3e313eea79e7b6b87f1160b4a6c1471&oe=5A2D4C7C",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 4,
            name: "Jennifer Wu",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jennifer_wu.jpg"
        }
    },
    {
        id: 6,
        address: "448 Hanover st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$725,000",
        title: "Vy Thanh",
        bedrooms: 4,
        bathrooms: 2,
        long: -71.052617,
        lat: 42.366855,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house06.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20621957_872823652868115_5458391622460968658_n.jpg?oh=123da856e05cd63316d0d39c7590188d&oe=59EFF4AE",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 5,
            name: "Olivia Green",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/olivia_green.jpg"
        }
    },
    {
        id: 7,
        address: "127 Endicott st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$450,000",
        title: "Lan Lan Hoang",
        bedrooms: 3,
        bathrooms: 1,
        long: -71.057352,
        lat: 42.365003,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house07.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/19059722_1568088983225607_4271968378881729116_n.jpg?oh=d4414e8a2db46cd39fe8d436f6ed9748&oe=5A1F17E0",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 6,
            name: "Miriam Aupont",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/miriam_aupont.jpg"
        }
    },
    {
        id: 8,
        address: "48 Brattle st",
        city: "Cambridge",
        state: "MA",
        zip: "02420",
        price: "$450,000",
        title: "Minh Thu Nguyen",
        bedrooms: 5,
        bathrooms: 4,
        long: -71.121653,
        lat: 42.374117,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house10.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20621766_507619646240222_7223858202266566665_n.jpg?oh=47973a87b3a495eee7a2dc6d66355d1d&oe=59EAE8D9",
        tags: "victorian",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 7,
            name: "Michelle Lambert",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michelle_lambert.jpg"
        }
    },
    {
        id: 9,
        address: "121 Harborwalk",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$450,000",
        title: "Tuyen Nguyen",
        bedrooms: 3,
        bathrooms: 3,
        long: -71.049327,
        lat: 42.35695,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house09.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20621896_1619721901371873_8757437168574382787_n.jpg?oh=5ea18328e06b5edc92d5e0baca7b4892&oe=59F194A5",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 2,
            name: "Michael Jones",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg"
        }
    },
    {
        id: 10,
        address: "503 Park Drive",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$650,000",
        title: "City Living",
        bedrooms: 2,
        bathrooms: 2,
        long: -71.105475,
        lat: 42.347400,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house08.jpg",
        thumbnail: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house08sq.jpg",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 1,
            name: "Caroline Kingsley",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        }
    },
    {
        id: 11,
        address: "95 Gloucester st",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$690,000",
        title: "Luck Yong",
        bedrooms: 3,
        bathrooms: 3,
        lat: 42.349693,
        long: -71.084407,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house11.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/20525477_10154764283654212_7155418011956367437_n.jpg?oh=857daeeb66efa2fef114b73c7e5c7076&oe=5A2FA671",
        tags: "contemporary",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 4,
            name: "Jennifer Wu",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jennifer_wu.jpg"
        }
    },
    {
        id: 12,
        address: "145 Commonwealth ave",
        city: "Boston",
        state: "MA",
        zip: "02420",
        price: "$845,000",
        title: "Nguyen Viet Ha",
        bedrooms: 4,
        bathrooms: 3,
        lat: 42.352466,
        long: -71.075311,
        distance: 0,
        locatedAt: "2017-08-10T18:03:40.887",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/realty/house12.jpg",
        thumbnail: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-1/p240x240/12799079_1320496074631406_3751514757821920751_n.jpg?oh=3493a9c272b8103192b510b07fc3989b&oe=59F0BC4E",
        tags: "colonial",
        description: "Lorem ipsum dolor sit amet",
        broker: {
            id: 5,
            name: "Olivia Green",
            title: "Senior Broker",
            picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/olivia_green.jpg"
        }
    }
];
/* harmony default export */ __webpack_exports__["a"] = (properties);
//# sourceMappingURL=mock-properties.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var brokers = [
    {
        id: 1,
        name: "Caroline Kingsley",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "caroline@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
    },
    {
        id: 2,
        name: "Michael Jones",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "michael@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg"
    },
    {
        id: 3,
        name: "Jonathan Bradley",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "jonathan@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jonathan_bradley.jpg"
    },
    {
        id: 4,
        name: "Jennifer Wu",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "jen@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jennifer_wu.jpg"
    },
    {
        id: 5,
        name: "Olivia Green",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "olivia@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/olivia_green.jpg"
    },
    {
        id: 6,
        name: "Miriam Aupont",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "miriam@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/miriam_aupont.jpg"
    },
    {
        id: 7,
        name: "Michelle Lambert",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "michelle@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michelle_lambert.jpg"
    },
    {
        id: 8,
        name: "Victor Ochoa",
        title: "Senior Broker",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "victor@ionicrealty.com",
        picture: "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/victor_ochoa.jpg"
    }
];
/* harmony default export */ __webpack_exports__["a"] = (brokers);
//# sourceMappingURL=mock-brokers.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConstants; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppConstants = (function () {
    function AppConstants(platform) {
        // platform.ready().then(() => {
        // AppVersion.getVersionNumber().then((s) => {
        //     this.appVersion = s;
        //     console.log('App version: ' + this.appVersion );
        //   });
        // });
    }
    AppConstants.KEY_STATUS = 'K';
    AppConstants = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], AppConstants);
    return AppConstants;
}());

//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_haversine__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_haversine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_haversine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_logout_logout__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_location_list_location_list__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_friend_list_friend_list__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_request_list_request_list__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_welcome_welcome__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_about_about__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, _haversineService, storage, menu) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this._haversineService = _haversineService;
        this.storage = storage;
        this.menu = menu;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        this.appMenuItems = [
            { title: 'Locations', component: __WEBPACK_IMPORTED_MODULE_8__pages_location_list_location_list__["a" /* LocationListPage */], icon: 'home' },
            { title: 'Friends', component: __WEBPACK_IMPORTED_MODULE_9__pages_friend_list_friend_list__["a" /* FriendListPage */], icon: 'people' },
            { title: 'Request', component: __WEBPACK_IMPORTED_MODULE_10__pages_request_list_request_list__["a" /* RequestListPage */], icon: 'star' },
            { title: 'Approved', component: __WEBPACK_IMPORTED_MODULE_11__pages_welcome_welcome__["a" /* WelcomePage */], icon: 'checkmark-circle' },
        ];
        this.accountMenuItems = [
            { title: 'My Account', component: __WEBPACK_IMPORTED_MODULE_11__pages_welcome_welcome__["a" /* WelcomePage */], icon: 'ios-contact' },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_7__pages_logout_logout__["a" /* LogoutPage */], icon: 'log-out' },
        ];
        this.helpMenuItems = [
            //{title: 'Welcome', component: WelcomePage, icon: 'bookmark'},
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_12__pages_about_about__["a" /* AboutPage */], icon: 'information-circle' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                //this.location = position.coords;
                console.log(position.coords);
                var madrid = {
                    latitude: 33.91918,
                    longitude: -118.416465
                };
                //El Segundo, CA, USA
                //atitude: 33.91918 | Longitude: -118.416465
                var current = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                var meters = _this._haversineService.getDistanceInMeters(madrid, current);
                var kilometers = _this._haversineService.getDistanceInKilometers(madrid, current);
                var miles = _this._haversineService.getDistanceInMiles(madrid, current);
                console.log("\n                    The distance between Current and Bilbao is:\n                        - " + meters + " meters\n                        - " + kilometers + " kilometers\n                        - " + miles + " miles\n                ");
            });
        }
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        //this.nav.setRoot(page.component);
        if (page.title == 'Logout') {
            this.storage.set('user', null);
            this.nav.setRoot(this.rootPage);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\app\app.html"*/'<ion-menu [content]="content">\n\n\n\n  <ion-content>\n\n\n\n    <img src="assets/img/dreamhouse-logo.svg" class="menu-logo"/>\n\n\n\n    <ion-list>\n\n      <ion-list-header>\n\n        Network\n\n      </ion-list-header>\n\n      <button menuClose ion-item *ngFor="let menuItem of appMenuItems" (click)="openPage(menuItem)">\n\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n\n        {{menuItem.title}}\n\n      </button>\n\n    </ion-list>\n\n\n\n    <ion-list>\n\n      <ion-list-header>\n\n        Help\n\n      </ion-list-header>\n\n      <button menuClose ion-item *ngFor="let menuItem of helpMenuItems" (click)="openPage(menuItem)">\n\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n\n        {{menuItem.title}}\n\n      </button>\n\n    </ion-list>\n\n\n\n    <ion-list>\n\n      <ion-list-header>\n\n        Account\n\n      </ion-list-header>\n\n      <button menuClose ion-item *ngFor="let menuItem of accountMenuItems" (click)="openPage(menuItem)">\n\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n\n        {{menuItem.title}}\n\n      </button>\n\n    </ion-list>\n\n\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_haversine__["HaversineService"], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_configuration__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Utils = (function () {
    function Utils() {
    }
    Utils.getConfiguration = function (loginUser) {
        var configuration = new __WEBPACK_IMPORTED_MODULE_1__providers_configuration__["a" /* Configuration */]();
        configuration.apiKey = loginUser.token;
        if (loginUser.auth !== undefined) {
            configuration.accessToken = loginUser.auth.token;
        }
        configuration.username = loginUser.item.email;
        configuration.withCredentials = false;
        return configuration;
    };
    Utils.getDEcryptedCode = function (pwd, key) {
        // Decrypt 
        var bytes = __WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js__["AES"].decrypt(pwd.toString(), key);
        var plaintext = bytes.toString(__WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js__["enc"].Utf8);
        return plaintext;
    };
    Utils.getEncryptCode = function (pwd, key) {
        // Encrypt 
        var ciphertext = __WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js__["AES"].encrypt(pwd, key);
        return ciphertext.toString();
    };
    Utils = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], Utils);
    return Utils;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__variables__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configuration__ = __webpack_require__(163);
/**
 * network
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2017-02-05T01:28:32Z
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable:no-unused-variable member-ordering */






var DefaultApi = (function () {
    function DefaultApi(http, basePath, configuration) {
        this.http = http;
        this.basePath = 'https://9csrrzydk8.execute-api.us-east-1.amazonaws.com/dev';
        this.defaultHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.configuration = new __WEBPACK_IMPORTED_MODULE_4__configuration__["a" /* Configuration */]();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }
    /**
     *
     */
    DefaultApi.prototype.activateOptions = function (extraHttpRequestParams) {
        return this.activateOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param activateUserRequest
     */
    DefaultApi.prototype.activatePost = function (activateUserRequest, extraHttpRequestParams) {
        return this.activatePostWithHttpInfo(activateUserRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     */
    DefaultApi.prototype.friendsIdDelete = function (id, extraHttpRequestParams) {
        return this.friendsIdDeleteWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     */
    DefaultApi.prototype.friendsIdGet = function (id, extraHttpRequestParams) {
        return this.friendsIdGetWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     */
    DefaultApi.prototype.friendsIdOptions = function (id, extraHttpRequestParams) {
        return this.friendsIdOptionsWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     * @param updateFriendRequest
     */
    DefaultApi.prototype.friendsIdPut = function (id, updateFriendRequest, extraHttpRequestParams) {
        return this.friendsIdPutWithHttpInfo(id, updateFriendRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.friendsOptions = function (extraHttpRequestParams) {
        return this.friendsOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param insertFriendRequest
     */
    DefaultApi.prototype.friendsPost = function (insertFriendRequest, extraHttpRequestParams) {
        return this.friendsPostWithHttpInfo(insertFriendRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.loginOptions = function (extraHttpRequestParams) {
        return this.loginOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param loginUserRequest
     */
    DefaultApi.prototype.loginPost = function (loginUserRequest, extraHttpRequestParams) {
        return this.loginPostWithHttpInfo(loginUserRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.logoutOptions = function (extraHttpRequestParams) {
        return this.logoutOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param logoutRequest
     */
    DefaultApi.prototype.logoutPost = function (logoutRequest, extraHttpRequestParams) {
        return this.logoutPostWithHttpInfo(logoutRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.registerOptions = function (extraHttpRequestParams) {
        return this.registerOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param registerUserRequest
     */
    DefaultApi.prototype.registerPost = function (registerUserRequest, extraHttpRequestParams) {
        return this.registerPostWithHttpInfo(registerUserRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.usersChangepasswordOptions = function (extraHttpRequestParams) {
        return this.usersChangepasswordOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param changePasswordRequest
     */
    DefaultApi.prototype.usersChangepasswordPost = function (changePasswordRequest, extraHttpRequestParams) {
        return this.usersChangepasswordPostWithHttpInfo(changePasswordRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.usersForgetpasswordOptions = function (extraHttpRequestParams) {
        return this.usersForgetpasswordOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param fogotPasswordRequest
     */
    DefaultApi.prototype.usersForgetpasswordPost = function (fogotPasswordRequest, extraHttpRequestParams) {
        return this.usersForgetpasswordPostWithHttpInfo(fogotPasswordRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     */
    DefaultApi.prototype.usersIdDelete = function (id, extraHttpRequestParams) {
        return this.usersIdDeleteWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     */
    DefaultApi.prototype.usersIdGet = function (id, extraHttpRequestParams) {
        return this.usersIdGetWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     */
    DefaultApi.prototype.usersIdOptions = function (id, extraHttpRequestParams) {
        return this.usersIdOptionsWithHttpInfo(id, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param id
     * @param updateUserRequest
     */
    DefaultApi.prototype.usersIdPut = function (id, updateUserRequest, extraHttpRequestParams) {
        return this.usersIdPutWithHttpInfo(id, updateUserRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.usersLoginwithfacebookOptions = function (extraHttpRequestParams) {
        return this.usersLoginwithfacebookOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param loginWithTokenRequest
     */
    DefaultApi.prototype.usersLoginwithfacebookPost = function (loginWithTokenRequest, extraHttpRequestParams) {
        return this.usersLoginwithfacebookPostWithHttpInfo(loginWithTokenRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.usersLoginwithgoogleOptions = function (extraHttpRequestParams) {
        return this.usersLoginwithgoogleOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param loginWithTokenRequest
     */
    DefaultApi.prototype.usersLoginwithgooglePost = function (loginWithTokenRequest, extraHttpRequestParams) {
        return this.usersLoginwithgooglePostWithHttpInfo(loginWithTokenRequest, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     * @param query
     * @param limit
     * @param cursor
     */
    DefaultApi.prototype.usersSearchGet = function (query, limit, cursor, extraHttpRequestParams) {
        return this.usersSearchGetWithHttpInfo(query, limit, cursor, extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     */
    DefaultApi.prototype.usersSearchOptions = function (extraHttpRequestParams) {
        return this.usersSearchOptionsWithHttpInfo(extraHttpRequestParams)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json() || {};
            }
        });
    };
    /**
     *
     *
     */
    DefaultApi.prototype.activateOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/activate';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param activateUserRequest
     */
    DefaultApi.prototype.activatePostWithHttpInfo = function (activateUserRequest, extraHttpRequestParams) {
        var path = this.basePath + '/activate';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'activateUserRequest' is not null or undefined
        if (activateUserRequest === null || activateUserRequest === undefined) {
            throw new Error('Required parameter activateUserRequest was null or undefined when calling activatePost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: activateUserRequest == null ? '' : JSON.stringify(activateUserRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     */
    DefaultApi.prototype.friendsIdDeleteWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/friends/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling friendsIdDelete.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Delete,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     */
    DefaultApi.prototype.friendsIdGetWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/friends/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling friendsIdGet.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     */
    DefaultApi.prototype.friendsIdOptionsWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/friends/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling friendsIdOptions.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     * @param updateFriendRequest
     */
    DefaultApi.prototype.friendsIdPutWithHttpInfo = function (id, updateFriendRequest, extraHttpRequestParams) {
        var path = this.basePath + '/friends/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling friendsIdPut.');
        }
        // verify required parameter 'updateFriendRequest' is not null or undefined
        if (updateFriendRequest === null || updateFriendRequest === undefined) {
            throw new Error('Required parameter updateFriendRequest was null or undefined when calling friendsIdPut.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put,
            headers: headers,
            body: updateFriendRequest == null ? '' : JSON.stringify(updateFriendRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.friendsOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/friends';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param insertFriendRequest
     */
    DefaultApi.prototype.friendsPostWithHttpInfo = function (insertFriendRequest, extraHttpRequestParams) {
        var path = this.basePath + '/friends';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'insertFriendRequest' is not null or undefined
        if (insertFriendRequest === null || insertFriendRequest === undefined) {
            throw new Error('Required parameter insertFriendRequest was null or undefined when calling friendsPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: insertFriendRequest == null ? '' : JSON.stringify(insertFriendRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.loginOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/login';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param loginUserRequest
     */
    DefaultApi.prototype.loginPostWithHttpInfo = function (loginUserRequest, extraHttpRequestParams) {
        var path = this.basePath + '/login';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'loginUserRequest' is not null or undefined
        if (loginUserRequest === null || loginUserRequest === undefined) {
            throw new Error('Required parameter loginUserRequest was null or undefined when calling loginPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: loginUserRequest == null ? '' : JSON.stringify(loginUserRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.logoutOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/logout';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param logoutRequest
     */
    DefaultApi.prototype.logoutPostWithHttpInfo = function (logoutRequest, extraHttpRequestParams) {
        var path = this.basePath + '/logout';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'logoutRequest' is not null or undefined
        if (logoutRequest === null || logoutRequest === undefined) {
            throw new Error('Required parameter logoutRequest was null or undefined when calling logoutPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: logoutRequest == null ? '' : JSON.stringify(logoutRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.registerOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/register';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param registerUserRequest
     */
    DefaultApi.prototype.registerPostWithHttpInfo = function (registerUserRequest, extraHttpRequestParams) {
        var path = this.basePath + '/register';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'registerUserRequest' is not null or undefined
        if (registerUserRequest === null || registerUserRequest === undefined) {
            throw new Error('Required parameter registerUserRequest was null or undefined when calling registerPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: registerUserRequest == null ? '' : JSON.stringify(registerUserRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.usersChangepasswordOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/users/changepassword';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param changePasswordRequest
     */
    DefaultApi.prototype.usersChangepasswordPostWithHttpInfo = function (changePasswordRequest, extraHttpRequestParams) {
        var path = this.basePath + '/users/changepassword';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'changePasswordRequest' is not null or undefined
        if (changePasswordRequest === null || changePasswordRequest === undefined) {
            throw new Error('Required parameter changePasswordRequest was null or undefined when calling usersChangepasswordPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: changePasswordRequest == null ? '' : JSON.stringify(changePasswordRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.usersForgetpasswordOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/users/forgetpassword';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param fogotPasswordRequest
     */
    DefaultApi.prototype.usersForgetpasswordPostWithHttpInfo = function (fogotPasswordRequest, extraHttpRequestParams) {
        var path = this.basePath + '/users/forgetpassword';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'fogotPasswordRequest' is not null or undefined
        if (fogotPasswordRequest === null || fogotPasswordRequest === undefined) {
            throw new Error('Required parameter fogotPasswordRequest was null or undefined when calling usersForgetpasswordPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: fogotPasswordRequest == null ? '' : JSON.stringify(fogotPasswordRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     */
    DefaultApi.prototype.usersIdDeleteWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/users/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdDelete.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Delete,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     */
    DefaultApi.prototype.usersIdGetWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/users/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdGet.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     */
    DefaultApi.prototype.usersIdOptionsWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/users/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdOptions.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param id
     * @param updateUserRequest
     */
    DefaultApi.prototype.usersIdPutWithHttpInfo = function (id, updateUserRequest, extraHttpRequestParams) {
        var path = this.basePath + '/users/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling usersIdPut.');
        }
        // verify required parameter 'updateUserRequest' is not null or undefined
        if (updateUserRequest === null || updateUserRequest === undefined) {
            throw new Error('Required parameter updateUserRequest was null or undefined when calling usersIdPut.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put,
            headers: headers,
            body: updateUserRequest == null ? '' : JSON.stringify(updateUserRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.usersLoginwithfacebookOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/users/loginwithfacebook';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param loginWithTokenRequest
     */
    DefaultApi.prototype.usersLoginwithfacebookPostWithHttpInfo = function (loginWithTokenRequest, extraHttpRequestParams) {
        var path = this.basePath + '/users/loginwithfacebook';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'loginWithTokenRequest' is not null or undefined
        if (loginWithTokenRequest === null || loginWithTokenRequest === undefined) {
            throw new Error('Required parameter loginWithTokenRequest was null or undefined when calling usersLoginwithfacebookPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: loginWithTokenRequest == null ? '' : JSON.stringify(loginWithTokenRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.usersLoginwithgoogleOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/users/loginwithgoogle';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param loginWithTokenRequest
     */
    DefaultApi.prototype.usersLoginwithgooglePostWithHttpInfo = function (loginWithTokenRequest, extraHttpRequestParams) {
        var path = this.basePath + '/users/loginwithgoogle';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'loginWithTokenRequest' is not null or undefined
        if (loginWithTokenRequest === null || loginWithTokenRequest === undefined) {
            throw new Error('Required parameter loginWithTokenRequest was null or undefined when calling usersLoginwithgooglePost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: loginWithTokenRequest == null ? '' : JSON.stringify(loginWithTokenRequest),
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     * @param query
     * @param limit
     * @param cursor
     */
    DefaultApi.prototype.usersSearchGetWithHttpInfo = function (query, limit, cursor, extraHttpRequestParams) {
        var path = this.basePath + '/users/search';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'query' is not null or undefined
        if (query === null || query === undefined) {
            throw new Error('Required parameter query was null or undefined when calling usersSearchGet.');
        }
        // verify required parameter 'limit' is not null or undefined
        if (limit === null || limit === undefined) {
            throw new Error('Required parameter limit was null or undefined when calling usersSearchGet.');
        }
        if (query !== undefined) {
            queryParameters.set('query', query);
        }
        if (cursor !== undefined) {
            queryParameters.set('cursor', cursor);
        }
        if (limit !== undefined) {
            queryParameters.set('limit', limit);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (networkAuthorizer) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    /**
     *
     *
     */
    DefaultApi.prototype.usersSearchOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/users/search';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            headers: headers,
            search: queryParameters,
            withCredentials: this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = Object.assign(requestOptions, extraHttpRequestParams);
        }
        return this.http.request(path, requestOptions);
    };
    DefaultApi = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__variables__["a" /* BASE_PATH */])), __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], String, __WEBPACK_IMPORTED_MODULE_4__configuration__["a" /* Configuration */]])
    ], DefaultApi);
    return DefaultApi;
}());

//# sourceMappingURL=DefaultApi.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_properties__ = __webpack_require__(267);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PropertyService = (function () {
    function PropertyService() {
        this.favoriteCounter = 0;
        this.favorites = [];
    }
    PropertyService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_properties__["a" /* default */]);
    };
    PropertyService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_properties__["a" /* default */][id - 1]);
    };
    PropertyService.prototype.findByName = function (searchKey) {
        var key = searchKey.toUpperCase();
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_properties__["a" /* default */].filter(function (property) {
            return (property.title + ' ' + property.address + ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1;
        }));
    };
    PropertyService.prototype.getFavorites = function () {
        return Promise.resolve(this.favorites);
    };
    PropertyService.prototype.favorite = function (property) {
        this.favoriteCounter = this.favoriteCounter + 1;
        this.favorites.push({ id: this.favoriteCounter, property: property });
        return Promise.resolve();
    };
    PropertyService.prototype.unfavorite = function (favorite) {
        var index = this.favorites.indexOf(favorite);
        if (index > -1) {
            this.favorites.splice(index, 1);
        }
        return Promise.resolve();
    };
    PropertyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], PropertyService);
    return PropertyService;
}());

//# sourceMappingURL=property-service-mock.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_broker_service_mock__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FriendDetailPage = (function () {
    function FriendDetailPage(navCtrl, navParams, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.broker = this.navParams.data;
        service.findById(this.broker.id).then(function (broker) { return _this.broker = broker; });
    }
    FriendDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-friend-detail',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\friend-detail\friend-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Broker</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="broker">\n\n\n\n    <ion-card>\n\n\n\n        <ion-card-content>\n\n            <img src="{{broker.picture}}"/>\n\n            <h2>{{broker.name}}</h2>\n\n            <h3>{{broker.title}}</h3>\n\n        </ion-card-content>\n\n\n\n        <ion-list>\n\n            <a href="tel:{{broker.Phone__c}}" ion-item>\n\n                <ion-icon name="call" item-left></ion-icon>\n\n                <p>Call Office</p>\n\n                <h2>{{broker.phone}}</h2>\n\n            </a>\n\n            <a href="tel:{{broker.phone}}" ion-item>\n\n                <ion-icon name="call" item-left></ion-icon>\n\n                <p>Call Mobile</p>\n\n                <h2>{{broker.mobilePhone}}</h2>\n\n            </a>\n\n            <a href="tel:{{broker.phone}}" ion-item>\n\n                <ion-icon name="text" item-left></ion-icon>\n\n                <p>Text</p>\n\n                <h2>{{broker.mobilePhone}}</h2>\n\n            </a>\n\n            <a href="mailto:{{broker.email}}" ion-item>\n\n                <ion-icon name="mail" item-left></ion-icon>\n\n                <p>Email</p>\n\n                <h2>{{broker.email}}</h2>\n\n            </a>\n\n        </ion-list>\n\n\n\n    </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\friend-detail\friend-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_broker_service_mock__["a" /* BrokerService */]])
    ], FriendDetailPage);
    return FriendDetailPage;
}());

//# sourceMappingURL=friend-detail.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrokerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_brokers__ = __webpack_require__(268);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BrokerService = (function () {
    function BrokerService() {
    }
    BrokerService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_brokers__["a" /* default */]);
    };
    BrokerService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_brokers__["a" /* default */][id - 1]);
    };
    BrokerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], BrokerService);
    return BrokerService;
}());

//# sourceMappingURL=broker-service-mock.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map