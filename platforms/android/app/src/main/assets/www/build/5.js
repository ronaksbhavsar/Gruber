webpackJsonp([5],{

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PictureUploadPageModule", function() { return PictureUploadPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__picture_upload__ = __webpack_require__(468);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PictureUploadPageModule = (function () {
    function PictureUploadPageModule() {
    }
    return PictureUploadPageModule;
}());
PictureUploadPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__picture_upload__["a" /* PictureUploadPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__picture_upload__["a" /* PictureUploadPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__picture_upload__["a" /* PictureUploadPage */]
        ]
    })
], PictureUploadPageModule);

//# sourceMappingURL=picture-upload.module.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PictureUploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_util_camera_provider__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PictureUploadPage = (function () {
    function PictureUploadPage(navCtrl, actionsheetCtrl, cameraProvider, platform, loadingCtrl, viewCtrl, navParams, translate, sync, dataService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.cameraProvider = cameraProvider;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.sync = sync;
        this.dataService = dataService;
        this.tripData = {
            "t_tripId": "",
            "td_docType": "",
            "td_TripDocumentsId": "",
            "tl_timelineId": "",
            "tl_dtTimeEffective": '',
            "d_description": ""
        };
        this.deleteflag = true;
        this.remarks = "";
        this.uplodimage = "";
        this.selecteImage = true;
        this.selectedDocuments = {};
        this.placeholder = 'assets/img/upload-image.jpg';
        this.chosenPicture = "";
        this.documentImagesData = [];
        this.uplodimage = "assets/img/open-camera.png";
        //this.translate.get('DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE').subscribe((value) => {
        //    this.documentScannedMessageString = value;
        //});
        var loading = this.loadingCtrl.create();
        this.tripData.t_tripId = this.navParams.get('t_tripId');
        this.pageName = this.navParams.get('pageName');
        if (this.pageName == "PhotoUploadActivity") {
            this.tripData.td_docType = this.navParams.get('td_docType');
        }
        else if (this.pageName == "ConfirmTimeLineActivity") {
            this.tripData.td_docType = this.navParams.get('a_documentTypeId');
            this.tripData.tl_timelineId = this.navParams.get('tl_timelineId');
            this.tripData.tl_dtTimeEffective = this.navParams.get('tl_dtTimeEffective');
        }
        else {
        }
        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(this.tripData.t_tripId, this.tripData.td_docType)
            .then(function (data) {
            if (data.tripDocumentId) {
                //alert('IF :'+JSON.stringify(data));
                // Document Type alredy available..
                _this.tripData.td_TripDocumentsId = data.tripDocumentId;
                _this.tripData.d_description = data.d_description;
                loading.dismiss();
            }
            else {
                //alert('ELSE :' + JSON.stringify(data));
                // Document is not available. Need to Insert into Mob_tripDocuments table..
                var mob_tripDocument = {
                    'td_tripId': _this.tripData.t_tripId,
                    'td_docType': _this.tripData.td_docType,
                    'td_datetime': new Date(),
                    'td_required': false,
                    //'tl_orderCompany': "",
                    //'tl_orderYear': '',
                    //'tl_orderBranch': "",
                    'tl_orderNumber': 0,
                    //'tl_orderStop': this.chosenPicture,
                    //'tl_barcode': "",
                    //'td_externalKey': "",
                    //'td_nomeFile': this.createFileName(),
                    'Deleted': false
                };
                _this.sync.insertTableRow('Mob_tripDocuments', mob_tripDocument)
                    .then(function (tripDocument) {
                    //alert("Mob_tripDocuments insert result : " + JSON.stringify(tripDocument));
                    //alert('Mob_tripDocuments Insert :' + JSON.stringify(tripDocument));
                    _this.tripData.td_TripDocumentsId = tripDocument.Id;
                    loading.dismiss();
                });
            }
        });
    }
    PictureUploadPage.prototype.goToOtherPage = function (pageName) {
        this.navCtrl.push(pageName);
    };
    PictureUploadPage.prototype.savePicture = function (pageName) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        if (pageName == "ConfirmTimeLineActivity") {
            this.tripData.tl_timelineId = this.navParams.get('tl_timelineId');
            this.tripData.tl_dtTimeEffective = this.navParams.get('tl_dtTimeEffective');
            loading.present();
            if (this.tripData.tl_dtTimeEffective) {
                var updateRecord = {
                    "id": this.tripData.tl_timelineId,
                    "tl_dtTimeEffective": this.tripData.tl_dtTimeEffective,
                    "tl_dtInsert": new Date()
                };
                this.sync.updateTableRow('mob_tripTimeLine', updateRecord).then(function (result) {
                    for (var _i = 0, _a = _this.documentImagesData; _i < _a.length; _i++) {
                        var documentImage = _a[_i];
                        _this.sync.insertTableRow('mob_tripDocumentsImages', documentImage).then(function (result) {
                        });
                    }
                    loading.dismiss();
                });
            }
            this.navCtrl.push('ActivityDetailsPage', { 'tripId': this.tripData.t_tripId });
        }
        else if (pageName == "PhotoUploadActivity") {
            for (var _i = 0, _a = this.documentImagesData; _i < _a.length; _i++) {
                var documentImages = _a[_i];
                loading.present();
                this.sync.insertTableRow('mob_tripDocumentsImages', documentImages).then(function (result) {
                    loading.dismiss();
                });
            }
            this.navCtrl.push('ActivityDetailsPage', { 'tripId': this.tripData.t_tripId });
        }
        else {
        }
    };
    PictureUploadPage.prototype.selectPicture = function (pageName) {
        if (pageName == "ConfirmTimeLineActivity") {
            var confirmData = {
                'td_TripDocumentsId': this.tripData.td_TripDocumentsId,
                'td_document': this.chosenPicture,
                'td_note': this.remarks
            };
            //alert("confirmActivity " + JSON.stringify(confirmData));
            this.documentImagesData.push(confirmData);
            this.uplodimage = "assets/img/open-camera.png";
            this.selecteImage = true;
            this.remarks = "";
            this.deleteflag = true;
        }
        else if (pageName == "PhotoUploadActivity") {
            var pictureData = {
                'td_TripDocumentsId': this.tripData.td_TripDocumentsId,
                'td_document': this.chosenPicture,
                'td_note': this.remarks
            };
            //alert("photoActivity " + JSON.stringify(pictureData));
            this.documentImagesData.push(pictureData);
            this.uplodimage = "assets/img/open-camera.png";
            this.selecteImage = true;
            this.remarks = "";
            this.deleteflag = true;
        }
        else {
        }
    };
    PictureUploadPage.prototype.deleteDocument = function () {
        //alert("called delete document " + JSON.stringify(this.selectedDocuments));
        this.documentImagesData.pop(this.selectedDocuments);
        this.uplodimage = "assets/img/open-camera.png";
        this.remarks = "";
        this.deleteflag = true;
    };
    PictureUploadPage.prototype.documentPreview = function (DocumentImages) {
        //alert("called document preview");
        this.selectedDocuments = DocumentImages;
        this.uplodimage = DocumentImages.td_document;
        this.remarks = DocumentImages.remarks;
        this.deleteflag = false;
    };
    PictureUploadPage.prototype.changePicture = function () {
        var _this = this;
        var actionsheet = this.actionsheetCtrl.create({
            title: 'upload picture',
            buttons: [
                {
                    text: 'camera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
                    icon: !this.platform.is('ios') ? 'image' : null,
                    handler: function () {
                        _this.getPicture();
                    }
                },
                {
                    text: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    PictureUploadPage.prototype.takePicture = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        return this.cameraProvider.getPictureFromCamera().then(function (picture) {
            if (picture) {
                _this.chosenPicture = 'data:image/jpeg;base64,' + picture;
                _this.selecteImage = false;
                _this.uplodimage = _this.chosenPicture;
                _this.remarks = "";
                _this.deleteflag = true;
            }
            loading.dismiss();
        }, function (error) {
            alert(error);
        });
    };
    PictureUploadPage.prototype.getPicture = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(function (picture) {
            if (picture) {
                _this.chosenPicture = 'data:image/jpeg;base64,' + picture;
                _this.selecteImage = false;
                _this.uplodimage = _this.chosenPicture;
                _this.remarks = "";
                _this.deleteflag = true;
            }
            loading.dismiss();
        }, function (error) {
            alert(error);
        });
    };
    PictureUploadPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    return PictureUploadPage;
}());
PictureUploadPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-picture-upload',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\picture-upload\picture-upload.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{ tripData.d_description | translate}}\n\n        </ion-title>\n\n\n\n        <ion-buttons end>\n\n            <button ion-button (click)="cancel()">\n\n                {{\'CANCEL_BUTTON\' | translate}}\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-buttons end>\n\n            <button [disabled]="deleteflag" ion-button icon-only (click)="deleteDocument()">\n\n                <ion-icon name="ios-trash-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only>\n\n                <ion-icon name="ios-crop-outline"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-buttons end>\n\n            <button [disabled]="documentImagesData.length <= 0" ion-button (click)="savePicture(pageName)">\n\n                {{\'SAVE\' | translate}}\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-row>\n\n        <ion-col col-12 (click)="changePicture()">\n\n            <img [src]="uplodimage || placeholder" />\n\n        </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n        <ion-col col-1>\n\n        </ion-col>\n\n        <ion-col col-10>\n\n            <ion-fab right>\n\n                <button [disabled]="selecteImage" ion-fab (click)="selectPicture(pageName)"><ion-icon name="md-send"></ion-icon></button>\n\n            </ion-fab>\n\n            <ion-input [disabled]="selecteImage" placeholder="Enter Remarks here.." [(ngModel)]="remarks"></ion-input>\n\n        </ion-col>\n\n        <ion-col col-1>\n\n\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n    <div class="mb70"></div>\n\n    <ion-row class="uploaded-img">\n\n        <ng-container *ngIf="documentImagesData.length > 0">\n\n            <ion-col col-2 *ngFor="let image of this.documentImagesData; let i = index;">\n\n                <ion-avatar item-start (click)="documentPreview(image)">\n\n                    <img src="{{image.td_document}}" />\n\n                </ion-avatar>\n\n            </ion-col>\n\n        </ng-container>\n\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\picture-upload\picture-upload.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_0__providers_util_camera_provider__["a" /* CameraProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__["a" /* DataService */]])
], PictureUploadPage);

//# sourceMappingURL=picture-upload.js.map

/***/ })

});
//# sourceMappingURL=5.js.map