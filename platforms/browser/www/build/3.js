webpackJsonp([3],{

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivatePageModule", function() { return ActivatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__activate__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ActivatePageModule = (function () {
    function ActivatePageModule() {
    }
    ActivatePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__activate__["a" /* ActivatePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__activate__["a" /* ActivatePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__activate__["a" /* ActivatePage */]
            ]
        })
    ], ActivatePageModule);
    return ActivatePageModule;
}());

//# sourceMappingURL=activate.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivatePage; });
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




/**
 * Generated class for the ActivatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ActivatePage = (function () {
    function ActivatePage(navCtrl, navParams, alertCtrl, formBuilder, api, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.userInfo = { activateCode: '' };
    }
    ActivatePage.prototype.ngOnInit = function () {
        this.myForm = this.formBuilder.group({
            'activateCode': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, this.activateCodeValidator.bind(this)]]
        });
    };
    ActivatePage.prototype.onSubmit = function () {
        var _this = this;
        this.showLoading();
        var request = {};
        request.activateCode = this.userInfo.activateCode;
        this.api.activatePost(request).subscribe(function (response) {
            console.log(response);
            debugger;
            if (response.item !== null) {
                if (response.item.secretKey === undefined || response.item.secretKey === null) {
                    _this.navCtrl.push('SecretKeyPage');
                }
                else {
                    _this.navCtrl.push('HomePage');
                }
            }
            else {
                _this.navCtrl.push('HomePage');
            }
        }, function (error) {
            _this.showError(error);
        });
    };
    ActivatePage.prototype.isValid = function (field) {
        //let formField = this.myForm.find(field);
        //return formField.valid || formField.pristine;
        return true;
    };
    ActivatePage.prototype.activateCodeValidator = function (control) {
        if (control.value !== '') {
            return { invalidActivateCode: true };
        }
    };
    ActivatePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ActivatePage.prototype.showError = function (text) {
        debugger;
        this.loading.dismiss();
        var object = JSON.parse(text._body);
        console.log(object);
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: object.errorMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    ActivatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-activate',template:/*ion-inline-start:"/home/phultu/Phu/Samples/networkXXX/frontend/src/pages/activate/activate.html"*/'<!--\n  Generated template for the ActivatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>activate</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n    <ion-list>    \n        <ion-item>\n          <ion-label floating primary>Code</ion-label>\n          <ion-input [(ngModel)]="userInfo.activateCode" formControlName="activateCode" type="activateCode"\n                     id="activateCode" spellcheck="false" autocapitalize="off">\n          </ion-input>\n        </ion-item>\n        <p *ngIf="!isValid(\'activateCode\')" danger padding-left>Invalid activateCode</p>        \n    </ion-list>\n\n    <div padding>\n      <button ion-button color="primary" block>Activate</button>\n    </div>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/phultu/Phu/Samples/networkXXX/frontend/src/pages/activate/activate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_api_DefaultApi__["a" /* DefaultApi */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ActivatePage);
    return ActivatePage;
}());

//# sourceMappingURL=activate.js.map

/***/ })

});
//# sourceMappingURL=3.js.map