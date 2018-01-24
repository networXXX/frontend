webpackJsonp([3],{

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddSecretModule", function() { return AddSecretModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_secret__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddSecretModule = (function () {
    function AddSecretModule() {
    }
    AddSecretModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_secret__["a" /* AddSecret */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add_secret__["a" /* AddSecret */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__add_secret__["a" /* AddSecret */]
            ]
        })
    ], AddSecretModule);
    return AddSecretModule;
}());

//# sourceMappingURL=add-secret.module.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSecret; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__);
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
var AddSecret = (function () {
    function AddSecret(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.SECERET_KEY = '';
        this.submitAttempt = false;
        this.secret = { userId: '', domain: '', username: '', password: '', confirmPassword: '', encryptedPassword: '', note: '', secretKey: '' };
    }
    AddSecret.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('user').then(function (val) {
            var loginUser = val;
            _this.SECERET_KEY = loginUser.item.secretKey;
            _this.secret.userId = loginUser.item.id;
            _this.api.configuration = __WEBPACK_IMPORTED_MODULE_5__utils_utils__["a" /* Utils */].getConfiguration(loginUser);
        });
        this.addForm = this.formBuilder.group({
            domain: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3)]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            confirmPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.confirmPasswordValidator.bind(this)]],
            encryptedPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            note: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    AddSecret.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        if (this.addForm.dirty && this.addForm.valid == true) {
            var request = {};
            request.userId = this.secret.userId;
            request.domain = this.secret.domain;
            request.username = this.secret.username;
            request.password = this.secret.encryptedPassword;
            request.note = this.secret.note;
            this.api.secretsPost(request).subscribe(function (response) {
                _this.navCtrl.push('HomePage');
            }, function (error) {
                _this.showError(error);
            });
        }
        else {
            this.showError('Please fix the error field.');
        }
    };
    AddSecret.prototype.inputTestData = function () {
        var _this = this;
        var request = {};
        for (var i = 0; i < 40; i++) {
            request.userId = this.secret.userId;
            request.domain = 'domain' + i;
            request.username = 'username' + i;
            var ciphertext = __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["AES"].encrypt('password' + i, this.SECERET_KEY);
            request.password = ciphertext.toString();
            request.note = 'note' + i;
            this.api.secretsPost(request).subscribe(function (response) {
                //this.navCtrl.push('HomePage');
                //console.log(response);
            }, function (error) {
                _this.showError(error);
            });
        }
    };
    AddSecret.prototype.isValid = function (field) {
        var formField = this.addForm.controls[field];
        if (formField !== undefined) {
            return formField.valid || formField.pristine;
        }
        return true;
    };
    AddSecret.prototype.domainValidator = function (control) {
        if (control.value !== '') {
            console.log('domainValidator:' + control.valid);
            return { invalidDomain: true };
        }
    };
    AddSecret.prototype.usernameValidator = function (control) {
        if (control.value !== '') {
            return { invalidUsername: true };
        }
    };
    AddSecret.prototype.passwordValidator = function (control) {
        if (control.value !== '') {
            return { invalidPassword: true };
        }
    };
    AddSecret.prototype.confirmPasswordValidator = function (control) {
        if (control !== undefined) {
            if (control.value !== this.secret.password) {
                return { invalidConfirmPassord: true };
            }
        }
    };
    AddSecret.prototype.noteValidator = function (control) {
        return { invalidNote: true };
    };
    AddSecret.prototype.onInputTime = function (password) {
        this.setPasswordEncrypted(password);
        //console.log(this.getPasswordEcrypted(this.secret.encryptedPassword));
    };
    AddSecret.prototype.getPasswordEcrypted = function (pwd) {
        // Decrypt 
        var bytes = __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["AES"].decrypt(pwd.toString(), this.SECERET_KEY);
        var plaintext = bytes.toString(__WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["enc"].Utf8);
        return plaintext;
    };
    AddSecret.prototype.setPasswordEncrypted = function (pwd) {
        // Encrypt 
        var ciphertext = __WEBPACK_IMPORTED_MODULE_6_crypto_js_crypto_js__["AES"].encrypt(pwd, this.SECERET_KEY);
        this.secret.encryptedPassword = ciphertext.toString();
    };
    AddSecret.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    AddSecret.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    AddSecret.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    AddSecret = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-secret',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\add-secret\add-secret.html"*/'<!--\n\n  Generated template for the AddSecret page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Add Secret</ion-title>\n\n    <ion-buttons end>\n\n		<button (click)="onSubmit()" ion-button [disabled]="!addForm.valid">\n\n			Save\n\n		</button>\n\n	</ion-buttons>\n\n\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n	<form [formGroup]="addForm" (ngSubmit)="onSubmit()">\n\n		<ion-list>\n\n			<ion-item >\n\n				<ion-label floating primary>Domain</ion-label>\n\n				<ion-input [(ngModel)]="secret.domain" formControlName="domain" type="text"\n\n                     id="domain" spellcheck="false" autocapitalize="off">\n\n          		</ion-input>\n\n			</ion-item>\n\n\n\n			<!-- <ion-item *ngIf="!myForm.controls.domain.valid  && (myForm.controls.domain.dirty || submitAttempt)">\n\n                <p class="invalid">Please enter a valid name.</p>\n\n            </ion-item> -->\n\n			<p *ngIf="!isValid(\'domain\')" danger padding-left class="invalid">Invalid domain</p>\n\n			<ion-item>\n\n	          <ion-label floating primary>Username</ion-label>\n\n	          <ion-input [(ngModel)]="secret.username" formControlName="username" type="text"\n\n                     id="username" spellcheck="false" autocapitalize="off">\n\n          		</ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'username\')" danger padding-left class="invalid">Invalid username</p>\n\n	        <ion-item>\n\n	          <ion-label floating primary>Password</ion-label>\n\n	          <ion-input type="password" [(ngModel)]="secret.password" (input)=\'onInputTime($event.target.value)\' formControlName="password"\n\n	                     id="password" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'password\')" danger padding-left class="invalid">Invalid password</p>\n\n	        <ion-item>\n\n	          <ion-label floating primary>Confirm Password</ion-label>\n\n	          <ion-input [(ngModel)]="secret.confirmPassword" formControlName="confirmPassword" type="password"\n\n                     id="confirmPassword" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left class="invalid">Invalid Password</p>    \n\n	        <ion-item>\n\n	          <ion-label floating primary>Note</ion-label>\n\n	          <ion-input type="text" [(ngModel)]="secret.note" formControlName="note"\n\n	                     id="note" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item> \n\n	        <ion-item>\n\n	         <ion-label floating primary>Generate Password</ion-label>\n\n	          <ion-input type="text" [(ngModel)]="secret.encryptedPassword" formControlName="encryptedPassword" disabled="true"\n\n	                      id="encryptedPassword" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n		</ion-list>\n\n		<div padding>\n\n	      <button type="submit" ion-button color="primary" block [disabled]="!addForm.valid">Save</button>\n\n	    </div>\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\add-secret\add-secret.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], AddSecret);
    return AddSecret;
}());

//# sourceMappingURL=add-secret.js.map

/***/ })

});
//# sourceMappingURL=3.js.map