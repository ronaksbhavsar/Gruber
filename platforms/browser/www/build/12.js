webpackJsonp([12],{

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityDetailsPageModule", function() { return ActivityDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__activity_details__ = __webpack_require__(458);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActivityDetailsPageModule = (function () {
    function ActivityDetailsPageModule() {
    }
    return ActivityDetailsPageModule;
}());
ActivityDetailsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__activity_details__["a" /* ActivityDetailsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__activity_details__["a" /* ActivityDetailsPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__activity_details__["a" /* ActivityDetailsPage */]
        ]
    })
], ActivityDetailsPageModule);

//# sourceMappingURL=activity-details.module.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sync_sync__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { NativeGoogleMapsProvider } from '../../providers/native-google-maps/native-google-maps';
 //ViewChild, ElementRef 





//import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
var ActivityDetailsPage = (function () {
    function ActivityDetailsPage(navCtrl, modalCtrl, translate, loadingCtrl, navParams, callNumber, sync, dataService, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.sync = sync;
        this.dataService = dataService;
        this.alertCtrl = alertCtrl;
        this.user = {
            id: ""
        };
        this.tripId = "";
        this.tripActivityData = [];
        this.MobTripData = {
            mobTripDetail: {
                id: "",
                t_mapImage: "",
                t_number: "",
                t_branch: "",
                t_year: "",
                t_company: ""
            },
            tripLoadUnLoadData: [],
            tripGoodsDescData: [],
            tripReqDocumentData: [],
            tripTimeLineData: []
        };
        this.tranlageMessage = [];
        this.isgoodsDescriptionShow = true;
        this.managerNumber = "";
        this.translate.get([
            "ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE",
            "ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE",
            "ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE",
            "ACTIVITY_DETAILS_BREAK_ACTIVITY_MESSAGE",
            "ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE",
            "LOADING_LABEL",
            "ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL",
            "ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK",
            "ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL",
            "ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK",
        ]).subscribe(function (values) {
            _this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE,
                _this.tranlageMessage['ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE,
                _this.tranlageMessage['ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE,
                _this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_MESSAGE'] = values.ACTIVITY_DETAILS_BREAK_ACTIVITY_MESSAGE;
            _this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL,
                _this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL'] = values.ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL,
                _this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK'] = values.ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK,
                _this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL'] = values.ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL,
                _this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK'] = values.ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK,
                _this.tranlageMessage['ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE;
        });
        this.dataService.getUser().then(function (res) {
            _this.user = res;
        });
        this.tripId = navParams.get("tripId");
    }
    ActivityDetailsPage.prototype.ionViewDidLoad = function () {
        this.getMobTripDetails(this.tripId);
    };
    ActivityDetailsPage.prototype.getMobTripDetails = function (tripId) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present().then(function () {
            _this.dataService.getMob_tripById(tripId).then(function (response) {
                console.log('called getMob_tripById');
                _this.MobTripData.mobTripDetail = response[0];
            })
                .then(function (_) {
                _this.dataService.getTripRequestedDocumentByTripId(tripId).then(function (response) {
                    console.log('called getTripRequestedDocumentByTripId');
                    _this.MobTripData.tripReqDocumentData = response;
                });
            })
                .then(function (_) {
                _this.dataService.getTripTimeLineByTripId(tripId).then(function (response) {
                    console.log('called getTripTimeLineByTripId');
                    _this.MobTripData.tripLoadUnLoadData = response;
                });
            })
                .then(function (_) {
                _this.dataService.getTripGoodsDescriptionByTripId(tripId).then(function (response) {
                    console.log('called getTripGoodsDescriptionByTripId');
                    _this.MobTripData.tripGoodsDescData = response[0];
                });
            })
                .then(function (_) {
                _this.dataService.getTripEventTimeLineByTripIdNew(tripId).then(function (response) {
                    console.log('called getTripEventTimeLineByTripIdNew');
                    _this.MobTripData.tripTimeLineData = response;
                    loader.dismiss().catch(function (error) {
                        console.log('loader error:', error);
                    });
                    return false;
                });
            });
        });
    };
    ActivityDetailsPage.prototype.goToOtherPage = function (pageName) {
        this.navCtrl.push(pageName);
    };
    ActivityDetailsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ActivityDetailsPage.prototype.showDetails = function () {
        if (this.isgoodsDescriptionShow) {
            this.isgoodsDescriptionShow = false;
        }
        else {
            this.isgoodsDescriptionShow = true;
        }
    };
    ActivityDetailsPage.prototype.openModal = function (pageName) {
        this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
            .present();
    };
    ActivityDetailsPage.prototype.seeActivityList = function () {
        this.navCtrl.setRoot('ActivityListPage', {}, {
            animate: true,
            direction: 'forward'
        });
    };
    ActivityDetailsPage.prototype.confirmActivity = function (tripData) {
        var _this = this;
        var modal = this.modalCtrl.create('ConfirmActivityPage', { data: tripData, pageName: 'ConfirmTimeLineActivity' }, { cssClass: 'inset-modal' });
        modal.onDidDismiss(function () {
            _this.ionViewDidLoad();
        });
        modal.present();
    };
    ActivityDetailsPage.prototype.createActivity = function (tripId, groupId, title) {
        var _this = this;
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL'],
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK'],
                    handler: function (activityId) {
                        _this.modalCtrl.create('ConfirmActivityPage', {
                            tripId: tripId,
                            tl_activityId: activityId,
                            pageName: 'BreakEventActivity'
                        }, { cssClass: 'inset-modal' })
                            .present();
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getMobActivityByActivityGroup(groupId).then(function (response) {
            _this.tripActivityData = response;
            for (var _i = 0, _a = _this.tripActivityData; _i < _a.length; _i++) {
                var tripActivity = _a[_i];
                options.inputs.push({
                    type: 'radio',
                    label: tripActivity.a_description,
                    value: tripActivity.id
                });
            }
            var breakAlert = _this.alertCtrl.create(options);
            breakAlert.present();
        });
    };
    ActivityDetailsPage.prototype.breakActivity = function () {
        //if (currentActivity.a_activityGroup == '10' || currentActivity.a_activityGroup == '11') {
        //    let alert = this.alertCtrl.create({
        //        title: 'Gruber',
        //        subTitle: this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_MESSAGE'],
        //        buttons: ['OK']
        //    });
        //    alert.present();
        //} else {
        //    let breakGroupId = '10';
        //    let title = this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE'];
        //    this.createActivity(this.tripId, breakGroupId, title);
        //}
        var breakGroupId = '10';
        var title = this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE'];
        this.createActivity(this.tripId, breakGroupId, title);
    };
    ActivityDetailsPage.prototype.newEventActivity = function () {
        var eventGroupId = '20';
        var title = this.tranlageMessage['ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE'];
        this.createActivity(this.tripId, eventGroupId, title);
    };
    ActivityDetailsPage.prototype.callManagerActivity = function (dp_phone) {
        console.log('dp_phone: ', dp_phone);
        var managerNumber = '';
        if (dp_phone != "") {
            managerNumber = dp_phone.replace("+", "");
            this.callNumber.callNumber(managerNumber, true)
                .then(function () {
            })
                .catch(function () {
                console.log('Error launching dialer');
            });
        }
    };
    ActivityDetailsPage.prototype.photoActivity = function () {
        var _this = this;
        var title = this.tranlageMessage['ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE'];
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL'],
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK'],
                    handler: function (documentTypeId) {
                        _this.documentScanAndPhotoUpload(_this.tripId, documentTypeId);
                        //this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(this.tripId, documentTypeId)
                        //    .then((tripDocument) => {
                        //    if (tripDocument.d_barcodeRequired == 1) {
                        //        // Scan Document and take a picture of document
                        //        this.navCtrl.push('DocumentScanPage',
                        //            {
                        //                't_tripId': this.tripId,
                        //                'td_docType': tripDocument.td_docType
                        //            });
                        //    } else {
                        //        // Only need to take a pictures of document types..
                        //        this.navCtrl.push('PictureUploadPage',
                        //            {
                        //                tripId: this.tripId,
                        //                tripDocumentId: tripDocument.tripDocumentId,
                        //                documentTypeId: tripDocument.id,
                        //                d_barcodeRequired: tripDocument.d_barcodeRequired,
                        //                pageName: 'photoActivity'
                        //            });
                        //    }
                        //});
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getDocumentTypesByGroup("ALL").then(function (documentTypes) {
            for (var _i = 0, documentTypes_1 = documentTypes; _i < documentTypes_1.length; _i++) {
                var documentType = documentTypes_1[_i];
                options.inputs.push({
                    type: 'radio',
                    label: documentType.d_description,
                    value: documentType.id
                });
            }
            var breakAlert = _this.alertCtrl.create(options);
            breakAlert.present();
        });
    };
    ActivityDetailsPage.prototype.messageActivity = function (currentActivity) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE'],
        });
        loader.present();
        var activityName = currentActivity.t_company.toString() + "-" + currentActivity.t_number.toString()
            + "/" + currentActivity.t_branch.toString() + "/" + currentActivity.t_year.toString();
        this.dataService.getMob_messagesByDp_id(this.user.id, currentActivity.id).then(function (response) {
            if (response.length == 0) {
                var mobMessageObj = {
                    'm_objectType': "Trip",
                    'm_objectKey': currentActivity.id,
                    'dp_id': _this.user.id,
                    'dp_group': '',
                    'm_dtcreation': new Date(),
                    'm_status': 'Open',
                    'm_source': 'Conversation has been started by Mobile',
                    'Deleted': false
                };
                _this.sync.insertTableRow('mob_messages', mobMessageObj).then(function (msg) {
                    //  this.userId = result.id;
                    loader.dismiss();
                    _this.navCtrl.push('MessagesPage', { DpName: activityName, MessageId: msg.id, DpPhone: msg.m_objectKey });
                });
            }
            else {
                loader.dismiss();
                // already availbale in messages. so no need to add it again.
                _this.navCtrl.push('MessagesPage', { DpName: activityName, MessageId: response[0].id, DpPhone: response[0].m_objectKey });
            }
        });
    };
    ActivityDetailsPage.prototype.createDocument = function (tripDocument) {
        this.documentScanAndPhotoUpload(tripDocument.tripId, tripDocument.td_docType);
        //alert("Request Document " + JSON.stringify(tripDocument));
        //if (tripDocument.d_barcodeRequired == 1) {
        //    this.navCtrl.push('DocumentScanPage',
        //        {
        //            't_tripId': tripDocument.tripId,
        //            'td_docType': tripDocument.td_docType
        //        });
        //} else {
        //    this.navCtrl.push('PictureUploadPage');
        //}
        //this.navCtrl.push('PictureUploadPage', { 'tripDocumentsId': TripReqDocument.tripDocumentsId, pageName: 'TripReqDocument' });
    };
    ActivityDetailsPage.prototype.documentScanAndPhotoUpload = function (tripId, documentTypeId) {
        var _this = this;
        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(tripId, documentTypeId)
            .then(function (tripDocument) {
            if (tripDocument.d_barcodeRequired == 1) {
                // Scan Document and take a picture of document
                //this.navCtrl.push('DocumentScanPage',
                //    {
                //        't_tripId': tripId,
                //        'td_docType': tripDocument.td_docType
                //    });
                var tripDocumentObj = { t_tripId: tripId, td_docType: tripDocument.documentTypeId };
                _this.modalCtrl.create('DocumentScanPage', tripDocumentObj).present();
            }
            else {
                // Only need to take a pictures of document types..
                //let tripDocumentObj = {
                //    tripId: tripId,
                //    tripDocumentId: tripDocument.tripDocumentId,
                //    documentTypeId: tripDocument.documentTypeId,
                //    d_barcodeRequired: tripDocument.d_barcodeRequired,
                //    pageName: 'photoActivity'
                //};
                var tripDocumentObj = {
                    t_tripId: tripId,
                    td_docType: tripDocument.documentTypeId,
                    pageName: 'PhotoUploadActivity'
                };
                _this.modalCtrl.create('PictureUploadPage', tripDocumentObj).present();
            }
        });
    };
    return ActivityDetailsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Content */])
], ActivityDetailsPage.prototype, "content", void 0);
ActivityDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-activity-details',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\activity-details\activity-details.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{MobTripData.mobTripDetail.t_company}}-{{MobTripData.mobTripDetail.t_number}}/{{MobTripData.mobTripDetail.t_branch}}/{{MobTripData.mobTripDetail.t_year}}\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="goToOtherPage(\'NotificationsListPage\')">\n\n                <ion-icon name="ios-notifications-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <ng-container *ngFor="let missingDoc of MobTripData.tripReqDocumentData; let i = index;">\n\n        <!--<ion-label *ngIf="missingDoc.td_datetime==null && missingDoc.td_required==1;then dateTimeAndRequired"></ion-label>-->\n\n        <!--<ng-template #dateTimeAndRequired>-->\n\n        <ng-container *ngIf="missingDoc.td_datetime == null && missingDoc.td_required==1;">\n\n            <div class="warning-block">\n\n                <ion-icon class="notification-icon" name="information-circle"></ion-icon>\n\n                {{missingDoc.d_description}} {{\'DOCUMENT_IS_MISSING\' | translate}}\n\n                <a class="scan-document" title="{{missingDoc.d_description}}"\n\n                   (click)="createDocument(missingDoc)">{{\'SCAN_DOCUMENT\' | translate}}</a>\n\n            </div>\n\n        </ng-container>\n\n        <!--</ng-template>-->\n\n    </ng-container>\n\n\n\n    <div class="activity-map">\n\n        <span *ngIf="MobTripData.mobTripDetail.t_mapImage"> \n\n        <img src="{{MobTripData.mobTripDetail.t_mapImage}}" /> </span>\n\n        <!--<img src="assets/img/demo-map.png" />-->\n\n        <ion-fab center middle >\n\n            <button ion-fab small color="danger">\n\n            <ion-icon name="notifications"></ion-icon></button>\n\n        </ion-fab>\n\n\n\n        <!--<ion-fab center middle>\n\n            <button ion-fab ion-button small color="danger" class="open-alert">\n\n                {{\'OPEN_ALERT\' | translate}}\n\n                <ion-icon name="notifications"></ion-icon>\n\n            </button>\n\n        </ion-fab>-->\n\n    </div>\n\n    <!--<div id="map"></div>-->\n\n    <button ion-button no-margin large full color="dark">\n\n        <ion-icon name="md-return-right"></ion-icon>{{\'GET_DIRECTIONS\' | translate}}\n\n    </button>\n\n\n\n    <ion-item-divider class="header-block b-bottom">\n\n        {{\'ACTIVITYDETAILS_LOADING_OR_UNLOADING_DETAILS\' | translate}}\n\n    </ion-item-divider>\n\n\n\n    <section id="cd-timeline" class="cd-container">\n\n        <div *ngFor="let option of MobTripData.tripLoadUnLoadData; let i = index;">\n\n            <div class="cd-timeline-block">\n\n                <div [ngClass]="i%2===0 ? \'cd-timeline-icon activity-green\' : \'cd-timeline-icon activity-yellow\'">\n\n                </div>\n\n                <div class="cd-timeline-content">\n\n                    <p class="marginTop5">{{option.tl_dtTimeEstimate | date:\'dd\'}} <ion-icon name="md-calendar"></ion-icon> {{option.tl_dtTimeEstimate | date:\'MMMM\'}}, {{option.tl_dtTimeEstimate | date:\'y\'}} {{option.tl_dtTimeEstimate | date:\'HH:mm\'}} <ion-icon name="md-time"></ion-icon></p>\n\n                    <p class="timelineText">{{option.tl_placeDescription}} <ion-icon name="md-pin"></ion-icon> {{option.tl_placeAddress}},{{option.tl_placeZip}},{{option.tl_placeCity}},{{option.tl_placeNation}}</p>\n\n\n\n                    <ion-label class="notes-label">\n\n                        {{\'NOTES\' | translate}}\n\n                    </ion-label>\n\n                    <p class="notes-description">{{option.tl_notes}}</p>\n\n                    <hr />\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </section>\n\n\n\n    <ion-item-divider class="header-block b-top b-bottom" (click)="showDetails()">\n\n        {{\'ACTIVITYDETAILS_GOODSDESCRIPTION\' | translate}}\n\n        <ion-icon item-end name="ios-arrow-down" *ngIf="isgoodsDescriptionShow"></ion-icon>\n\n        <ion-icon item-end name="ios-arrow-back" *ngIf="!isgoodsDescriptionShow"></ion-icon>\n\n    </ion-item-divider>\n\n    <ion-item class="goods-desc" *ngIf="isgoodsDescriptionShow" id="goodsDescription">\n\n        <ion-row>\n\n            <ion-col col-6 class="notes-description">\n\n                {{\'ACTIVITYDETAILS_PALETESQAUNTITY\' | translate}}\n\n            </ion-col>\n\n            <ion-col col-6 class="notes-description">\n\n                {{\'ACTIVITYDETAILS_CONTAINERSIZE\' | translate}}\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-6 class="notes-label">\n\n                {{MobTripData.tripGoodsDescData.tg_quantity}}\n\n            </ion-col>\n\n            <ion-col col-6 class="notes-label">\n\n                {{MobTripData.tripGoodsDescData.tg_uom}}{{\'Meters\' | translate}}\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-6 class="notes-description">\n\n                {{\'ACTIVITYDETAILS_CONTAINERWEIGHT\' | translate}}\n\n            </ion-col>\n\n            <ion-col col-6 class="notes-description">\n\n                {{\'ACTIVITYDETAILS_CONTAINERVOLUME\' | translate}}\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-6 class="notes-label">\n\n\n\n            </ion-col>\n\n            <ion-col col-6 class="notes-label">\n\n                {{MobTripData.tripGoodsDescData.tg_width * MobTripData.tripGoodsDescData.tg_height * MobTripData.tripGoodsDescData.tg_length}} CM\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-item>\n\n\n\n    <ion-item-divider class="header-block b-top b-bottom">\n\n        {{\'ACTIVITYDETAILS_EVENTSTIMELINE\' | translate}}\n\n    </ion-item-divider>\n\n\n\n    <ion-list class="event-timeline">\n\n        <ion-item *ngFor="let trip of MobTripData.tripTimeLineData;">\n\n            <img item-start src="{{trip.a_icon}}" />\n\n            <p>\n\n                {{trip.eventDatetime | date:"dd MM yyyy" | lowercase}}\n\n                <ion-icon name="md-time"></ion-icon>\n\n                {{trip.eventDatetime | date:\'HH:mm\'| lowercase}}\n\n            </p>\n\n            <h4 class="event-desc">{{trip.a_description | translate}}</h4>\n\n            <button ion-button item-end color="green" class="btn-confirm"\n\n                    (click)="confirmActivity(trip)" *ngIf="trip.tl_dtInsert == null;">\n\n                {{\'CONFIRM\' | translate}}\n\n            </button>\n\n        </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-item-divider class="header-block b-top b-bottom">\n\n        {{\'ACTIVITYDETAILS_REQUESTEDDOCUMENTS\' | translate}}\n\n    </ion-item-divider>\n\n    <ion-list class="doc-list">\n\n        <button ion-item icon-start (click)="createDocument(tripDocument)" *ngFor="let tripDocument of MobTripData.tripReqDocumentData; let i = index;">\n\n            <ion-label>{{tripDocument.d_description}}</ion-label>\n\n            <ion-label *ngIf="tripDocument.td_datetime;then dateTimeCondition"></ion-label>\n\n            <ng-template #dateTimeCondition>\n\n                <ion-icon name="attach" item-end rota></ion-icon>\n\n                <ion-note item-end color="secondary">{{\'ACTIVITYDETAILS_OK\' | translate}}</ion-note>\n\n            </ng-template>\n\n\n\n            <ion-label *ngIf="tripDocument.td_datetime==null && tripDocument.td_required==1;then dateTimeAndRequired"></ion-label>\n\n            <ng-template #dateTimeAndRequired>\n\n                <ion-icon item-end></ion-icon>\n\n                <ion-note item-end color="danger">{{\'ACTIVITYDETAILS_REQUIRED\' | translate}}</ion-note>\n\n            </ng-template>\n\n\n\n            <ion-label *ngIf="tripDocument.td_datetime==null && tripDocument.td_required==0;then dateTimeAndRequiredNull"></ion-label>\n\n            <ng-template #dateTimeAndRequiredNull>\n\n                <ion-icon item-end></ion-icon>\n\n                <ion-note item-end color="blue">{{\'ACTIVITYDETAILS_OPTIONAL\' | translate}}</ion-note>\n\n            </ng-template>\n\n        </button>\n\n    </ion-list>\n\n</ion-content>\n\n<ion-footer> \n\n    <ion-row class="activity-actions">\n\n        <ion-col col-2 center>\n\n            <button class="action-button" (click)="breakActivity()" [disabled]="MobTripData.mobTripDetail.activityStatus == \'COMPLETED\'">\n\n                <img src="assets/img/custom-icons/break.png" />\n\n                <ion-label class="action-label" text-center>{{\'BREAK\' | translate}}</ion-label>\n\n            </button>\n\n        </ion-col>\n\n        <ion-col col-3>\n\n            <button class="action-button" (click)="callManagerActivity(MobTripData.mobTripDetail.dp_phone)">\n\n                <img src="assets/img/custom-icons/call-manager.png" />\n\n                <ion-label class="action-label" text-center>{{\'CALLMANAGER\' | translate}}</ion-label>\n\n            </button>\n\n        </ion-col>\n\n        <ion-col col-2>\n\n            <button class="action-button" (click)="photoActivity()" [disabled]="MobTripData.mobTripDetail.activityStatus == \'COMPLETED\'">\n\n                <img src="assets/img/custom-icons/photo.png" />\n\n                <!--<ion-icon name="photos"></ion-icon>-->\n\n                <ion-label class="action-label" text-center>{{\'PHOTO\' | translate}}</ion-label>\n\n            </button>\n\n        </ion-col>\n\n        <ion-col col-2>\n\n            <button class="action-button" (click)="messageActivity(MobTripData.mobTripDetail)">\n\n                <img src="assets/img/custom-icons/message.png" />\n\n                <ion-label class="action-label" text-center>{{\'MESSAGE\' | translate}}</ion-label>\n\n            </button>\n\n        </ion-col>\n\n        <ion-col col-3>\n\n            <button class="action-button" (click)="newEventActivity()" [disabled]="MobTripData.mobTripDetail.activityStatus == \'COMPLETED\'">\n\n                <img src="assets/img/custom-icons/new-event.png" />\n\n                <ion-label class="action-label" text-center>{{\'NEW_EVENT\' | translate}}</ion-label>\n\n            </button>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-footer>\n\n\n\n'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\activity-details\activity-details.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_5__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], ActivityDetailsPage);

//# sourceMappingURL=activity-details.js.map

/***/ })

});
//# sourceMappingURL=12.js.map