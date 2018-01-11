webpackJsonp([6],{

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function() { return NotificationsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notifications__ = __webpack_require__(467);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NotificationsPageModule = (function () {
    function NotificationsPageModule() {
    }
    return NotificationsPageModule;
}());
NotificationsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__notifications__["a" /* NotificationsListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__notifications__["a" /* NotificationsListPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__notifications__["a" /* NotificationsListPage */]
        ]
    })
], NotificationsPageModule);

//# sourceMappingURL=notifications.module.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsListPage = (function () {
    function NotificationsListPage(navCtrl, loadingCtrl, sync, dataService, translateService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.sync = sync;
        this.dataService = dataService;
        this.translateService = translateService;
        this.notifications = [];
        this.userID = "";
    }
    NotificationsListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimelinePage');
        this.getNotificationData();
    };
    NotificationsListPage.prototype.getNotificationData = function () {
        var _this = this;
        this.dataService.getUser().then(function (user) {
            _this.dataService.getMob_notifications(user.id).then(function (notifications) {
                _this.notifications = notifications;
            });
        });
    };
    NotificationsListPage.prototype.syncData = function () {
        // Our translated text strings
        var syncingLabelString = "";
        this.translateService.get('SYNCING_LABEL').subscribe(function (value) {
            syncingLabelString = value;
        });
        var loader = this.loadingCtrl.create({
            content: syncingLabelString,
        });
        loader.present();
        this.sync.syncAllLocalTables().then(function () {
            loader.dismiss();
        });
    };
    return NotificationsListPage;
}());
NotificationsListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-notifications',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\notifications\notifications.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{\'NOTIFICATIONS_TITLE\' | translate}}\n\n        </ion-title>\n\n\n\n        <!--<ion-buttons end>\n\n            <button ion-button icon-only>\n\n                <ion-icon name="ios-notifications-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>-->\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="syncData()">\n\n                <ion-icon name="ios-refresh-outline"></ion-icon>\n\n                {{\'SYNC\' | translate}}\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n\n\n    <div class="activity-status">\n\n\n\n    </div>\n\n</ion-header>\n\n\n\n<ion-content class="chats">\n\n    <ion-list>\n\n        <ng-container *ngIf="notifications.length > 0;else notificationBlock;">\n\n            <ion-item *ngFor="let notification of notifications">\n\n                <ion-avatar item-start class="notification-date">\n\n                    <span>{{notification.n_notificationRead | date:\'MMM\'}}</span><br />\n\n                    <span>{{notification.n_notificationRead | date:\'dd\'}}</span>\n\n                </ion-avatar>\n\n                <h2>{{notification.n_notificationMessage | translate}} </h2>\n\n                <ion-note item-end color="primary">\n\n                    <ion-icon name="md-time"></ion-icon>\n\n                    {{notification.n_notificationRead | date:"hh:mm a" | lowercase}}\n\n                </ion-note>\n\n            </ion-item>\n\n        </ng-container>\n\n        <ng-template #notificationBlock>\n\n            <ion-item class="notification-message">\n\n                <h2>{{\'NOTIFICATION_NO_RECORDS_MESSAGE\' | translate}}</h2>\n\n            </ion-item>\n\n        </ng-template>\n\n\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\notifications\notifications.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
], NotificationsListPage);

//# sourceMappingURL=notifications.js.map

/***/ })

});
//# sourceMappingURL=6.js.map