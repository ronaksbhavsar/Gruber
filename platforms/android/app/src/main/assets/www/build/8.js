webpackJsonp([8],{

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentScanPageModule", function() { return DocumentScanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__document_scan__ = __webpack_require__(465);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DocumentScanPageModule = (function () {
    function DocumentScanPageModule() {
    }
    return DocumentScanPageModule;
}());
DocumentScanPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__document_scan__["a" /* DocumentScanPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__document_scan__["a" /* DocumentScanPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__document_scan__["a" /* DocumentScanPage */]
        ]
    })
], DocumentScanPageModule);

//# sourceMappingURL=document-scan.module.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_photo_scan_photo_scan__ = __webpack_require__(222);
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






var DocumentScanPage = (function () {
    function DocumentScanPage(navCtrl, actionsheetCtrl, translate, viewCtrl, loadingCtrl, alertCtrl, photoScan, navParams, sync, dataService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.photoScan = photoScan;
        this.navParams = navParams;
        this.sync = sync;
        this.dataService = dataService;
        this.placeholder = 'assets/img/open-camera.png';
        this.uplodimage = "";
        this.barcodeData = {
            "text": ""
        };
        this.tripData = {
            "t_tripId": "",
            "td_docType": "",
            "td_TripDocumentsId": "",
            "d_barcodeRequired": true,
            "d_description": ""
        };
        this.tranlageMessage = [];
        this.uplodimage = "assets/img/open-camera.png";
        this.tripData.t_tripId = this.navParams.get('t_tripId');
        this.tripData.td_docType = this.navParams.get('td_docType');
        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(this.tripData.t_tripId, this.tripData.td_docType)
            .then(function (data) {
            _this.tripData.td_TripDocumentsId = data.tripDocumentId;
            _this.tripData.d_barcodeRequired = data.d_barcodeRequired;
            _this.tripData.d_description = data.d_description;
        });
        this.translate.get([
            "SAVING_LABEL",
            "DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE",
            "DOCUMENT_SCAN_BARCODE_SCANNED_TITLE",
            "DOCUMENT_SCAN_BARCODE_SCANNED_OK",
        ]).subscribe(function (values) {
            _this.tranlageMessage['SAVING_LABEL'] = values.SAVING_LABEL;
            _this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE'] = values.DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE;
            _this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_TITLE'] = values.DOCUMENT_SCAN_BARCODE_SCANNED_TITLE;
            _this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_OK'] = values.DOCUMENT_SCAN_BARCODE_SCANNED_OK;
        });
    }
    DocumentScanPage.prototype.scanBarcode = function () {
        var _this = this;
        this.photoScan.scanBarcode().then(function (barcodeDetail) {
            _this.barcodeData = barcodeDetail;
            console.log(JSON.stringify(barcodeDetail));
            if (_this.barcodeData.text != "") {
                var alertMsg = _this.alertCtrl.create({
                    title: _this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_TITLE'],
                    subTitle: _this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE'],
                    buttons: [
                        {
                            text: _this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_OK'],
                            handler: function () {
                                console.log('OK clicked');
                                _this.photoScan.takePicture().then(function (picture) {
                                    if (picture) {
                                        _this.chosenPicture = 'data:image/jpeg;base64,' + picture;
                                        _this.uplodimage = _this.chosenPicture;
                                        _this.isReadyToSave = true;
                                    }
                                });
                            }
                        }
                    ]
                });
                alertMsg.present();
            }
        });
    };
    DocumentScanPage.prototype.savePicture = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.tranlageMessage['SAVING_LABEL'],
        });
        loader.present();
        if (this.tripData.td_TripDocumentsId) {
            // Document is alredy available. Just need to update..
            var mob_tripDocumentUpdate = {
                'id': this.tripData.td_TripDocumentsId,
                'td_datetime': new Date(),
                'tl_barcode': this.barcodeData.text,
                'td_nomeFile': this.createFileName(),
                'UpdatedAt': new Date()
            };
            this.sync.updateTableRow('Mob_tripDocuments', mob_tripDocumentUpdate)
                .then(function (mob_tripDocument) {
                var mob_tripDocumentsImage = {
                    'td_TripDocumentsId': _this.tripData.td_TripDocumentsId,
                    'td_document': _this.chosenPicture,
                };
                _this.sync.insertTableRow('mob_tripDocumentsImages', mob_tripDocumentsImage)
                    .then(function (tripDocumentsImage) {
                    loader.dismiss();
                    _this.viewCtrl.dismiss();
                });
            });
        }
        else {
            // Document is not available. Need to Insert into Mob_tripDocuments table..
            var mob_tripDocument = {
                'td_tripId': this.tripData.t_tripId,
                'td_docType': this.tripData.td_docType,
                'td_datetime': new Date(),
                'td_required': false,
                'tl_orderCompany': "",
                //'tl_orderYear': this.chosenPicture,
                'tl_orderBranch': "",
                'tl_orderNumber': 0,
                //'tl_orderStop': this.chosenPicture,
                'tl_barcode': this.barcodeData.text,
                //'td_externalKey': "",
                'td_nomeFile': this.createFileName(),
                'Deleted': false
            };
            this.sync.insertTableRow('Mob_tripDocuments', mob_tripDocument)
                .then(function (tripDocument) {
                var mob_tripDocumentsImage = {
                    'td_TripDocumentsId': tripDocument.Id,
                    'td_document': _this.chosenPicture,
                };
                _this.sync.insertTableRow('mob_tripDocumentsImages', mob_tripDocumentsImage)
                    .then(function (tripDocumentsImage) {
                    loader.dismiss();
                    _this.viewCtrl.dismiss();
                });
            });
        }
    };
    DocumentScanPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    // Create a new name for the image 
    DocumentScanPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpeg";
        return newFileName;
    };
    return DocumentScanPage;
}());
DocumentScanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-document-scan',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\document-scan\document-scan.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{ tripData.d_description | translate}}\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="cancel()">\n\n                <span>\n\n                    {{\'CANCEL_BUTTON\' | translate}}\n\n                </span>\n\n            </button>\n\n            <button ion-button (click)="savePicture()" strong [disabled]="!isReadyToSave">\n\n                <span>\n\n                    {{\'SAVE\' | translate}}\n\n                </span>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-row class="transport-images">\n\n        <ion-col col-2>\n\n        </ion-col>\n\n        <ion-col col-8 (click)="scanBarcode()">\n\n            <img [src]="uplodimage || placeholder" />\n\n        </ion-col>\n\n        <ion-col col-2>\n\n        </ion-col>\n\n    </ion-row> \n\n    <ion-item item-start *ngIf="isReadyToSave">\n\n        <h2>{{\'DOCUMENTSCAN_BARCODENUMBER\' | translate}}</h2>\n\n        <p>{{barcodeData.text}}</p>\n\n    </ion-item>\n\n</ion-content>'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\document-scan\document-scan.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_photo_scan_photo_scan__["a" /* PhotoScanService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__providers_sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__["a" /* DataService */]])
], DocumentScanPage);

//# sourceMappingURL=document-scan.js.map

/***/ })

});
//# sourceMappingURL=8.js.map