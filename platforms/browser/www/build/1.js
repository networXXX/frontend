webpackJsonp([1],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(307);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { IonicPage } from 'ionic-angular';
//import {OnInit, Component} from "@angular/core";


/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.userInfo = { name: '', email: '', password: '', confirmPassword: '' };
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.myForm = this.formBuilder.group({
            'name': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3)]],
            'email': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            'password': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})')]],
            'confirmPassword': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.confirmPasswordValidator.bind(this)]],
        });
    };
    RegisterPage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        if (this.myForm.valid == true) {
            var request = {};
            request.password = this.userInfo.password;
            request.displayName = this.userInfo.name;
            request.email = this.userInfo.email;
            this.api.registerPost(request).subscribe(function (response) {
                _this.navCtrl.push('ActivatePage');
            }, function (error) {
                _this.showError(error);
            });
        }
        else {
            this.showError('Please fix the error field.');
        }
    };
    RegisterPage.prototype.isValid = function (field) {
        var formField = this.myForm.controls[field];
        return formField.valid || formField.pristine;
    };
    RegisterPage.prototype.nameValidator = function (control) {
        if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
            return { invalidName: true };
        }
    };
    RegisterPage.prototype.passwordValidator = function (control) {
        //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        if (!control.value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')) {
            return { invalidPassword: true };
        }
    };
    RegisterPage.prototype.confirmPasswordValidator = function (control) {
        if (!(control.value === this.userInfo.password)) {
            console.log(control.value);
            console.log(this.userInfo.password);
            return { invalidConfirmPassword: true };
        }
    };
    RegisterPage.prototype.emailValidator = function (control) {
        // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
        if (!(control.value.toLowerCase().match('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'))) {
            return { invalidEmail: true };
        }
    };
    RegisterPage.prototype.confirmEmailValidator = function (email, confirmEmail) {
        if (!(email.value.toLowerCase() == confirmEmail.value.toLowerCase())) {
            return { invalidConfirmEmail: true };
        }
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    RegisterPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var errorMsg = this.getErrorMessage(text);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: errorMsg,
            buttons: ['OK']
        });
        alert.present();
    };
    RegisterPage.prototype.getErrorMessage = function (text) {
        try {
            var object = JSON.parse(text._body);
            return object.errorMessage;
        }
        catch (e) {
            return text;
        }
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/home/phultu/Phu/Samples/networkXXX/frontend/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n    <ion-list>    \n        <ion-item>\n          <ion-label floating primary>Name</ion-label>\n          <ion-input [(ngModel)]="userInfo.name" formControlName="name" type="text"\n                     id="name" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'name\')" danger padding-left class="invalid">Invalid Name</p>\n        <ion-item>\n          <ion-label floating primary>Email</ion-label>\n          <ion-input type="text" [(ngModel)]="userInfo.email" formControlName="email"\n                     id="email" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'email\')" danger padding-left class="invalid">Invalid Email</p>\n        <ion-item>\n          <ion-label floating primary>Password</ion-label>\n          <ion-input type="password" [(ngModel)]="userInfo.password" formControlName="password"\n                     id="password" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'password\')" danger padding-left class="invalid">Invalid Password</p>\n        <ion-item>\n          <ion-label floating primary>Confirm Password</ion-label>\n          <ion-input type="password" [(ngModel)]="userInfo.confirmPassword" formControlName="confirmPassword"\n                     id="confirmPassword" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left class="invalid">Invalid Password</p>        \n    </ion-list>\n\n    <div padding>\n      <button ion-button color="primary" block>Create Account</button>\n    </div>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/phultu/Phu/Samples/networkXXX/frontend/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=1.js.map