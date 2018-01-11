import { CameraProvider } from '../../providers/util/camera.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, Platform, LoadingController, ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
    selector: 'page-picture-upload',
    templateUrl: 'picture-upload.html'
})
export class PictureUploadPage {

    tripData = {
        "t_tripId": "",
        "td_docType": "",
        "td_TripDocumentsId": "",
        "tl_timelineId": "",
        "tl_dtTimeEffective": '',
        "d_description": ""
    }

    deleteflag: boolean = true;
    remarks: string = "";
    uplodimage: string = "";
    selecteImage: boolean = true;
    selectedDocuments: any = {};
    pageName: string;
    placeholder = 'assets/img/upload-image.jpg';
    chosenPicture: any = "";
    documentImagesData: any = [];


    constructor(
        public navCtrl: NavController,
        public actionsheetCtrl: ActionSheetController,
        public cameraProvider: CameraProvider,
        public platform: Platform,     
        public loadingCtrl: LoadingController,
        public viewCtrl: ViewController,
        private navParams: NavParams,
        public translate: TranslateService,
        public sync: Sync,
        public dataService: DataService
    ) {
        this.uplodimage = "assets/img/open-camera.png";
        //this.translate.get('DOCUMENT_SCAN_BARCODE_SCANNED_MESSAGE').subscribe((value) => {
        //    this.documentScannedMessageString = value;
        //});

        const loading = this.loadingCtrl.create();

        this.tripData.t_tripId = this.navParams.get('t_tripId');
        this.pageName = this.navParams.get('pageName');

        if (this.pageName == "PhotoUploadActivity") {

            this.tripData.td_docType = this.navParams.get('td_docType');

        }
        else if (this.pageName == "ConfirmTimeLineActivity") {

            this.tripData.td_docType = this.navParams.get('a_documentTypeId');
            this.tripData.tl_timelineId = this.navParams.get('tl_timelineId');
            this.tripData.tl_dtTimeEffective = this.navParams.get('tl_dtTimeEffective');

        } else {

        }

        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(this.tripData.t_tripId, this.tripData.td_docType)
            .then((data) => {

                if (data.tripDocumentId) {
                    //alert('IF :'+JSON.stringify(data));
                    // Document Type alredy available..
                    this.tripData.td_TripDocumentsId = data.tripDocumentId;
                    this.tripData.d_description = data.d_description;

                    loading.dismiss();
                } else {

                    //alert('ELSE :' + JSON.stringify(data));
                    // Document is not available. Need to Insert into Mob_tripDocuments table..
                    let mob_tripDocument = {
                        'td_tripId': this.tripData.t_tripId,
                        'td_docType': this.tripData.td_docType,
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

                    this.sync.insertTableRow('Mob_tripDocuments', mob_tripDocument)
                        .then((tripDocument) => {
                            //alert("Mob_tripDocuments insert result : " + JSON.stringify(tripDocument));
                            //alert('Mob_tripDocuments Insert :' + JSON.stringify(tripDocument));

                            this.tripData.td_TripDocumentsId = tripDocument.Id;
                            loading.dismiss();
                        });
                }
            });
    }

    goToOtherPage(pageName) {
        this.navCtrl.push(pageName);
    }

    savePicture(pageName) {

        const loading = this.loadingCtrl.create();


        if (pageName == "ConfirmTimeLineActivity") {

            this.tripData.tl_timelineId = this.navParams.get('tl_timelineId');
            this.tripData.tl_dtTimeEffective = this.navParams.get('tl_dtTimeEffective');


            loading.present();
            if (this.tripData.tl_dtTimeEffective) {
                let updateRecord = {
                    "id": this.tripData.tl_timelineId,
                    "tl_dtTimeEffective": this.tripData.tl_dtTimeEffective,
                    "tl_dtInsert": new Date()
                };
                this.sync.updateTableRow('mob_tripTimeLine', updateRecord).then((result) => {
                    for (let documentImage of this.documentImagesData) {
                        this.sync.insertTableRow('mob_tripDocumentsImages', documentImage).then((result) => {

                        });
                    }
                    loading.dismiss();
                });
            }


            this.navCtrl.push('ActivityDetailsPage', { 'tripId': this.tripData.t_tripId });

        }
        else if (pageName == "PhotoUploadActivity") {

            for (let documentImages of this.documentImagesData) {
                loading.present();
                this.sync.insertTableRow('mob_tripDocumentsImages', documentImages).then((result) => {
                    loading.dismiss();
                });
            }
            this.navCtrl.push('ActivityDetailsPage', { 'tripId': this.tripData.t_tripId });
        }
        else {

        }
    }

    selectPicture(pageName) {

        if (pageName == "ConfirmTimeLineActivity") {
            let confirmData = {
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

            let pictureData = {
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

    }

    deleteDocument() {
        //alert("called delete document " + JSON.stringify(this.selectedDocuments));
        this.documentImagesData.pop(this.selectedDocuments);
        this.uplodimage = "assets/img/open-camera.png";
        this.remarks = "";
        this.deleteflag = true;
    }

    documentPreview(DocumentImages) {
        //alert("called document preview");
        this.selectedDocuments = DocumentImages;
        this.uplodimage = DocumentImages.td_document;
        this.remarks = DocumentImages.remarks;
        this.deleteflag = false;
    }

    changePicture() {

        const actionsheet = this.actionsheetCtrl.create({
            title: 'upload picture',
            buttons: [
                {
                    text: 'camera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: () => {
                        this.takePicture();
                    }
                },
                {
                    text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
                    icon: !this.platform.is('ios') ? 'image' : null,
                    handler: () => {
                        this.getPicture();
                    }
                },
                {
                    text: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    role: 'destructive',
                    handler: () => {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    }

    takePicture() {
        const loading = this.loadingCtrl.create();

        loading.present();
        return this.cameraProvider.getPictureFromCamera().then(picture => {
            
            if (picture) {

                this.chosenPicture = 'data:image/jpeg;base64,' + picture;
                this.selecteImage = false;
                this.uplodimage = this.chosenPicture;
                this.remarks = "";
                this.deleteflag = true;
            }
            loading.dismiss();
        }, error => {
            alert(error);
        });
    }

    getPicture() {
        const loading = this.loadingCtrl.create();

        loading.present();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
          

            if (picture) {
                this.chosenPicture = 'data:image/jpeg;base64,' + picture;
                this.selecteImage = false;
                this.uplodimage = this.chosenPicture;
                this.remarks = "";
                this.deleteflag = true;
            }
            loading.dismiss();
        }, error => {
            alert(error);
        });
    }

    cancel() {
        this.viewCtrl.dismiss();
    }
}
