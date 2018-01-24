webpackJsonp([1],{

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(306);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterModule = (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]
            ]
        })
    ], RegisterModule);
    return RegisterModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__ = __webpack_require__(33);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\register\register.html"*/'<!--\n\n  Generated template for the Register page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!--<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>register</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>-->\n\n\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Register</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n\n    <ion-list>    \n\n        <ion-item>\n\n          <ion-label floating primary>Name</ion-label>\n\n          <ion-input [(ngModel)]="userInfo.name" formControlName="name" type="text"\n\n                     id="name" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'name\')" danger padding-left class="invalid">Invalid Name</p>\n\n        <ion-item>\n\n          <ion-label floating primary>Email</ion-label>\n\n          <ion-input type="text" [(ngModel)]="userInfo.email" formControlName="email"\n\n                     id="email" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'email\')" danger padding-left class="invalid">Invalid Email</p>\n\n        <ion-item>\n\n          <ion-label floating primary>Password</ion-label>\n\n          <ion-input type="password" [(ngModel)]="userInfo.password" formControlName="password"\n\n                     id="password" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'password\')" danger padding-left class="invalid">Invalid Password</p>\n\n        <ion-item>\n\n          <ion-label floating primary>Confirm Password</ion-label>\n\n          <ion-input type="password" [(ngModel)]="userInfo.confirmPassword" formControlName="confirmPassword"\n\n                     id="confirmPassword" spellcheck="false" autocapitalize="off">\n\n          </ion-input>\n\n        </ion-item>\n\n        <p *ngIf="!isValid(\'confirmPassword\')" danger padding-left class="invalid">Invalid Password</p>        \n\n    </ion-list>\n\n\n\n    <div padding>\n\n      <button ion-button color="primary" block>Create Account</button>\n\n    </div>\n\n  </form>\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\FPT LA\samples\secretX\frontend\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=1.js.map