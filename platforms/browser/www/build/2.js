webpackJsonp([2],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageModule", function() { return ChangePasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password__ = __webpack_require__(311);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangePasswordPageModule = (function () {
    function ChangePasswordPageModule() {
    }
    ChangePasswordPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]),
            ],
        })
    ], ChangePasswordPageModule);
    return ChangePasswordPageModule;
}());

//# sourceMappingURL=change-password.module.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(51);
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
var ChangePasswordPage = (function () {
    function ChangePasswordPage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.user = { email: '', password: '', confirmPassword: '', changeKey: '' };
        this.SECERET_KEY = '';
    }
    ChangePasswordPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('email').then(function (val) {
            _this.user.email = val;
        });
        this.chnagePwdFrom = this.formBuilder.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})')]],
            confirmPassword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.confirmPasswordValidator.bind(this)]],
            changeKey: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    ChangePasswordPage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        if (this.chnagePwdFrom.valid === true) {
            var request = {};
            request.email = this.user.email;
            request.password = this.user.password;
            request.changeKey = this.user.changeKey;
            this.api.usersChangepasswordPost(request).subscribe(function (response) {
                _this.storage.set('user', response);
                _this.navCtrl.push('SecretKeyPage');
            }, function (error) {
                _this.showError(error);
            });
        }
        else {
            this.showError("Please fix the error field.");
        }
    };
    ChangePasswordPage.prototype.isValid = function (field) {
        var formField = this.chnagePwdFrom.controls[field];
        if (formField !== undefined) {
            return (formField.valid || formField.pristine);
        }
        return true;
    };
    ChangePasswordPage.prototype.confirmPasswordValidator = function (control) {
        if (!(control.value === this.user.password)) {
            console.log(control.value);
            console.log(this.user.password);
            return { invalidConfirmPassword: true };
        }
    };
    ChangePasswordPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ChangePasswordPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    ChangePasswordPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-change-password',template:/*ion-inline-start:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\change-password\change-password.html"*/'<!--\n\n  Generated template for the ChangePasswordPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Change Password</ion-title>\n\n    <ion-buttons end>\n\n		<button (click)="onSubmit()" ion-button [disabled]="!chnagePwdFrom.valid">\n\n			Save\n\n		</button>\n\n	</ion-buttons>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content padding>\n\n	<form [formGroup]="chnagePwdFrom" (ngSubmit)="onSubmit()">\n\n		<ion-list>\n\n			<ion-item>\n\n	          <ion-label floating primary>Email</ion-label>\n\n	          <ion-input  [(ngModel)]="user.email" formControlName="email"\n\n	                     type="text" id="email" spellcheck="false" autocapitalize="off" >\n\n	          </ion-input>\n\n	        </ion-item>		\n\n	        <p *ngIf="!isValid(\'email\')" danger padding-left class="invalid">Invalid Name</p>        	\n\n	        <ion-item>\n\n	          <ion-label floating primary>Password</ion-label>\n\n	          <ion-input type="password" [(ngModel)]="user.password" formControlName="password"\n\n	                     id="password" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'password\')" danger padding-left class="invalid">Invalid Password</p>    \n\n	        <ion-item>\n\n	          <ion-label floating primary>Confirm Password</ion-label>\n\n	          <ion-input type="password" [(ngModel)]="user.confirmPassword" formControlName="confirmPassword" \n\n	          			 id="confirmPassword" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>\n\n	        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left class="invalid">Invalid Confirm Password</p>  \n\n	        <ion-item>\n\n	          <ion-label floating primary>Key</ion-label>\n\n	          <ion-input  [(ngModel)]="user.changeKey" formControlName="changeKey"\n\n	                     type="text" id="changeKey" spellcheck="false" autocapitalize="off">\n\n	          </ion-input>\n\n	        </ion-item>	  \n\n	        <p *ngIf="!isValid(\'changeKey\')" danger padding-left class="invalid">Required</p>        \n\n		</ion-list>\n\n		<div padding>\n\n	      <button ion-button color="primary" block>Save</button>\n\n	    </div>\n\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\FPT LA\samples\networkXXX\frontend\src\pages\change-password\change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ })

});
//# sourceMappingURL=2.js.map