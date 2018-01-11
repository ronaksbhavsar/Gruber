import { Component } from '@angular/core';
import {
    IonicPage, NavController, ActionSheetController,
    LoadingController, AlertController, NavParams, ViewController
}
    from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PhotoScanService } from '../../providers/photo-scan/photo-scan';
import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';
import { Utilities } from '../../app/Utilities';

@IonicPage()
@Component({
    selector: 'page-document-scan',
    templateUrl: 'document-scan.html'
})
export class DocumentScanPage {
    isReadyToSave: boolean;
    placeholder = 'assets/img/open-camera.png';
    chosenPicture: any;
    uplodimage: string = "";
    barcodeData = {
        "text": ""
    };

    tripData = {
        "t_tripId": "",
        "td_docType": "",
        "td_TripDocumentsId": "",
        "d_barcodeRequired": true,
        "d_description": ""
    }

    tranlageMessage: any = [];

    constructor(
        public navCtrl: NavController,
        public actionsheetCtrl: ActionSheetController,
        public translate: TranslateService,
        public viewCtrl: ViewController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public photoScan: PhotoScanService,
        public navParams: NavParams,
        public sync: Sync,
        public dataService: DataService
    ) {
        this.uplodimage = "assets/img/open-camera.png";

        this.tripData.t_tripId = this.navParams.get('t_tripId');
        this.tripData.td_docType = this.navParams.get('td_docType');

        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(this.tripData.t_tripId, this.tripData.td_docType)
            .then((data) => {

                this.tripData.td_TripDocumentsId = data.tripDocumentId;
                this.tripData.d_barcodeRequired = data.d_barcodeRequired;
                this.tripData.d_description = data.d_description;
            });

        this.translate.get([
            "SAVING_LABEL",
            "DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE",
            "DOCUMENT_SCAN_BARCODE_SCANNED_TITLE",
            "DOCUMENT_SCAN_BARCODE_SCANNED_OK",
        ]).subscribe(
            (values) => {
                this.tranlageMessage['SAVING_LABEL'] = values.SAVING_LABEL;
                this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE'] = values.DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE;
                this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_TITLE'] = values.DOCUMENT_SCAN_BARCODE_SCANNED_TITLE;
                this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_OK'] = values.DOCUMENT_SCAN_BARCODE_SCANNED_OK;
            });
    }

    scanBarcode() {

        this.photoScan.scanBarcode().then((barcodeDetail) => {
            this.barcodeData = barcodeDetail;
            console.log(JSON.stringify(barcodeDetail));

            if (this.barcodeData.text != "") {
                const alertMsg = this.alertCtrl.create({
                    title: this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_TITLE'],
                    subTitle: this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE'],
                    buttons: [
                        {
                            text: this.tranlageMessage['DOCUMENT_SCAN_BARCODE_SCANNED_OK'],
                            handler: () => {
                                console.log('OK clicked');

                                this.photoScan.takePicture().then((picture) => {

                                    if (picture) {
                                        this.chosenPicture = 'data:image/jpeg;base64,' + picture;
                                        this.uplodimage = this.chosenPicture;
                                        this.isReadyToSave = true;
                                    }
                                });
                            }
                        }
                    ]

                });
                alertMsg.present();
            }
        });

    }

    savePicture() {

        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['SAVING_LABEL'],
        });
        loader.present();

        if (this.tripData.td_TripDocumentsId) {
            // Document is alredy available. Just need to update..
            let mob_tripDocumentUpdate = {
                'id': this.tripData.td_TripDocumentsId,
                'td_datetime': Utilities.ConvertToUTCDate(new Date()),
                'tl_barcode': this.barcodeData.text,
                'td_nomeFile': this.createFileName(),
                'UpdatedAt': new Date()
            };
            debugger;
            this.sync.updateTableRow('Mob_tripDocuments', mob_tripDocumentUpdate)
                .then((mob_tripDocument) => {

                    let mob_tripDocumentsImage = {
                        'td_TripDocumentsId': this.tripData.td_TripDocumentsId,
                        'td_document': this.chosenPicture,
                    };
                    this.sync.insertTableRow('mob_tripDocumentsImages', mob_tripDocumentsImage)
                        .then((tripDocumentsImage) => {
                            loader.dismiss();
                            this.viewCtrl.dismiss();
                        });
                });

        }
        else {
            // Document is not available. Need to Insert into Mob_tripDocuments table..
            let mob_tripDocument = {
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
                .then((tripDocument) => {

                    let mob_tripDocumentsImage = {
                        'td_TripDocumentsId': tripDocument.Id,
                        'td_document': this.chosenPicture,
                    };
                    this.sync.insertTableRow('mob_tripDocumentsImages', mob_tripDocumentsImage)
                        .then((tripDocumentsImage) => {
                            loader.dismiss();
                            this.viewCtrl.dismiss();
                        });
                });
        }
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
    // Create a new name for the image 
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpeg";
        return newFileName;
    }
}
