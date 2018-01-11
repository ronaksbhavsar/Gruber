webpackJsonp([9],{

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentActivityPageModule", function() { return CurrentActivityPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__current_activity__ = __webpack_require__(464);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CurrentActivityPageModule = (function () {
    function CurrentActivityPageModule() {
    }
    return CurrentActivityPageModule;
}());
CurrentActivityPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__current_activity__["a" /* CurrentActivityPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__current_activity__["a" /* CurrentActivityPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__current_activity__["a" /* CurrentActivityPage */]
        ]
    })
], CurrentActivityPageModule);

//# sourceMappingURL=current-activity.module.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentActivityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__ = __webpack_require__(42);
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







var CurrentActivityPage = (function () {
    function CurrentActivityPage(navCtrl, modalCtrl, loadingCtrl, alertCtrl, viewCtrl, callNumber, translate, sync, dataService, locationTracker) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.callNumber = callNumber;
        this.translate = translate;
        this.sync = sync;
        this.dataService = dataService;
        this.locationTracker = locationTracker;
        this.user = {
            id: ""
        };
        this.currentActivity = [];
        this.tripReqDocumentData = [];
        this.tranlageMessage = [];
        this.dataService.getUser().then(function (res) {
            _this.user = res;
        });
        this.translate.get([
            "CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE",
            "CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL",
            "CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK",
            "CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE",
            "CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL",
            "CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK",
            "CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL",
            "CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK",
            "CURRENT_ACTIVITY_GRUBER_BREAK_ACTIVITY_TITLE",
            "CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE",
            "CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_BTN_CANCEL",
            "CURRENT_ACTIVITY_GRUBER_TITLE",
            "CURRENT_ACTIVITY_GRUBER_MESSAGE",
            "LOADING_LABEL",
            "CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE"
        ]).subscribe(function (values) {
            _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL'] = values.CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK'] = values.CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL'] = values.CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK'] = values.CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL'] = values.CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK'] = values.CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_BREAK_ACTIVITY_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_BREAK_ACTIVITY_TITLE,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_TITLE,
                _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_MESSAGE'] = values.CURRENT_ACTIVITY_GRUBER_MESSAGE,
                _this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
            _this.tranlageMessage['CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE'] = values.CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE;
        });
    }
    CurrentActivityPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimelinePage');
        this.getCurrentActivity();
    };
    CurrentActivityPage.prototype.getCurrentActivity = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present();
        this.dataService.getCurrentActivityDetails().then(function (activity) {
            if (activity.hasOwnProperty('t_tripId')) {
                _this.currentActivity = activity;
                _this.dataService.getTripRequestedDocumentByTripId(activity.t_tripId).then(function (response) {
                    _this.tripReqDocumentData = response;
                });
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_TITLE'],
                    message: _this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_MESSAGE'],
                    buttons: ['ok']
                });
                alert_1.present();
            }
        }).then(function () {
            loader.dismiss();
        });
    };
    CurrentActivityPage.prototype.goToActivityDetailsPage = function (trip) {
        this.navCtrl.push('ActivityDetailsPage', { 'tripId': trip.t_tripId });
    };
    CurrentActivityPage.prototype.ConfirmActivity = function (currentActivity) {
        var _this = this;
        console.log('current location');
        this.locationTracker.getCurrentLocation().then(function (location) {
            console.log('current location', location);
            if (location.latitude.length > 0) {
                console.log('current location length ', location.latitude);
                var modal = _this.modalCtrl.create('ConfirmActivityPage', { data: currentActivity, pageName: 'ConfirmTimeLineActivity' }, { cssClass: 'inset-modal' });
                modal.onDidDismiss(function () {
                    console.log('onDidDismiss ');
                    _this.ionViewDidLoad();
                });
                modal.present();
            }
            else {
                console.log("GPS is disabled");
            }
        });
        //this.modalCtrl.create('ConfirmActivityPage',
        //    { data: currentActivity, pageName: 'ConfirmTimeLineActivity' },
        //    { cssClass: 'inset-modal' })
        //    .present();
        //this.openModal('ConfirmActivityPage');
    };
    CurrentActivityPage.prototype.openModal = function (pageName) {
        this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
            .present();
    };
    CurrentActivityPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    CurrentActivityPage.prototype.confirm = function () {
        this.viewCtrl.dismiss();
    };
    CurrentActivityPage.prototype.callmanager = function (currentActivity) {
        if (currentActivity.dp_phone != "") {
            var manageNumber = currentActivity.dp_phone.replace("+", "");
            this.callNumber.callNumber(manageNumber, true)
                .then(function () { })
                .catch(function () {
                console.log('Error launching dialer');
            });
        }
    };
    CurrentActivityPage.prototype.addphoto = function (tripId) {
        var _this = this;
        var title = this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE'];
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL'],
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK'],
                    handler: function (documentTypeId) {
                        _this.documentScanAndPhotoUpload(tripId, documentTypeId);
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getDocumentTypesByGroup("PIC").then(function (documentTypes) {
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
        //this.navCtrl.push('PictureUploadPage', {});
    };
    CurrentActivityPage.prototype.documentScanAndPhotoUpload = function (tripId, documentTypeId) {
        var _this = this;
        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(tripId, documentTypeId)
            .then(function (tripDocument) {
            if (tripDocument.d_barcodeRequired == 1) {
                var tripDocumentObj = { t_tripId: tripId, td_docType: tripDocument.documentTypeId };
                _this.modalCtrl.create('DocumentScanPage', tripDocumentObj).present();
            }
            else {
                var tripDocumentObj = {
                    t_tripId: tripId,
                    td_docType: tripDocument.documentTypeId,
                    pageName: 'PhotoUploadActivity'
                };
                _this.modalCtrl.create('PictureUploadPage', tripDocumentObj).present();
            }
        });
    };
    CurrentActivityPage.prototype.scandocument = function (tripId) {
        var _this = this;
        var title = this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE'];
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL'],
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK'],
                    handler: function (documentTypeId) {
                        _this.documentScanAndPhotoUpload(tripId, documentTypeId);
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getDocumentTypesByGroup("DOC").then(function (documentTypes) {
            for (var _i = 0, documentTypes_2 = documentTypes; _i < documentTypes_2.length; _i++) {
                var documentType = documentTypes_2[_i];
                options.inputs.push({
                    type: 'radio',
                    label: documentType.d_description,
                    value: documentType.id
                });
            }
            var breakAlert = _this.alertCtrl.create(options);
            breakAlert.present();
        });
        //this.navCtrl.push('PictureUploadPage', {});
        // this.navCtrl.push('DocumentScanPage', {});
    };
    CurrentActivityPage.prototype.message = function (currentActivity) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present();
        var activityName = currentActivity.t_company.toString() + "-" + currentActivity.t_number.toString() + "/" + currentActivity.t_branch.toString() + "/" + currentActivity.t_year.toString();
        this.dataService.getMob_messagesByDp_id(this.user.id, currentActivity.t_tripId).then(function (response) {
            if (response.length == 0) {
                _this.MobMessageObj = {
                    'm_objectType': "Trip",
                    'm_objectKey': currentActivity.t_tripId,
                    'dp_id': _this.user.id,
                    'dp_group': '',
                    'm_dtcreation': new Date(),
                    'm_status': 'Open',
                    'm_source': 'Conversation has been started by Mobile',
                    'Deleted': false
                };
                _this.sync.insertTableRow('mob_messages', _this.MobMessageObj).then(function (msg) {
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
        //this.navCtrl.push('ChatsPage', {});
    };
    CurrentActivityPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    CurrentActivityPage.prototype.goToOtherPage = function (pageName) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(pageName);
    };
    CurrentActivityPage.prototype.createActivity = function (tripId, groupId, title) {
        var _this = this;
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL'],
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK'],
                    handler: function (id) {
                        _this.modalCtrl.create('ConfirmActivityPage', {
                            tripId: tripId,
                            tl_activityId: id,
                            pageName: 'BreakEventActivity'
                        }, { cssClass: 'inset-modal' })
                            .present();
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getMobActivityByActivityGroup(groupId).then(function (activities) {
            for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
                var tripActivity = activities_1[_i];
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
    CurrentActivityPage.prototype.break = function (currentActivity) {
        if (currentActivity.a_activityGroup == '10' || currentActivity.a_activityGroup == '11') {
            var alert_2 = this.alertCtrl.create({
                title: 'Gruber',
                subTitle: this.tranlageMessage['CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE'],
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            var breakGroupId = '10';
            var title = this.tranlageMessage['breakActivityTitle'];
            this.createActivity(currentActivity.t_tripId, breakGroupId, title);
        }
    };
    CurrentActivityPage.prototype.newevent = function (tripId) {
        var eventGroupId = '20';
        var title = this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE'];
        this.createActivity(tripId, eventGroupId, title);
    };
    CurrentActivityPage.prototype.createDocument = function (tripDocument) {
        this.documentScanAndPhotoUpload(tripDocument.tripId, tripDocument.td_docType);
    };
    return CurrentActivityPage;
}());
CurrentActivityPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-current-activity',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\current-activity\current-activity.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{currentActivity.t_company}}-{{currentActivity.t_number}}/{{currentActivity.t_branch}}/\n\n            {{currentActivity.t_year}}\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="goToOtherPage(\'NotificationsListPage\')">\n\n                <ion-icon name="ios-notifications-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <ng-container *ngFor="let missingDoc of tripReqDocumentData; let i = index;">\n\n        <ng-container *ngIf="missingDoc.td_datetime == null && missingDoc.td_required==1;">\n\n            <div class="warning-block">\n\n                <ion-icon class="notification-icon" name="information-circle"></ion-icon>\n\n                {{missingDoc.d_description}} {{\'DOCUMENT_IS_MISSING\' | translate}}.\n\n                <a class="scan-document" title="{{missingDoc.d_description}}" (click)="createDocument(missingDoc)">\n\n                    {{\'SCAN_DOCUMENT\' | translate}}\n\n                </a>\n\n            </div>\n\n        </ng-container>\n\n    </ng-container>\n\n\n\n    <ion-list>\n\n        <ion-item class="activity-detail">\n\n            <img item-start src="{{currentActivity.a_icon}}" />\n\n            <h2><b>{{currentActivity.a_description}}</b></h2>\n\n            <p>\n\n                {{currentActivity.tl_placeZip}}\n\n                <ion-icon name="pin"></ion-icon> {{currentActivity.tl_placeAddress}}\n\n            </p>\n\n            <p>{{currentActivity.tl_placeCity}}, {{currentActivity.tl_placeNation}}</p>\n\n            <hr />\n\n            <h2 class="notes-label">\n\n                {{\'NOTES\' | translate}}\n\n            </h2>\n\n            <p text-wrap class="notes-description">\n\n                {{currentActivity.tl_notes}}\n\n            </p>\n\n            <button ion-button small color="light" class="btn-get-directions">\n\n                <ion-icon name="pin"></ion-icon>&nbsp;\n\n                {{\'GET_DIRECTIONS\' | translate}}\n\n            </button>\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-list text-center class="activity-bg">\n\n        <button ion-button color="dark" (click)="goToActivityDetailsPage(currentActivity)" outline>\n\n            {{\'SEE_DETAILS\' | translate}}\n\n        </button>\n\n        <button ion-button color="green" (click)="ConfirmActivity(currentActivity)" *ngIf="currentActivity.tl_dtInsert == null;">\n\n            {{\'CONFIRM\' | translate}}\n\n        </button>\n\n    </ion-list>\n\n    <div class="divider"></div>\n\n    <ion-grid class="main-features">\n\n        <ion-row>\n\n            <ion-col col-4 text-center (click)="break(currentActivity)">\n\n                <img item-start src="assets/img/custom-icons/break-green.png" />\n\n                <ion-label class="action-label" text-center>\n\n                    {{\'BREAK\' | translate | uppercase}}\n\n                </ion-label>\n\n            </ion-col>\n\n            <ion-col col-4 text-center (click)="callmanager(currentActivity)">\n\n                <img item-start src="assets/img/custom-icons/call-manager-green.png" />\n\n                <ion-label class="action-label" text-center>\n\n                    {{\'CALLMANAGER\' | translate  | uppercase}}\n\n                </ion-label>\n\n            </ion-col>\n\n            <ion-col col-4 text-center (click)="addphoto(currentActivity.t_tripId)">\n\n                <img item-start src="assets/img/custom-icons/add-photo-green.png" />\n\n                <ion-label class="action-label" text-center>\n\n                    {{\'ADD_PHOTO\' | translate  | uppercase}}\n\n                </ion-label>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n            <ion-col col-4 text-center (click)="newevent(currentActivity.t_tripId)">\n\n                <img item-start src="assets/img/custom-icons/new-event-green.png" />\n\n                <ion-label class="action-label" text-center>\n\n                    {{\'NEW_EVENT\' | translate  | uppercase}}\n\n                </ion-label>\n\n            </ion-col>\n\n            <ion-col col-4 text-center (click)="scandocument(currentActivity.t_tripId)">\n\n                <img item-start src="assets/img/custom-icons/screen-document-green.png" />\n\n                <ion-label class="action-label" text-center>\n\n                    {{\'SCAN_DOCUMENT\' | translate  | uppercase}}\n\n                </ion-label>\n\n            </ion-col>\n\n            <ion-col col-4 text-center (click)="message(currentActivity)">\n\n                <img item-start src="assets/img/custom-icons/messages-green.png" />\n\n                <ion-label class="action-label" text-center>\n\n                    {{\'MESSAGE\' | translate  | uppercase}}\n\n                </ion-label>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\current-activity\current-activity.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
        __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_location_tracker_location_tracker__["a" /* LocationTracker */]])
], CurrentActivityPage);

//# sourceMappingURL=current-activity.js.map

/***/ })

});
//# sourceMappingURL=9.js.map