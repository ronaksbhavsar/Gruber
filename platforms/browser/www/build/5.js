webpackJsonp([5],{

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings__ = __webpack_require__(469);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    return SettingsPageModule;
}());
SettingsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* SettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__settings__["a" /* SettingsPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* SettingsPage */]
        ]
    })
], SettingsPageModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__ = __webpack_require__(107);
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
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, dataService, sync, platform, actionsheetCtrl, translate, loadingCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.sync = sync;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        // Our local settings object
        this.pageTitle = "";
        this.userSettings = [];
        this.user = {
            id: "",
            u_name: "",
            selectedLanguage: "",
            imageUrl: ""
        };
        this.Languages = [
            {
                'name': 'English',
                'id': 'en'
            },
            {
                'name': 'Italian',
                'id': 'it'
            }
        ];
        this.getUserDetail();
        this.getUserSettings();
    }
    SettingsPage.prototype.getUserDetail = function () {
        var _this = this;
        this.dataService.getUser().then(function (response) {
            _this.user.id = response.id;
            _this.user.u_name = response.u_name;
            if (response.u_language == "" || response.u_language == null) {
                _this.user.selectedLanguage = _this.Languages[0];
            }
            else {
                _this.user.selectedLanguage = _this.Languages.filter(function (q) { return q.id == response.u_language; });
            }
        });
    };
    SettingsPage.prototype.getUserSettings = function () {
        var _this = this;
        this.dataService.getMob_UserSettings().then(function (response) {
            _this.userSettings = response;
        });
    };
    SettingsPage.prototype.updateSettingItem = function (option) {
        this.sync.updateTableRow('Mob_userSettings', {
            "id": option.id,
            "set_value": option.set_value
        }).then(function (result) {
        });
    };
    SettingsPage.prototype.updateUserName = function (value) {
        this.user.u_name = value;
        this.sync.updateTableRow('Mob_user', {
            "id": this.user.id,
            "u_name": this.user.u_name
        }).then(function (result) {
        });
    };
    SettingsPage.prototype.updateUserLanguages = function (option) {
        this.events.publish('changeUserLanguage', option.id);
        this.sync.updateTableRow('Mob_user', {
            "id": this.user.id,
            "u_language": option.id
        }).then(function (result) {
        });
    };
    SettingsPage.prototype.logoff = function () {
        var _this = this;
        this.dataService.clearUserData().then(function () {
            _this.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'backward' });
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\settings\settings.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{ \'SETTINGS_TITLE\' | translate }}</ion-title>\n\n\n\n        <ion-buttons end>\n\n            <button ion-button (click)="logoff()">\n\n                {{\'LOGOFF\' | translate}}\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content>\n\n    <ion-list no-border>\n\n\n\n        <ion-item>\n\n            <ion-label>{{ \'SETTINGS_NAME\' | translate }}</ion-label>\n\n            <ion-input [(ngModel)]="user.u_name" (blur)="updateUserName(user.u_name)" type="text"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label>{{ \'SETTINGS_LANGUAGE\' | translate }}</ion-label>\n\n            <ion-select [ngModel]="user.selectedLanguage" (ngModelChange)="updateUserLanguages($event)">\n\n                <ion-option *ngFor="let option of Languages" [value]="option">{{option.name}}</ion-option>\n\n            </ion-select>\n\n        </ion-item>\n\n\n\n        <ng-container *ngIf="userSettings.length > 0">\n\n            <ion-list-header>\n\n                {{\'SETTINGS_GENERAL_SETTINGS\' | translate }}\n\n            </ion-list-header>\n\n            <ion-item *ngFor="let option of userSettings">\n\n                <ion-label>{{option.set_key | translate}}</ion-label>\n\n                <ion-toggle [(ngModel)]="option.set_value" (ionChange)="updateSettingItem(option)"></ion-toggle>\n\n            </ion-item>\n\n        </ng-container>\n\n    </ion-list>\n\n</ion-content>\n\n '/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* Events */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=5.js.map