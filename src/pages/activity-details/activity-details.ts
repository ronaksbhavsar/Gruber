//import { NativeGoogleMapsProvider } from '../../providers/native-google-maps/native-google-maps';
import { Component, ViewChild } from '@angular/core'; //ViewChild, ElementRef 
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ModalController,
    NavParams, Content, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';
import { CallNumber } from '@ionic-native/call-number';

import { Sync } from '../../providers/sync/sync';
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';


@IonicPage()
@Component({
    selector: 'page-activity-details',
    templateUrl: 'activity-details.html'
})
export class ActivityDetailsPage {

    user = {
        id: ""
    };

    tripId: string = "";
    tripActivityData: any = [];

    MobTripData: any = {
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

    tranlageMessage: any = [];
    public isgoodsDescriptionShow: boolean = true;
    public managerNumber: string = "";

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public translate: TranslateService,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public callNumber: CallNumber,
        public sync: Sync,
        public dataService: DataService,
        public alertCtrl: AlertController

    ) {

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
        ]).subscribe(
            (values) => {
                this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE,
                    this.tranlageMessage['ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE,
                    this.tranlageMessage['ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE,
                    this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_MESSAGE'] = values.ACTIVITY_DETAILS_BREAK_ACTIVITY_MESSAGE
                this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL,
                    this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL'] = values.ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL,
                    this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK'] = values.ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK,
                    this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL'] = values.ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL,
                    this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK'] = values.ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK,
                    this.tranlageMessage['ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE'] = values.ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE

            });

        this.dataService.getUser().then((res) => {
            this.user = res;
        });
        this.tripId = navParams.get("tripId");

    }

    @ViewChild(Content) content: Content;

    ionViewDidLoad() {
        this.getMobTripDetails(this.tripId);
    }

    getMobTripDetails(tripId: string) {

        let loader = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present().then(() => {

            this.dataService.getMob_tripById(tripId).then((response) => {
                console.log('called getMob_tripById');
                this.MobTripData.mobTripDetail = response[0];

            })
                .then((_) => {
                    this.dataService.getTripRequestedDocumentByTripId(tripId).then((response) => {
                        console.log('called getTripRequestedDocumentByTripId');
                        this.MobTripData.tripReqDocumentData = response;

                    });
                })
                .then((_) => {
                    this.dataService.getTripTimeLineByTripId(tripId).then((response) => {
                        console.log('called getTripTimeLineByTripId');
                        this.MobTripData.tripLoadUnLoadData = response;
                    });
                })
                .then((_) => {
                    this.dataService.getTripGoodsDescriptionByTripId(tripId).then((response) => {
                        console.log('called getTripGoodsDescriptionByTripId');
                        this.MobTripData.tripGoodsDescData = response[0];
                    });
                })
                .then((_) => {
                    this.dataService.getTripEventTimeLineByTripIdNew(tripId).then((response) => {
                        console.log('called getTripEventTimeLineByTripIdNew');
                        this.MobTripData.tripTimeLineData = response;

                        loader.dismiss().catch((error) => {
                            console.log('loader error:', error);
                        });
                        return false;
                    });
                });
        });

    }

    goToOtherPage(pageName) {
        this.navCtrl.push(pageName);
    }

    goBack() {
        this.navCtrl.pop();
    }


    showDetails() {
        if (this.isgoodsDescriptionShow) {
            this.isgoodsDescriptionShow = false;
        }
        else {
            this.isgoodsDescriptionShow = true;
        }

    }

    openModal(pageName) {
        this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
            .present();
    }

    seeActivityList() {
        this.navCtrl.setRoot('ActivityListPage', {}, {
            animate: true,
            direction: 'forward'
        });
    }

    confirmActivity(tripData) {
        let modal = this.modalCtrl.create('ConfirmActivityPage',
            { data: tripData, pageName: 'ConfirmTimeLineActivity' },
            { cssClass: 'inset-modal' });

        modal.onDidDismiss(() => {
            this.ionViewDidLoad();
        });
        modal.present();        
    }

    createActivity(tripId, groupId, title) {
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_CANCEL'],
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS_CREATE_ACTIVITY_BTN_OK'],
                    handler: activityId => {
                        this.modalCtrl.create('ConfirmActivityPage', {
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

        this.dataService.getMobActivityByActivityGroup(groupId).then((response) => {
            this.tripActivityData = response;
            for (let tripActivity of this.tripActivityData) {
                options.inputs.push(
                    {
                        type: 'radio',
                        label: tripActivity.a_description,
                        value: tripActivity.id
                    }
                );
            }
            let breakAlert = this.alertCtrl.create(options);
            breakAlert.present();
        });
    }

    breakActivity() {

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

        let breakGroupId = '10';
        let title = this.tranlageMessage['ACTIVITY_DETAILS_BREAK_ACTIVITY_TITLE'];
        this.createActivity(this.tripId, breakGroupId, title);
    }

    newEventActivity() {
        let eventGroupId = '20';
        let title = this.tranlageMessage['ACTIVITY_DETAILS_EVENT_ACTIVITY_TITLE'];
        this.createActivity(this.tripId, eventGroupId, title);
    }

    callManagerActivity(dp_phone: string) {    
        console.log('dp_phone: ', dp_phone);
        let managerNumber = '';
        if (dp_phone != "") {
            managerNumber = dp_phone.replace("+", "");
            this.callNumber.callNumber(managerNumber, true)
                .then(() => {
                })
                .catch(() => {
                    console.log('Error launching dialer');
                });
        }
    }

    photoActivity() {
        let title = this.tranlageMessage['ACTIVITY_DETAILS_PHOTO_ACTIVITY_TITLE'];
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_CANCEL'],
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: this.tranlageMessage['ACTIVITY_DETAILS__PHOTO_ACTIVITY_BTN_OK'],
                    handler: documentTypeId => {

                        this.documentScanAndPhotoUpload(this.tripId, documentTypeId);

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

        this.dataService.getDocumentTypesByGroup("ALL").then((documentTypes) => {
            for (let documentType of documentTypes) {
                options.inputs.push(
                    {
                        type: 'radio',
                        label: documentType.d_description,
                        value: documentType.id
                    }
                );
            }
            let breakAlert = this.alertCtrl.create(options);
            breakAlert.present();
        });

    }

    messageActivity(currentActivity) {
        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['ACTIVITY_DETAILS_MESSAGE_ACTIVITY_TITLE'],
        });
        loader.present();

        let activityName = currentActivity.t_company.toString() + "-" + currentActivity.t_number.toString()
            + "/" + currentActivity.t_branch.toString() + "/" + currentActivity.t_year.toString();

        this.dataService.getMob_messagesByDp_id(this.user.id, currentActivity.id).then((response) => {
            if (response.length == 0) {
                let mobMessageObj = {
                    'm_objectType': "Trip",
                    'm_objectKey': currentActivity.id,
                    'dp_id': this.user.id,
                    'dp_group': '',
                    'm_dtcreation': new Date(),
                    'm_status': 'Open',
                    'm_source': 'Conversation has been started by Mobile',
                    'Deleted': false
                };

                this.sync.insertTableRow('mob_messages', mobMessageObj).then((msg) => {
                    //  this.userId = result.id;
                    loader.dismiss();
                    this.navCtrl.push('MessagesPage',
                        { DpName: activityName, MessageId: msg.id, DpPhone: msg.m_objectKey });
                });
            }
            else {
                loader.dismiss();
                // already availbale in messages. so no need to add it again.
                this.navCtrl.push('MessagesPage',
                    { DpName: activityName, MessageId: response[0].id, DpPhone: response[0].m_objectKey });
            }
        });

    }

    createDocument(tripDocument) {

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
    }

    documentScanAndPhotoUpload(tripId, documentTypeId) {

        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(tripId, documentTypeId)
            .then((tripDocument) => {
                if (tripDocument.d_barcodeRequired == 1) {
                    // Scan Document and take a picture of document
                    //this.navCtrl.push('DocumentScanPage',
                    //    {
                    //        't_tripId': tripId,
                    //        'td_docType': tripDocument.td_docType
                    //    });
                    let tripDocumentObj = { t_tripId: tripId, td_docType: tripDocument.documentTypeId };
                    this.modalCtrl.create('DocumentScanPage', tripDocumentObj).present();
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
                    let tripDocumentObj = {
                        t_tripId: tripId,
                        td_docType: tripDocument.documentTypeId,
                        pageName: 'PhotoUploadActivity'
                    };
                    this.modalCtrl.create('PictureUploadPage', tripDocumentObj).present();

                }
            });
    }

}
