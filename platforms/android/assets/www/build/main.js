webpackJsonp([10],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConstants; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], AppConstants);
    return AppConstants;
}());

//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditSecretPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(52);
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
 * Generated class for the AddSecret page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditSecretPage = (function () {
    function EditSecretPage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.SECERET_KEY = '';
        this.secret = this.navParams.get('secret');
    }
    EditSecretPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            var loginUser = val;
            _this.SECERET_KEY = loginUser.item.secretKey;
            _this.secret.userId = loginUser.item.id;
            _this.secret.encryptedPassword = _this.secret.password;
            _this.secret.password = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getDEcryptedCode(_this.secret.password, _this.SECERET_KEY);
            _this.secret.confirmPassword = _this.secret.password;
            console.log(_this.secret.password);
            console.log(_this.secret.confirmPassword);
            _this.api.configuration = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getConfiguration(loginUser);
        });
        this.editFrom = this.formBuilder.group({
            domain: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3)]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            confirmPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.confirmPasswordValidator.bind(this)]],
            encryptedPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            note: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    EditSecretPage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        if (this.editFrom.valid == true) {
            var request = {};
            request.id = this.secret.id;
            request.password = this.secret.encryptedPassword;
            request.note = this.secret.note;
            this.api.secretsIdPut(request.id, request).subscribe(function (response) {
                _this.navCtrl.push('HomePage');
            }, function (error) {
                _this.showError(error);
            });
        }
    };
    EditSecretPage.prototype.isValid = function (field) {
        var formField = this.editFrom.controls[field];
        if (formField !== undefined) {
            return (formField.valid || formField.pristine);
        }
        return true;
    };
    EditSecretPage.prototype.domainValidator = function (control) {
        if (control.value !== '') {
            return { invalidDomain: true };
        }
    };
    EditSecretPage.prototype.usernameValidator = function (control) {
        if (control.value !== '') {
            return { invalidUsername: true };
        }
    };
    EditSecretPage.prototype.passwordValidator = function (control) {
        if (control.value !== '') {
            return { invalidPassword: true };
        }
    };
    EditSecretPage.prototype.confirmPasswordValidator = function (control) {
        //debugger;
        if (control !== undefined) {
            if (control.value !== this.secret.password) {
                return { invalidConfirmPassord: true };
            }
        }
    };
    EditSecretPage.prototype.noteValidator = function (control) {
        return { invalidNote: true };
    };
    EditSecretPage.prototype.onInputTime = function (password) {
        this.secret.encryptedPassword = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getEncryptCode(this.secret.password, this.SECERET_KEY);
    };
    EditSecretPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    EditSecretPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    EditSecretPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    EditSecretPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-secret',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\edit-secret\edit-secret.html"*/'<!--\n\n  Generated template for the AddSecret page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Edit Secret</ion-title>\n\n    <ion-buttons end>\n\n		<button (click)="onSubmit()" ion-button [disabled]="!editFrom.valid">\n\n			Save\n\n		</button>\n\n	</ion-buttons>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form [formGroup]="editFrom" (ngSubmit)="onSubmit()">\n\n		<ion-list>\n\n			<ion-item>\n\n				<ion-label floating primary>Domain</ion-label>\n\n				<ion-input [(ngModel)]="secret.domain" formControlName="domain" type="text"\n\n                     id="domain" spellcheck="false" autocapitalize="off" disabled="true">\n\n          		</ion-input>\n\n			</ion-item>\n\n			<p *ngIf="!isValid(\'domain\')" danger padding-left class="invalid">Invalid Domain</p>\n\n			<ion-item>\n\n	          <ion-label floating primary>Username</ion-label>\n\n	          <ion-input type="text" [(ngModel)]="secret.username" formControlName="username"\n\n	                     id="username" spellcheck="false" autocapitalize="off" disabled="true">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'username\')" danger padding-left class="invalid">Invalid Username</p>\n\n	        <ion-item>\n\n	          <ion-label floating primary>Password</ion-label>\n\n	          <ion-input type="password" [(ngModel)]="secret.password" (input)=\'onInputTime($event.target.value)\' formControlName="password"\n\n	                     id="password" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <ion-item>\n\n	          <ion-label floating primary>Confirm Password</ion-label>\n\n	          <ion-input type="password" [(ngModel)]="secret.confirmPassword" formControlName="confirmPassword" \n\n	          			 id="confirmPassword" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left class="invalid">Invalid password</p>\n\n	        <ion-item>\n\n	          <ion-label floating primary>Note</ion-label>\n\n	          <ion-input  [(ngModel)]="secret.note" formControlName="note"\n\n	                     type="text" id="note" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <ion-item>\n\n	         <ion-label floating primary>Generate Password</ion-label>\n\n	          <ion-input type="text" [(ngModel)]="secret.encryptedPassword" formControlName="encryptedPassword" disabled="true"\n\n	                      id="encryptedPassword" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n		</ion-list>\n\n		<div padding>\n\n	      <button ion-button color="primary" block>Save</button>\n\n	    </div>\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\edit-secret\edit-secret.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], EditSecretPage);
    return EditSecretPage;
}());

//# sourceMappingURL=edit-secret.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_app_constants__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
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
    function LoginPage(nav, alertCtrl, loadingCtrl, api, storage) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.storage = storage;
        this.registerCredentials = { email: '', password: '' };
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val !== undefined && val !== null) {
                var loginUser = val;
                if (__WEBPACK_IMPORTED_MODULE_3__constants_app_constants__["a" /* AppConstants */].KEY_STATUS === loginUser.item.status) {
                    debugger;
                    _this.nav.setRoot('HomePage');
                }
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
                    console.log(response);
                    _this.storage.set('passcode', _this.registerCredentials.password);
                    _this.nav.push('SecretKeyPage');
                }
                else {
                    _this.showError("Access Denied");
                }
            }, function (error) {
                _this.showError(error);
            });
        }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\login\login.html"*/'<!--\n\n  Generated template for the Login page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content class="login-content" padding>\n\n  <ion-row class="logo-row">\n\n    <ion-col></ion-col>\n\n    <ion-col width-67>\n\n      <img src="https://images.vexels.com/media/users/3/136307/isolated/lists/fe8cd8608b7d3623802d9c7b6a912a2a-lock-icon.png"/>\n\n    </ion-col>\n\n    <ion-col></ion-col>\n\n  </ion-row>\n\n  <div class="login-box">\n\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-list inset>\n\n            \n\n            <ion-item>\n\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required \n\n              autocapitalize="off"></ion-input>\n\n            </ion-item>\n\n            \n\n            <ion-item>\n\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required autocapitalize="off"></ion-input>\n\n            </ion-item>\n\n            <button type="button" ion-button class="forget-btn" block clear (click)="forgetPassword($event)">Forget password</button>  \n\n          </ion-list>\n\n        </ion-col>\n\n      </ion-row>      \n\n      \n\n      <ion-row>\n\n        <ion-col class="signup-col">\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n\n          \n\n        </ion-col>\n\n      </ion-row>\n\n      \n\n    </form>\n\n    <button ion-button class="register-btn" block clear (click)="createAccount($event)">Create New Account</button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logout',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\logout\logout.html"*/'<!--\n\n  Generated template for the Logout page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>logout</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\logout\logout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], LogoutPage);
    return LogoutPage;
}());

//# sourceMappingURL=logout.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(21);
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
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfilePage = (function () {
    function ProfilePage(storage) {
        this.storage = storage;
        this.user = {};
        this.placeholderPicture = 'assets/avatar/unknown.png';
        this.languages = ['English'];
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val !== null) {
                var loginUser = val;
                _this.user = loginUser.item;
                _this.user.imageUrl = _this.placeholderPicture;
            }
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\profile\profile.html"*/'<!--\n\n  Generated template for the Profile page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar primary>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>User Settings</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header>\n\n      <ion-avatar item-start>\n\n        <img [src]="user.imageUrl ? user.imageUrl : placeholderPicture">\n\n      </ion-avatar>\n\n      <p class="username">{{user.displayName}}</p>\n\n    </ion-list-header>\n\n  </ion-list>\n\n  <ion-list no-border>\n\n    <ion-list-header>\n\n      General\n\n    </ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name=\'settings\' item-start></ion-icon>\n\n      <ion-label>App Language</ion-label>\n\n      <ion-select [(ngModel)]="language">\n\n        <ion-option *ngFor="let language of languages" [value]="language">{{language}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-icon name=\'mail\' item-start></ion-icon>\n\n      <ion-label class="label"> {{user.email}} </ion-label>\n\n      \n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

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

/***/ 123:
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
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/activate/activate.module": [
		293,
		4
	],
	"../pages/add-secret/add-secret.module": [
		294,
		3
	],
	"../pages/change-password/change-password.module": [
		295,
		2
	],
	"../pages/edit-secret/edit-secret.module": [
		296,
		9
	],
	"../pages/home/home.module": [
		299,
		8
	],
	"../pages/login/login.module": [
		297,
		7
	],
	"../pages/logout/logout.module": [
		298,
		6
	],
	"../pages/profile/profile.module": [
		300,
		5
	],
	"../pages/register/register.module": [
		301,
		1
	],
	"../pages/reset-password/reset-password.module": [
		165
	],
	"../pages/secret-key/secret-key.module": [
		302,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 164;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordModule", function() { return ResetPasswordModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_password__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ResetPasswordModule = (function () {
    function ResetPasswordModule() {
    }
    ResetPasswordModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reset_password__["a" /* ResetPasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__reset_password__["a" /* ResetPasswordPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__reset_password__["a" /* ResetPasswordPage */]
            ]
        })
    ], ResetPasswordModule);
    return ResetPasswordModule;
}());

//# sourceMappingURL=reset-password.module.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(33);
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
 * Generated class for the AddSecret page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ResetPasswordPage = (function () {
    function ResetPasswordPage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.SECERET_KEY = '';
    }
    ResetPasswordPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (!(val === undefined || val === null)) {
                var loginUser = val;
                _this.email = loginUser.item.email;
            }
        });
        this.resetPwdFrom = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        });
    };
    ResetPasswordPage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        if (this.resetPwdFrom.valid == true) {
            var request = {};
            request.email = this.email;
            this.api.usersForgetpasswordPost(request).subscribe(function (response) {
                _this.storage.set('email', _this.email);
                _this.navCtrl.push('ChangePasswordPage');
            }, function (error) {
                _this.showError(error);
            });
        }
        else {
            this.showError('Please fix the error field');
        }
    };
    ResetPasswordPage.prototype.isValid = function (field) {
        var formField = this.resetPwdFrom.controls[field];
        if (formField !== undefined) {
            return (formField.valid || formField.pristine);
        }
        return true;
    };
    ResetPasswordPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ResetPasswordPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    ResetPasswordPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    ResetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reset-password',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\reset-password\reset-password.html"*/'<!--\n\n  Generated template for the AddSecret page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n  	<button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Reset Password</ion-title>\n\n    <ion-buttons end>\n\n		<button (click)="onSubmit()" ion-button [disabled]="!resetPwdFrom.valid">\n\n			Reset\n\n		</button>\n\n	</ion-buttons>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form [formGroup]="resetPwdFrom" (ngSubmit)="onSubmit()">\n\n		<ion-list>\n\n			<ion-item>\n\n	          <ion-label floating primary>Email</ion-label>\n\n	          <ion-input  [(ngModel)]="email" formControlName="email"\n\n	                     type="text" id="email" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>				            \n\n		</ion-list>\n\n		<div padding>\n\n	      <button ion-button color="primary" block>Reset</button>\n\n	    </div>\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\reset-password\reset-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secret_details_secret_details__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(52);
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
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(navCtrl, navParams, api, storage, loadingCtrl, alertCtrl) {
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
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            if (val === undefined || val === null) {
                _this.navCtrl.setRoot('LoginPage');
            }
            else {
                var loginUser = val;
                _this.QUERY_STR = 'userId:' + loginUser.item.id;
                _this.api.configuration = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getConfiguration(loginUser);
                _this.getSecrets(_this.QUERY_STR);
            }
        });
    };
    HomePage.prototype.getSecrets = function (query) {
        var _this = this;
        this.api.secretsSearchGet(query, this.LIMIT, this.CURSOR).subscribe(function (response) {
            if (response != null && response.items.length > 0) {
                for (var i in response.items) {
                    _this.items.push(response.items[i]);
                    //console.log(i);
                    //console.log(response.items[i]); 
                }
                _this.CURSOR = response.nextPageToken;
                _this.noMoreItemsAvailable = true;
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.noMoreItemsAvailable == true) {
            //console.log(this.CURSOR);
            this.noMoreItemsAvailable = false;
            setTimeout(function () {
                if (_this.SEARCH_TEXT !== undefined) {
                    _this.getSecrets(_this.SEARCH_TEXT);
                }
                else {
                    _this.getSecrets(_this.QUERY_STR);
                }
                infiniteScroll.complete();
            }, 500);
        }
    };
    HomePage.prototype.itemTapped = function (event, secret) {
        //console.log("itemTapped");
        //console.log(secret)
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__secret_details_secret_details__["a" /* SecretDetailsPage */], { 'secret': secret });
    };
    HomePage.prototype.onInput = function (event) {
        if (this.searchInput.length >= 3) {
            this.items = [];
            this.CURSOR = undefined;
            console.log(this.searchInput);
            this.SEARCH_TEXT = this.QUERY_STR + '&searchText:' + this.searchInput;
            this.getSecrets(this.SEARCH_TEXT);
        }
        else if (this.searchInput.length == 0) {
            this.SEARCH_TEXT = undefined;
            this.CURSOR = undefined;
            this.items = [];
            this.getSecrets(this.QUERY_STR);
        }
    };
    HomePage.prototype.onCancel = function (event) {
    };
    HomePage.prototype.presentConfirm = function (event, secret) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this secret?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.deleteItem(secret);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.deleteItem = function (secret) {
        var _this = this;
        this.api.secretsIdDelete(secret.id).subscribe(function (response) {
            //if (response != null) {
            var index = _this.items.indexOf(secret);
            if (index !== -1) {
                _this.items.splice(index, 1);
            }
            //}
        }, function (error) {
            _this.showError(error);
        });
    };
    HomePage.prototype.openAdd = function () {
        this.navCtrl.push('AddSecret');
    };
    HomePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    HomePage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\home\home.html"*/'<!--\n\n  Generated template for the Home page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Home</ion-title>\n\n    <ion-buttons end>\n\n		<button (click)="openAdd()" ion-button>\n\n			Add\n\n		</button>\n\n	</ion-buttons>\n\n  \n\n </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="searchInput" [showCancelButton]="shouldShowCancel" (ionInput)="onInput($event)"(ionCancel)="onCancel($event)" autocapitalize="off">\n\n  </ion-searchbar>  \n\n  <ion-list>\n\n    <!--<button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon name="star" color="bright" item-left></ion-icon>\n\n      {{item.domain}}\n\n      <div class="item-note" item-right>\n\n        {{item.username}}\n\n      </div>\n\n    </button>-->\n\n    <ion-item-sliding *ngFor="let item of items">\n\n      <button ion-item (click)="itemTapped($event, item)">\n\n        <ion-icon name="star" color="bright" item-left></ion-icon>\n\n          {{item.domain}}\n\n        <div class="item-note" item-right>\n\n          {{item.username}}\n\n        </div>\n\n      </button>      \n\n      <!--<ion-item-options side="left">\n\n        <button ion-button (click)="favorite(item)">Favorite</button>\n\n        <button ion-button color="danger" (click)="share(item)">Share</button>\n\n      </ion-item-options>-->\n\n\n\n      <ion-item-options side="right">\n\n        <button ion-button color="danger" (click)="presentConfirm($event, item)">Delete</button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="noMoreItemsAvailable==true">\n\n    <ion-infinite-scroll-content>Loading...</ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(235);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_service__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_app_constants__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_hello_ionic_hello_ionic__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_secret_details_secret_details__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_edit_secret_edit_secret__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_list_list__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_logout_logout__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_profile_profile__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_reset_password_reset_password_module__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_hello_ionic_hello_ionic__["a" /* HelloIonicPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_secret_details_secret_details__["a" /* SecretDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_edit_secret_edit_secret__["a" /* EditSecretPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_logout_logout__["a" /* LogoutPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_profile_profile__["a" /* ProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/activate/activate.module#ActivatePageModule', name: 'ActivatePage', segment: 'activate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/add-secret/add-secret.module#AddSecretModule', name: 'AddSecret', segment: 'add-secret', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/change-password/change-password.module#ChangePaswordModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-secret/edit-secret.module#EditSecretModule', name: 'EditSecretPage', segment: 'edit-secret', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/logout/logout.module#LogoutModule', name: 'LogoutPage', segment: 'logout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomeModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfileModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reset-password/reset-password.module#ResetPasswordModule', name: 'ResetPasswordPage', segment: 'reset-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/secret-key/secret-key.module#SecretKeyPageModule', name: 'SecretKeyPage', segment: 'secret-key', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_17__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_16__pages_reset_password_reset_password_module__["ResetPasswordModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_hello_ionic_hello_ionic__["a" /* HelloIonicPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_secret_details_secret_details__["a" /* SecretDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_edit_secret_edit_secret__["a" /* EditSecretPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_logout_logout__["a" /* LogoutPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_profile_profile__["a" /* ProfilePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_6__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_1__providers_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_2__providers_api_DefaultApi__["a" /* DefaultApi */],
                __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* Utils */],
                __WEBPACK_IMPORTED_MODULE_4__constants_app_constants__["a" /* AppConstants */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    return User;
}());

var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                var access = (credentials.password === "pass" && credentials.email === "email");
                _this.currentUser = new User('Simon', 'saimon@devdactic.com');
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthService.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BASE_PATH; });
/* unused harmony export COLLECTION_FORMATS */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var BASE_PATH = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
//# sourceMappingURL=variables.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_logout_logout__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_reset_password_reset_password__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ListPage } from '../pages/list/list';








var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen, storage) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        // make LoginPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            //{ title: 'Hello Ionic', component: HelloIonicPage },
            //{ title: 'My First List', component: ListPage },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'home' },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */], icon: 'person' },
            { title: 'Reset Password', component: __WEBPACK_IMPORTED_MODULE_6__pages_reset_password_reset_password__["a" /* ResetPasswordPage */], icon: 'key' },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_3__pages_logout_logout__["a" /* LogoutPage */], icon: 'log-out' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        if (page.title == 'Logout') {
            this.storage.set('user', null);
            this.nav.setRoot(this.rootPage);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\app\app.html"*/'<ion-menu [content]="content">\n\n\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Pages</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        <ion-icon name="{{p.icon}}" color="bright" item-left></ion-icon>\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelloIonicPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelloIonicPage = (function () {
    function HelloIonicPage() {
    }
    HelloIonicPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-hello-ionic',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\hello-ionic\hello-ionic.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Hello Ionic</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <h3>Welcome to your first Ionic app!</h3>\n\n\n\n  <p>\n\n    This starter project is our way of helping you get a functional app running in record time.\n\n  </p>\n\n  <p>\n\n    Follow along on the tutorial section of the Ionic docs!\n\n  </p>\n\n  <p>\n\n    <button ion-button color="primary" menuToggle>Toggle Menu</button>\n\n  </p>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\hello-ionic\hello-ionic.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HelloIonicPage);
    return HelloIonicPage;
}());

//# sourceMappingURL=hello-ionic.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secret_details_secret_details__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__secret_details_secret_details__["a" /* SecretDetailsPage */], {
            item: item
        });
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>My First List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <button ion-button class="register-btn" block clear >Create New Account</button>\n\n  <!--<ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon name="{{item.icon}}" item-left></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-right>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>-->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__variables__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configuration__ = __webpack_require__(123);
/**
 * secret
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
        this.basePath = 'https://tkbl964yv9.execute-api.us-west-1.amazonaws.com/prod';
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
     * @param id
     */
    DefaultApi.prototype.secretsIdDelete = function (id, extraHttpRequestParams) {
        return this.secretsIdDeleteWithHttpInfo(id, extraHttpRequestParams)
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
    DefaultApi.prototype.secretsIdGet = function (id, extraHttpRequestParams) {
        return this.secretsIdGetWithHttpInfo(id, extraHttpRequestParams)
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
    DefaultApi.prototype.secretsIdOptions = function (id, extraHttpRequestParams) {
        return this.secretsIdOptionsWithHttpInfo(id, extraHttpRequestParams)
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
     * @param updateSecretRequest
     */
    DefaultApi.prototype.secretsIdPut = function (id, updateSecretRequest, extraHttpRequestParams) {
        return this.secretsIdPutWithHttpInfo(id, updateSecretRequest, extraHttpRequestParams)
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
    DefaultApi.prototype.secretsOptions = function (extraHttpRequestParams) {
        return this.secretsOptionsWithHttpInfo(extraHttpRequestParams)
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
     * @param insertSecretRequest
     */
    DefaultApi.prototype.secretsPost = function (insertSecretRequest, extraHttpRequestParams) {
        return this.secretsPostWithHttpInfo(insertSecretRequest, extraHttpRequestParams)
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
    DefaultApi.prototype.secretsSearchGet = function (query, limit, cursor, extraHttpRequestParams) {
        return this.secretsSearchGetWithHttpInfo(query, limit, cursor, extraHttpRequestParams)
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
    DefaultApi.prototype.secretsSearchOptions = function (extraHttpRequestParams) {
        return this.secretsSearchOptionsWithHttpInfo(extraHttpRequestParams)
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
     */
    DefaultApi.prototype.usersUpdatesecretkeyOptions = function (extraHttpRequestParams) {
        return this.usersUpdatesecretkeyOptionsWithHttpInfo(extraHttpRequestParams)
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
     * @param updateSecretKeyRequest
     */
    DefaultApi.prototype.usersUpdatesecretkeyPost = function (updateSecretKeyRequest, extraHttpRequestParams) {
        return this.usersUpdatesecretkeyPostWithHttpInfo(updateSecretKeyRequest, extraHttpRequestParams)
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
        // authentication (secretAuthorizer2) required
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
     * @param id
     */
    DefaultApi.prototype.secretsIdDeleteWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/secrets/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling secretsIdDelete.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (secretAuthorizer2) required
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
    DefaultApi.prototype.secretsIdGetWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/secrets/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling secretsIdGet.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (secretAuthorizer2) required
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
    DefaultApi.prototype.secretsIdOptionsWithHttpInfo = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/secrets/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling secretsIdOptions.');
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
     * @param updateSecretRequest
     */
    DefaultApi.prototype.secretsIdPutWithHttpInfo = function (id, updateSecretRequest, extraHttpRequestParams) {
        var path = this.basePath + '/secrets/${id}'
            .replace('${' + 'id' + '}', String(id));
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling secretsIdPut.');
        }
        // verify required parameter 'updateSecretRequest' is not null or undefined
        if (updateSecretRequest === null || updateSecretRequest === undefined) {
            throw new Error('Required parameter updateSecretRequest was null or undefined when calling secretsIdPut.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (secretAuthorizer2) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put,
            headers: headers,
            body: updateSecretRequest == null ? '' : JSON.stringify(updateSecretRequest),
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
    DefaultApi.prototype.secretsOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/secrets';
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
     * @param insertSecretRequest
     */
    DefaultApi.prototype.secretsPostWithHttpInfo = function (insertSecretRequest, extraHttpRequestParams) {
        var path = this.basePath + '/secrets';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'insertSecretRequest' is not null or undefined
        if (insertSecretRequest === null || insertSecretRequest === undefined) {
            throw new Error('Required parameter insertSecretRequest was null or undefined when calling secretsPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (secretAuthorizer2) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: insertSecretRequest == null ? '' : JSON.stringify(insertSecretRequest),
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
    DefaultApi.prototype.secretsSearchGetWithHttpInfo = function (query, limit, cursor, extraHttpRequestParams) {
        var path = this.basePath + '/secrets/search';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'query' is not null or undefined
        if (query === null || query === undefined) {
            throw new Error('Required parameter query was null or undefined when calling secretsSearchGet.');
        }
        // verify required parameter 'limit' is not null or undefined
        if (limit === null || limit === undefined) {
            throw new Error('Required parameter limit was null or undefined when calling secretsSearchGet.');
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
        // authentication (secretAuthorizer2) required
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
    DefaultApi.prototype.secretsSearchOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/secrets/search';
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
        // authentication (secretAuthorizer2) required
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
        // authentication (secretAuthorizer2) required
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
        // authentication (secretAuthorizer2) required
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
        // authentication (secretAuthorizer2) required
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
     */
    DefaultApi.prototype.usersUpdatesecretkeyOptionsWithHttpInfo = function (extraHttpRequestParams) {
        var path = this.basePath + '/users/updatesecretkey';
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
     * @param updateSecretKeyRequest
     */
    DefaultApi.prototype.usersUpdatesecretkeyPostWithHttpInfo = function (updateSecretKeyRequest, extraHttpRequestParams) {
        var path = this.basePath + '/users/updatesecretkey';
        var queryParameters = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */](this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'updateSecretKeyRequest' is not null or undefined
        if (updateSecretKeyRequest === null || updateSecretKeyRequest === undefined) {
            throw new Error('Required parameter updateSecretKeyRequest was null or undefined when calling usersUpdatesecretkeyPost.');
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        // to determine the Accept header
        var produces = [
            'application/json'
        ];
        // authentication (secretAuthorizer2) required
        if (this.configuration.apiKey) {
            headers.set('Authorization', this.configuration.apiKey);
        }
        headers.set('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            headers: headers,
            body: updateSecretKeyRequest == null ? '' : JSON.stringify(updateSecretKeyRequest),
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()), __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__variables__["a" /* BASE_PATH */])), __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], String, __WEBPACK_IMPORTED_MODULE_4__configuration__["a" /* Configuration */]])
    ], DefaultApi);
    return DefaultApi;
}());

//# sourceMappingURL=DefaultApi.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_configuration__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_crypto_js_crypto_js__ = __webpack_require__(105);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], Utils);
    return Utils;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecretDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_secret_edit_secret__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypto_js_crypto_js__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypto_js_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_crypto_js_crypto_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SecretDetailsPage = (function () {
    function SecretDetailsPage(navCtrl, navParams, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.SECERET_KEY = '';
        this.decryptedPassword = '';
        this.encryptedPassword = '';
        // If we navigated to this page, we will have an item available as a nav param    
        this.selectedItem = this.navParams.get('secret');
    }
    SecretDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (value) {
            _this.SECERET_KEY = value.item.secretKey;
            _this.encryptedPassword = _this.selectedItem.password.toString();
            _this.decryptedPassword = _this.selectedItem.password.toString();
        });
    };
    SecretDetailsPage.prototype.openEdit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edit_secret_edit_secret__["a" /* EditSecretPage */], { 'secret': this.selectedItem });
    };
    SecretDetailsPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Secret Key',
            message: 'Enter your key to decrypt password.',
            inputs: [
                {
                    name: 'key',
                    placeholder: 'key',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Decrypt',
                    handler: function (data) {
                        if (data.key === _this.SECERET_KEY) {
                            var bytes = __WEBPACK_IMPORTED_MODULE_4_crypto_js_crypto_js__["AES"].decrypt(_this.encryptedPassword, _this.SECERET_KEY);
                            var plaintext = bytes.toString(__WEBPACK_IMPORTED_MODULE_4_crypto_js_crypto_js__["enc"].Utf8);
                            _this.decryptedPassword = plaintext;
                        }
                        else {
                            _this.showError('Incorrect key!');
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    SecretDetailsPage.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    SecretDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-secret-details',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\secret-details\secret-details.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Secret Details</ion-title>\n\n    <ion-buttons end>\n\n    <button (click)="openEdit()" ion-button>\n\n      Edit\n\n    </button>\n\n  </ion-buttons>\n\n  \n\n </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <!--<h3 text-center *ngIf="selectedItem">\n\n    {{selectedItem.title}}\n\n    <ion-icon [name]="selectedItem.icon"></ion-icon>\n\n  </h3>\n\n  <h4 text-center *ngIf="selectedItem">\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </h4>-->\n\n  <ion-list *ngIf="selectedItem">\n\n    <ion-item>\n\n      <ion-label stacked> Domain </ion-label>\n\n      <ion-label> {{selectedItem.domain}} </ion-label>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label stacked> Username </ion-label>\n\n      <ion-label> {{selectedItem.username}} </ion-label>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label stacked> Password </ion-label>\n\n      <ion-label> {{decryptedPassword}} </ion-label>\n\n    </ion-item>\n\n    <!-- <ion-item>\n\n      <ion-label stacked> Decrypted Password </ion-label>\n\n      <ion-label> {{decryptedPassword}} </ion-label>\n\n    </ion-item> -->\n\n    <ion-item>\n\n      <ion-label stacked> Note </ion-label>\n\n      <ion-label> {{selectedItem.note}} </ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <button type="submit" ion-button color="primary" block class="submit-btn" (click)="presentPrompt()">View</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\secret-details\secret-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SecretDetailsPage);
    return SecretDetailsPage;
}());

//# sourceMappingURL=secret-details.js.map

/***/ })

},[211]);
//# sourceMappingURL=main.js.map