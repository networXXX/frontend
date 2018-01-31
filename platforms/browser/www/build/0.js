webpackJsonp([0],{

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordPageModule", function() { return ResetPasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reset_password__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ResetPasswordPageModule = (function () {
    function ResetPasswordPageModule() {
    }
    ResetPasswordPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__reset_password__["a" /* ResetPasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__reset_password__["a" /* ResetPasswordPage */]),
            ],
        })
    ], ResetPasswordPageModule);
    return ResetPasswordPageModule;
}());

//# sourceMappingURL=reset-password.module.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__ = __webpack_require__(108);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reset-password',template:/*ion-inline-start:"/home/phultu/Phu/Samples/networkXXX/frontend/src/pages/reset-password/reset-password.html"*/'<!--\n  Generated template for the ResetPasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Reset Password</ion-title>\n    <ion-buttons end>\n		<button (click)="onSubmit()" ion-button [disabled]="!resetPwdFrom.valid">\n			Reset\n		</button>\n	</ion-buttons>\n  </ion-navbar>  \n</ion-header>\n\n<ion-content padding>\n	<form [formGroup]="resetPwdFrom" (ngSubmit)="onSubmit()">\n		<ion-list>\n			<ion-item>\n	          <ion-label floating primary>Email</ion-label>\n	          <ion-input  [(ngModel)]="email" formControlName="email"\n	                     type="text" id="email" spellcheck="false" autocapitalize="off">\n	          </ion-input>\n	        </ion-item>				            \n		</ion-list>\n		<div padding>\n	      <button ion-button color="primary" block>Reset</button>\n	    </div>\n	</form>\n</ion-content>'/*ion-inline-end:"/home/phultu/Phu/Samples/networkXXX/frontend/src/pages/reset-password/reset-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());

//# sourceMappingURL=reset-password.js.map

/***/ })

});
//# sourceMappingURL=0.js.map