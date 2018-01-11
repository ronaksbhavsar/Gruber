webpackJsonp([11],{

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityListPageModule", function() { return ActivityListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_list__ = __webpack_require__(459);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActivityListPageModule = (function () {
    function ActivityListPageModule() {
    }
    return ActivityListPageModule;
}());
ActivityListPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__activity_list__["a" /* ActivityListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__activity_list__["a" /* ActivityListPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__activity_list__["a" /* ActivityListPage */]
        ]
    })
], ActivityListPageModule);

//# sourceMappingURL=activity-list.module.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityListPage; });
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





var ActivityListPage = (function () {
    function ActivityListPage(navCtrl, loadingCtrl, sync, dataService, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.sync = sync;
        this.dataService = dataService;
        this.translate = translate;
        this.activeActivitiesList = [];
        this.completedActivitiesList = [];
        this.tranlageMessage = [];
        this.activityStatus = 'Active';
        this.translate.get([
            "LOADING_LABEL",
            "SYNCING_LABEL",
        ]).subscribe(function (values) {
            _this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
            _this.tranlageMessage['SYNCING_LABEL'] = values.SYNCING_LABEL;
        });
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present();
        this.dataService.getActiveActivities().then(function (activeActivities) {
            _this.activeActivitiesList = activeActivities;
        }).then(function () {
            _this.dataService.getCompletedActivities().then(function (completedActivities) {
                _this.completedActivitiesList = completedActivities;
            });
        }).then(function () {
            loader.dismiss();
        });
    }
    ActivityListPage.prototype.goToActivityDetailsPage = function (trip) {
        this.navCtrl.push('ActivityDetailsPage', { 'tripId': trip.id });
    };
    ActivityListPage.prototype.syncData = function () {
        // Our translated text strings
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['SYNCING_LABEL'],
        });
        loader.present();
        this.sync.syncAllLocalTables().then(function () {
            loader.dismiss();
        });
    };
    ActivityListPage.prototype.goToOtherPage = function (pageName) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(pageName);
    };
    return ActivityListPage;
}());
ActivityListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-activity-list',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\activity-list\activity-list.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{\'ACTIVITYLIST_TITLE\' | translate}}\n\n        </ion-title>\n\n\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="goToOtherPage(\'NotificationsListPage\')">\n\n                <ion-icon name="ios-notifications-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="syncData()">\n\n                <ion-icon name="ios-refresh-outline"></ion-icon>\n\n                {{\'SYNC\' | translate}}\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n\n\n    <div class="activity-status">\n\n        <ion-segment [(ngModel)]="activityStatus">\n\n            <ion-segment-button value="Active">\n\n                {{\'ACTIVITYLIST_ACTIVE\' | translate}}\n\n            </ion-segment-button>\n\n            <ion-segment-button value="Complete">\n\n                {{\'ACTIVITYLIST_COMPLETE\' | translate}}\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </div>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div [ngSwitch]="activityStatus">\n\n        <ion-list *ngSwitchCase="\'Active\'">\n\n            <ng-container *ngIf="activeActivitiesList.length > 0;else activeActivitiesElseBlock;">\n\n                <ion-card *ngFor="let activityList of activeActivitiesList; let i = index;">\n\n                    <ion-row>\n\n                        <ion-col col-6 item-start>\n\n                            <ion-label class="label-bold">{{activityList.t_company}}-{{activityList.t_number}}/{{activityList.t_branch }}/{{activityList.t_year}}</ion-label>\n\n                        </ion-col>\n\n                        <ion-col col-6>\n\n                            <button item-end right ion-button small color="green" class="loading">\n\n                                {{activityList.ActivityStatus}}\n\n                            </button>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-card-content>\n\n                        <section id="cd-timeline" class="cd-container">\n\n                            <div>\n\n                                <div class="cd-timeline-block">\n\n                                    <div [ngClass]="i%2===0 ? \'cd-timeline-icon activity-green\' : \'cd-timeline-icon activity-yellow\'">\n\n                                    </div>\n\n                                    <div class="cd-timeline-content">\n\n                                        <h5 class="marginBottom0 marginTop0 label-bold">{{\'ACTIVITYLIST_LOADINGDETAILS\' | translate}}</h5>\n\n                                        <p class="marginTop5 cd-author">{{activityList.t_dtFirstLoading | date:\'dd\'}} <ion-icon name="md-calendar"></ion-icon> {{activityList.t_dtFirstLoading | date:\'MMMM\'}},{{activityList.t_dtFirstLoading | date:\'y\'}} {{activityList.t_dtFirstLoading | date:\'HH:mm\'}} <ion-icon name="md-time"></ion-icon></p>\n\n                                        <p class="timelineText"><ion-icon name="md-pin"></ion-icon> {{activityList.t_FirstLoadingPlace | translate}}</p>\n\n                                        <hr />\n\n                                    </div>\n\n\n\n                                </div>\n\n                                <div class="cd-timeline-block">\n\n                                    <div class="cd-timeline-icon activity-grey">\n\n                                    </div>\n\n                                    <div class="cd-timeline-content">\n\n                                        <h5 class="marginBottom0 marginTop0 label-bold">{{\'ACTIVITYLIST_UNLOADINGDETAILS\' | translate}}</h5>\n\n                                        <p class="marginTop5 cd-author">{{activityList.t_dtLastUnloading | date:\'dd\'}} <ion-icon name="md-calendar"></ion-icon> {{activityList.t_dtLastUnloading | date:\'MMMM\'}},{{activityList.t_dtLastUnloading | date:\'y\'}} {{activityList.t_dtLastUnloading | date:\'HH:mm\'}} <ion-icon name="md-time"></ion-icon></p>\n\n                                        <p class="timelineText"> <ion-icon name="md-pin"></ion-icon> {{activityList.t_LastUnLoadingPlace | translate}}</p>\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </section>\n\n                    </ion-card-content>\n\n                    <hr />\n\n                    <ion-row>\n\n                        <ion-col>\n\n                            <ion-label class="doc-status label-bold">\n\n                            {{\'ACTIVITYLIST_DOCUMENTSTATUS\' | translate}}\n\n                            </ion-label>\n\n                        </ion-col>\n\n                        <ion-col>\n\n                            <ion-badge item-end color="green">{{activityList.DocStatus | translate}}</ion-badge>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <button full ion-button icon-right color="green" (click)="goToActivityDetailsPage(activityList)">\n\n                        {{\'SEE_DETAILS\' | translate}}\n\n                        <ion-icon name="arrow-forward"></ion-icon>\n\n                    </button>\n\n\n\n                </ion-card>\n\n            </ng-container>\n\n            <ng-template #activeActivitiesElseBlock>\n\n                <ion-item class="no-activity-message">\n\n                    <h2>{{\'ACTIVITYLIST_NO_ACTIVE_ACTIVITY\' | translate}}</h2>\n\n                </ion-item>\n\n            </ng-template>\n\n        </ion-list>\n\n\n\n        <ion-list *ngSwitchCase="\'Complete\'">\n\n            <ng-container *ngIf="completedActivitiesList.length > 0;else completedActivitiesListBlock;">\n\n                <ion-card *ngFor="let activityList of completedActivitiesList; let i = index;">\n\n                    <ion-row>\n\n                        <ion-col col-6 item-start>\n\n                            <ion-label class="label-bold">{{activityList.t_company}}-{{activityList.t_number}}/{{activityList.t_branch}}/{{activityList.t_year}}</ion-label>\n\n                        </ion-col>\n\n                        <ion-col col-6>\n\n                            <button item-end right ion-button small color="green" class="loading">\n\n                                {{activityList.ActivityStatus}}\n\n                            </button>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                    <ion-card-content>\n\n                        <section id="cd-timeline" class="cd-container">\n\n                            <div>\n\n                                <div class="cd-timeline-block">\n\n                                    <div [ngClass]="i%2===0 ? \'cd-timeline-icon activity-yellow\' : \'cd-timeline-icon activity-green\'">\n\n                                    </div>\n\n\n\n                                    <div class="cd-timeline-content">\n\n                                        <h5 class="marginBottom0 marginTop0 label-bold">{{\'ACTIVITYLIST_LOADINGDETAILS\' | translate}}</h5>\n\n                                        <p class="marginTop5 cd-author">{{activityList.t_dtFirstLoading | date:\'dd\'}} <ion-icon name="md-calendar"></ion-icon> {{activityList.t_dtFirstLoading | date:\'MMMM\'}},{{activityList.t_dtFirstLoading | date:\'y\'}} {{activityList.t_dtFirstLoading | date:\'HH:mm\'}} <ion-icon name="md-time"></ion-icon></p>\n\n                                        <p class="timelineText"> <ion-icon name="md-pin"></ion-icon> {{activityList.t_FirstLoadingPlace | translate}}</p>\n\n                                        <hr />\n\n                                    </div>\n\n\n\n                                </div>\n\n                                <div class="cd-timeline-block">\n\n                                    <div class="cd-timeline-icon activity-grey">\n\n                                    </div>\n\n\n\n                                    <div class="cd-timeline-content">\n\n                                        <h5 class="marginBottom0 marginTop0 label-bold">{{\'ACTIVITYLIST_UNLOADINGDETAILS\' | translate}}</h5>\n\n                                        <p class="marginTop5 cd-author">{{activityList.t_dtLastUnloading | date:\'dd\'}} <ion-icon name="md-calendar"></ion-icon> {{activityList.t_dtLastUnloading | date:\'MMMM\'}},{{activityList.t_dtLastUnloading | date:\'y\'}} {{activityList.t_dtLastUnloading | date:\'HH:mm\'}} <ion-icon name="md-time"></ion-icon></p>\n\n                                        <p class="timelineText"><ion-icon name="md-pin"></ion-icon> {{activityList.t_LastUnLoadingPlace | translate}}</p>\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </section>\n\n                    </ion-card-content>\n\n                    <hr />\n\n                    <ion-row>\n\n                        <ion-col>\n\n                            <ion-label class="doc-status label-bold">{{\'ACTIVITYLIST_DOCUMENTSTATUS\' | translate}}</ion-label>\n\n                        </ion-col>\n\n                        <ion-col>\n\n                            <ion-badge item-end color="green">{{activityList.DocStatus | translate}}</ion-badge>\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                    <button full ion-button icon-right color="green" (click)="goToActivityDetailsPage(activityList)">\n\n                        {{\'SEE_DETAILS\' | translate}}\n\n                        <ion-icon name="arrow-forward"></ion-icon>\n\n                    </button>\n\n\n\n                </ion-card>\n\n            </ng-container>\n\n            <ng-template #completedActivitiesListBlock>\n\n                <ion-item class="no-activity-message">\n\n                    <h2>{{\'ACTIVITYLIST_NO_COMPLETED_ACTIVITY\' | translate}}</h2>\n\n                </ion-item>\n\n            </ng-template>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\activity-list\activity-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
], ActivityListPage);

//# sourceMappingURL=activity-list.js.map

/***/ })

});
//# sourceMappingURL=11.js.map