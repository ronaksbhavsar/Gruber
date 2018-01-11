webpackJsonp([10],{

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmActivityPageModule", function() { return ConfirmActivityPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__confirm_activity__ = __webpack_require__(463);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ConfirmActivityPageModule = (function () {
    function ConfirmActivityPageModule() {
    }
    return ConfirmActivityPageModule;
}());
ConfirmActivityPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__confirm_activity__["a" /* ConfirmActivityPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__confirm_activity__["a" /* ConfirmActivityPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: []
    })
], ConfirmActivityPageModule);

//# sourceMappingURL=confirm-activity.module.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmActivityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_location_tracker_location_tracker__ = __webpack_require__(218);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ConfirmActivityPage = (function () {
    function ConfirmActivityPage(navCtrl, viewCtrl, modalCtrl, alertCtrl, navParams, translate, sync, dataService, locationTracker) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.sync = sync;
        this.dataService = dataService;
        this.locationTracker = locationTracker;
        this.eventTripTimeLineData = {};
        //tlTime: string;
        this.isDisabled = false;
        this.pageName = this.navParams.get('pageName');
        this.tripDataIsFoto(this.pageName);
    }
    ConfirmActivityPage.prototype.tripDataIsFoto = function (pageName) {
        var _this = this;
        if (pageName == 'ConfirmTimeLineActivity') {
            this.tripData = this.navParams.get('data');
            if (this.tripData.a_permitsManualDate == 0) {
                this.isDisabled = false;
                //Bug 94 : Confirm acitivy -> Date and Time
                //this.tlDateTime = new Date(this.tripData.tl_dtTimeEstimate).toISOString();
            }
            else {
                this.isDisabled = true;
                //Bug 94 : Confirm acitivy -> Date and Time
                //this.tlDateTime = new Date(this.tripData.tl_dtTimeEstimate).toISOString();
            }
            this.tlDateTime = new Date().toISOString();
        }
        else if (pageName == 'BreakEventActivity') {
            this.tripId = this.navParams.get('tripId');
            this.activityId = this.navParams.get('tl_activityId');
            if (this.tripId) {
                this.dataService.getTripTimeRecordForNewEvent(this.tripId).then(function (timelineRes) {
                    _this.eventTripTimeLineData = timelineRes;
                });
            }
            this.dataService.getMob_activityById(this.activityId)
                .then(function (activity) {
                if (activity) {
                    if (activity.hasOwnProperty('a_nextActivity')) {
                        _this.nextActivityId = activity.a_nextActivity;
                    }
                    if (activity.a_permitsManualDate == 0) {
                        _this.isDisabled = false;
                        //Bug 94 : Confirm acitivy -> Date and Time
                        //this.tlDateTime = new Date(this.eventTripTimeLineData.tl_dtTimeEstimate).toISOString();
                    }
                    else {
                        _this.isDisabled = true;
                        //Bug 94 : Confirm acitivy -> Date and Time
                        //this.tlDateTime = new Date(this.eventTripTimeLineData.tl_dtTimeEstimate).toISOString();
                    }
                    _this.tlDateTime = new Date().toISOString();
                }
            });
        }
        else {
        }
    };
    ConfirmActivityPage.prototype.confirm = function (pageName) {
        var _this = this;
        if (pageName == 'ConfirmTimeLineActivity') {
            if (this.tripData.a_isFoto == 1) {
                var confirmActivityObj = {
                    t_tripId: this.tripData.t_tripId,
                    a_documentTypeId: this.tripData.a_documentTypeId,
                    tl_timelineId: this.tripData.Id,
                    tl_dtTimeEffective: new Date(this.tlDateTime),
                    pageName: 'ConfirmTimeLineActivity'
                };
                this.modalCtrl.create('PictureUploadPage', confirmActivityObj).present();
                //this.navCtrl.push('PictureUploadPage',
                //    {
                //        't_tripId': this.tripData.t_tripId,
                //        'tl_timelineId': this.tripData.Id,
                //        'tl_dtTimeEffective': new Date(this.tlDateTime),
                //        pageName: 'confirmActivity'
                //    });
            }
            else {
                this.updateMobEventsDateTime().then(function () {
                    _this.successMessage();
                });
            }
        }
        else if (pageName == 'BreakEventActivity') {
            this.insertMobTripTimeLine().then(function () {
                _this.successMessage();
            });
        }
        else {
        }
    };
    ConfirmActivityPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    ConfirmActivityPage.prototype.insertMobTripTimeLine = function () {
        var _this = this;
        return this.locationTracker.getCurrentLocation().then(function (location) {
            var currentRecord = {
                'tl_tripId': _this.eventTripTimeLineData.tl_tripId,
                'tl_sequence': (_this.eventTripTimeLineData.tl_sequence + 1),
                'tl_dtTimeEstimate': new Date(_this.eventTripTimeLineData.tl_dtTimeEstimate),
                'tl_dtTimeEffective': new Date(_this.tlDateTime),
                'tl_activityId': _this.activityId,
                'tl_orderId': _this.eventTripTimeLineData.tl_orderId,
                'tl_orderStop': _this.eventTripTimeLineData.tl_orderStop,
                'tl_longitude': location.longitude,
                'tl_latitude': location.latitude,
                'tl_placeDescription': _this.eventTripTimeLineData.tl_placeDescription,
                'tl_placeAddress': _this.eventTripTimeLineData.tl_placeAddress,
                'tl_placeZip': _this.eventTripTimeLineData.tl_placeZip,
                'tl_placeCity': _this.eventTripTimeLineData.tl_placeCity,
                'tl_placeNation': _this.eventTripTimeLineData.tl_placeNation,
                'tl_notes': _this.eventTripTimeLineData.tl_notes,
                'tl_dtInsert': new Date(),
                'tl_externalKey': _this.eventTripTimeLineData.tl_externalKey
            };
            var nextActivityRecord = {
                'tl_tripId': _this.eventTripTimeLineData.tl_tripId,
                'tl_sequence': (_this.eventTripTimeLineData.tl_sequence + 1),
                'tl_dtTimeEstimate': new Date(_this.tlDateTime),
                //'tl_dtTimeEffective': this.eventTripTimeLineData.tl_dtTimeEffective,
                'tl_activityId': _this.nextActivityId,
                'tl_orderId': _this.eventTripTimeLineData.tl_orderId,
                'tl_orderStop': _this.eventTripTimeLineData.tl_orderStop,
                'tl_longitude': location.longitude,
                'tl_latitude': location.latitude,
                'tl_placeDescription': _this.eventTripTimeLineData.tl_placeDescription,
                'tl_placeAddress': _this.eventTripTimeLineData.tl_placeAddress,
                'tl_placeZip': _this.eventTripTimeLineData.tl_placeZip,
                'tl_placeCity': _this.eventTripTimeLineData.tl_placeCity,
                'tl_placeNation': _this.eventTripTimeLineData.tl_placeNation,
                'tl_notes': _this.eventTripTimeLineData.tl_notes,
                //'tl_dtInsert': this.eventTripTimeLineData.tl_dtInsert,
                'tl_externalKey': _this.eventTripTimeLineData.tl_externalKey
            };
            if (_this.nextActivityId) {
                return _this.sync.insertTableRow('mob_tripTimeLine', currentRecord).then(function (currentRes) {
                    return _this.sync.insertTableRow('mob_tripTimeLine', nextActivityRecord).then(function (nextRes) {
                        // alert(JSON.stringify(result));
                        return nextRes;
                    });
                    //return result;
                });
            }
            else {
                return _this.sync.insertTableRow('mob_tripTimeLine', currentRecord).then(function (nextRes) {
                    // alert(JSON.stringify(result));
                    return nextRes;
                });
            }
        });
    };
    ConfirmActivityPage.prototype.updateMobEventsDateTime = function () {
        var _this = this;
        var updateRecord = {
            "id": this.tripData.Id,
            "tl_dtTimeEffective": new Date(this.tlDateTime),
            "tl_dtInsert": new Date()
        };
        return this.sync.updateTableRow('mob_tripTimeLine', updateRecord).then(function (result) {
            return _this.insertMobEventsDateTime().then(function (inserted) {
                return inserted;
            });
        });
    };
    ConfirmActivityPage.prototype.insertMobEventsDateTime = function () {
        var _this = this;
        return this.locationTracker.getCurrentLocation().then(function (location) {
            var u_phone = '';
            _this.dataService.getUser().then(function (user) {
                if (user.id != null) {
                    u_phone = user.u_phone;
                }
            });
            var insertRecord = {
                'e_tripid': _this.tripData.t_tripId,
                'e_sequence': _this.tripData.tl_sequence,
                'e_activityId': _this.tripData.activityId,
                'e_dtFilledTime': new Date(_this.tlDateTime),
                'e_dtDeviceTime': new Date(),
                'e_dtGPSTime': location.coordinatesDatetime,
                'e_longitude': location.longitude,
                'e_latitude': location.latitude,
                'e_coordinatesOrigin': location.coordinatesOrigin,
                'e_placeAddress': _this.tripData.tl_placeAddress,
                'e_placeZip': _this.tripData.tl_placeZip,
                'e_placeCity': _this.tripData.tl_placeCity,
                'e_placeNation': _this.tripData.tl_placeNation,
                'e_phone': u_phone
            };
            return _this.sync.insertTableRow('mob_events', insertRecord).then(function (result) {
                return result;
            });
        });
    };
    ConfirmActivityPage.prototype.successMessage = function () {
        var _this = this;
        var savedLabelString = "";
        this.translate.get('DATA_SAVED_SUCCESSFULLY').subscribe(function (value) {
            savedLabelString = value;
        });
        var alert = this.alertCtrl.create({
            title: 'Success',
            message: savedLabelString,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        _this.viewCtrl.dismiss();
                    }
                }
            ]
        });
        alert.present();
    };
    return ConfirmActivityPage;
}());
ConfirmActivityPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-confirm-activity',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\confirm-activity\confirm-activity.html"*/'\n\n<ion-content class="confirm-modal">\n\n    <div text-center>\n\n        <img class="confirm-icon" item-start src="assets/img/confirm-arrival.png" />\n\n    </div>\n\n    <h3 class="confirm-title">\n\n        {{\'CONFIRM_ACTIVITY_TITLE\' | translate}}\n\n    </h3>\n\n\n\n    <div class="confirm-datetime">\n\n        <ion-row>\n\n            <ion-col col-1></ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon color="primary" name="md-calendar"></ion-icon>\n\n            </ion-col>\n\n            <ion-col col-5>\n\n                <ion-datetime item-end placeholder="MM-DD-YYYY" pickerFormat="MM-DD-YYYY" [(ngModel)]="tlDateTime" [disabled]="isDisabled"></ion-datetime>\n\n            </ion-col>\n\n            <ion-col col-4>\n\n                <ion-datetime item-start placeholder="hh:mm A" pickerFormat="hh:mm A" [(ngModel)]="tlDateTime" [disabled]="isDisabled"></ion-datetime>\n\n            </ion-col>\n\n            <ion-col col-1></ion-col>\n\n        </ion-row>\n\n\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <ion-row>\n\n        <ion-col col-6 text-center class="btn-cancel">\n\n            <button ion-button full color="light" (click)="close()">\n\n                {{\'CONFIRM_ACTIVITY_NO_CANCEL\' | translate}}\n\n            </button>\n\n        </ion-col>\n\n        <ion-col col-6 text-center class="btn-confirm">\n\n            <button ion-button full (click)="confirm(pageName)">\n\n                {{\'CONFIRM_ACTIVITY_YES_CONFIRM\' | translate}}\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\confirm-activity\confirm-activity.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_location_tracker_location_tracker__["a" /* LocationTracker */]])
], ConfirmActivityPage);

//# sourceMappingURL=confirm-activity.js.map

/***/ })

});
//# sourceMappingURL=10.js.map