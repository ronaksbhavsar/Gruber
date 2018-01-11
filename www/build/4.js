webpackJsonp([4],{

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile__ = __webpack_require__(469);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProfilePageModule = (function () {
    function ProfilePageModule() {
    }
    return ProfilePageModule;
}());
ProfilePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__profile__["a" /* ProfilePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__profile__["a" /* ProfilePage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__profile__["a" /* ProfilePage */]
        ]
    })
], ProfilePageModule);

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_push__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_location_tracker_location_tracker__ = __webpack_require__(218);
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
var ProfilePage = ProfilePage_1 = (function () {
    function ProfilePage(navCtrl, loadingCtrl, 
        //public settings: Settings,
        navParams, translate, alertCtrl, locationTracker, sync, dataService, push) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.locationTracker = locationTracker;
        this.sync = sync;
        this.dataService = dataService;
        this.push = push;
        this.logoImage = 'assets/img/logo.png';
        this.profilePic = 'assets/img/avatar/profile-pic.png';
        this.user = {
            u_name: '',
            u_photo: 'assets/img/avatar/profile-pic.png'
        };
        this.tranlageMessage = [];
        this.subSettings = ProfilePage_1;
        this.translate.get([
            "SYNCING_LABEL",
            "PROFILE_SHOW_ALERT_TITLE",
            "PROFILE_SHOW_ALERT_SUBTITLE",
            "LOADING_LABEL",
        ]).subscribe(function (values) {
            _this.tranlageMessage['SYNCING_LABEL'] = values.SYNCING_LABEL;
            _this.tranlageMessage['PROFILE_SHOW_ALERT_TITLE'] = values.PROFILE_SHOW_ALERT_TITLE;
            _this.tranlageMessage['PROFILE_SHOW_ALERT_SUBTITLE'] = values.PROFILE_SHOW_ALERT_SUBTITLE;
            _this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
        });
        var isFirstTimeLogin = this.navParams.get('isFirstTimeLogin');
        if (isFirstTimeLogin) {
            var loader_1 = this.loadingCtrl.create({
                content: this.tranlageMessage['SYNCING_LABEL'],
            });
            loader_1.present();
            this.sync.syncAllLocalTables().then(function () {
                _this.getUserDetail();
                _this.initPushNotification();
                loader_1.dismiss();
                _this.locationTracker.startTracking();
            });
        }
        else {
            this.sync.syncAllLocalTables().then(function () {
                _this.locationTracker.startTracking();
            });
            this.getUserDetail();
        }
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('Hello Profile Page');
    };
    ProfilePage.prototype.getUserDetail = function () {
        var _this = this;
        this.dataService.getUser().then(function (response) {
            _this.user = response;
        });
    };
    ProfilePage.prototype.goToOtherPage = function (pageName) {
        this.navCtrl.push(pageName);
    };
    ProfilePage.prototype.syncData = function () {
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['SYNCING_LABEL'],
        });
        loader.present();
        return this.sync.syncAllLocalTables().then(function () {
            loader.dismiss();
            return true;
        });
    };
    ProfilePage.prototype.checkPageHasCurrentActivity = function () {
        var _this = this;
        this.dataService.getCurrentActivityDetails().then(function (currentActivity) {
            if (currentActivity) {
                _this.goToOtherPage('CurrentActivityPage');
            }
            else {
                var alertMsg = _this.alertCtrl.create({
                    title: _this.tranlageMessage['PROFILE_SHOW_ALERT_TITLE'],
                    subTitle: _this.tranlageMessage['PROFILE_SHOW_ALERT_SUBTITLE'],
                    buttons: [{
                            text: 'OK',
                            role: 'cancel'
                        }]
                });
                alertMsg.present();
            }
        });
    };
    ProfilePage.prototype.saveDeviceToken = function (t) {
        // Need to Save Registration Token in database..
        //const messageData =
        //    {
        //        'ms_messageId': "ae4a40c4-5482-4554-b10a-c18c946c7cd0",
        //        'ms_dtcreation': new Date(),
        //        'ms_sender': "a8b2040a-156f-40c3-9a1e-42cfc95681c5",
        //        'ms_message': t
        //    };
        ////alert(JSON.stringify(messageData));
        //this.sync.insertTableRow('Mob_messagesTexts', messageData)
        //    .then((result) => {
        //    });
    };
    ProfilePage.prototype.initPushNotification = function () {
        var _this = this;
        // to check if we have permission
        this.push.hasPermission()
            .then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We don\'t have permission to send push notifications');
            }
        });
        // to initialize push notifications
        var options = {
            android: {
                senderID: '1092171990852'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log('Received a notification', notification);
            //Notification Display Section
            var confirmAlert = _this.alertCtrl.create({
                title: 'New Notification',
                message: JSON.stringify(notification),
                buttons: [{
                        text: 'Ignore',
                        role: 'cancel'
                    }, {
                        text: 'View',
                        handler: function () {
                            //TODO: Your logic here
                            //self.nav.push(DetailsPage, {message: data.message});
                        }
                    }]
            });
            confirmAlert.present();
            //
        });
        pushObject.on('registration').subscribe(function (registration) {
            console.log('Device registered', registration);
            _this.saveDeviceToken(registration.registrationId);
        });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    return ProfilePage;
}());
ProfilePage = ProfilePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\profile\profile.html"*/'<!--<ion-header>\n\n\n\n    <ion-navbar>\n\n        <ion-title>{{ \'PROFILE_TITLE\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>-->\n\n<ion-content>\n\n    <div id="profile-bg"></div>\n\n    <div id="content">\n\n        <div>\n\n            <div id="profile-info" padding>\n\n                <ion-row>\n\n                    <ion-col col-2>\n\n                        <button ion-button small item-start class="notification-button" (click)="goToOtherPage(\'NotificationsListPage\')">\n\n                            <ion-icon name="ios-notifications-outline"></ion-icon>\n\n                        </button>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <img id="profile-image" [src]="user.u_photo || profilePic">\n\n                        <button ion-button small item-start class="settings-button" (click)="goToOtherPage(\'SettingsPage\')">\n\n                            <ion-icon name="settings"></ion-icon>\n\n                        </button>\n\n                    </ion-col>\n\n                    <ion-col col-2>\n\n                        <button ion-button small item-end class="sync-button" (click)="syncData()">\n\n                            <ion-icon name="ios-refresh-outline">&nbsp;</ion-icon>\n\n                            {{\'SYNC\' | translate}}\n\n                        </button>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <p class="welcome-back">{{\'WELCOME_BACK\' | translate}},</p>\n\n                <h3 id="profile-name">{{user.u_name}}</h3>\n\n            </div>\n\n\n\n            <ion-row class="quick-tools">\n\n                <ion-col col-12>\n\n                    <span>{{\'PROFILE_QUICKTOOLS\' | translate}}</span>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-grid class="main-features">\n\n                <ion-row>\n\n                    <ion-col col-6 text-center class="b-right b-bottom" (click)="checkPageHasCurrentActivity()">\n\n                        <!--<ion-icon name="pulse"></ion-icon>-->\n\n                        <img src="assets/img/current-activity.png" />\n\n                        <span class="item-block">{{\'PROFILE_CURRENTACTIVITY\' | translate}}</span>\n\n                    </ion-col>\n\n                    <ion-col col-6 text-center class="b-bottom" (click)="goToOtherPage(\'ActivityListPage\')">\n\n\n\n                        <img src="assets/img/activities.png" />\n\n                        <span class="item-block">{{\'PROFILE_ACTIVITIES\' | translate}}</span>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row>\n\n                    <ion-col col-6 text-center class="b-right" (click)="goToOtherPage(\'ChatsPage\')">\n\n                        <img src="assets/img/messages.png" class="img-icon" />\n\n                        <span class="item-block">{{\'PROFILE_MESSAGES\' | translate}}</span>\n\n                    </ion-col>\n\n                    <ion-col col-6 text-center>\n\n                        <img src="assets/img/statistics.png" class="img-icon" />\n\n                        <span class="item-block">{{\'PROFILE_STATISTICS\' | translate}}</span>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n\n\n            <ion-row class="footer">\n\n                <ion-col col-12>\n\n                    <span class="footer-text">{{\'PROFILE_A_PRODUCTBY\' | translate}}<img [src]="logoImage" /> </span>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n    </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\profile\profile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__providers_location_tracker_location_tracker__["a" /* LocationTracker */],
        __WEBPACK_IMPORTED_MODULE_5__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_push__["a" /* Push */]])
], ProfilePage);

var ProfilePage_1;
//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=4.js.map