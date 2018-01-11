import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, LoadingController, AlertController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number';
import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
@IonicPage()
@Component({
    selector: 'page-current-activity',
    templateUrl: 'current-activity.html'
})
export class CurrentActivityPage {
    user = {
        id: ""
    };

    currentActivity: any = [];
    tripReqDocumentData: any = [];
    MobMessageObj: any;
    tranlageMessage: any = [];

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private viewCtrl: ViewController,
        public callNumber: CallNumber,
        public translate: TranslateService,
        public sync: Sync,
        public dataService: DataService,
        public locationTracker: LocationTracker
    ) {
        this.dataService.getUser().then((res) => {
            this.user = res;
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
        ]).subscribe(
            (values) => {
                this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL'] = values.CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK'] = values.CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL'] = values.CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK'] = values.CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL'] = values.CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK'] = values.CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_BREAK_ACTIVITY_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_BREAK_ACTIVITY_TITLE,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_TITLE'] = values.CURRENT_ACTIVITY_GRUBER_TITLE,
                    this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_MESSAGE'] = values.CURRENT_ACTIVITY_GRUBER_MESSAGE,
                    this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
                this.tranlageMessage['CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE'] = values.CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE;

            });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TimelinePage');
        this.getCurrentActivity();
    }

    getCurrentActivity() {

        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present();

        this.dataService.getCurrentActivityDetails().then((activity) => {
            if (activity.hasOwnProperty('t_tripId')) {
                this.currentActivity = activity;

                this.dataService.getTripRequestedDocumentByTripId(activity.t_tripId).then((response) => {
                    this.tripReqDocumentData = response;
                });

            } else {

                let alert = this.alertCtrl.create({
                    title: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_TITLE'],
                    message: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_MESSAGE'],
                    buttons: ['ok']
                });
                alert.present();
            }
        }).then(() => {
            loader.dismiss();
        });
    }

    goToActivityDetailsPage(trip) {
        this.navCtrl.push('ActivityDetailsPage', { 'tripId': trip.t_tripId });
    }

    ConfirmActivity(currentActivity) {
        console.log('current location');
        this.locationTracker.getCurrentLocation().then((location) => {
            console.log('current location', location);
            if (location.latitude.length > 0) {
                console.log('current location length ', location.latitude);
                let modal = this.modalCtrl.create('ConfirmActivityPage',
                    { data: currentActivity, pageName: 'ConfirmTimeLineActivity' },
                    { cssClass: 'inset-modal' });

                modal.onDidDismiss(() => {
                    console.log('onDidDismiss ');
                    this.ionViewDidLoad();
                });
                modal.present();

            } else {
                console.log("GPS is disabled");
            }
        });


        //this.modalCtrl.create('ConfirmActivityPage',
        //    { data: currentActivity, pageName: 'ConfirmTimeLineActivity' },
        //    { cssClass: 'inset-modal' })
        //    .present();
        //this.openModal('ConfirmActivityPage');
    }

    openModal(pageName) {
        this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
            .present();
    }

    close() {
        this.viewCtrl.dismiss();
    }

    confirm() {
        this.viewCtrl.dismiss();
    }

    callmanager(currentActivity) {
        if (currentActivity.dp_phone != "") {
            let manageNumber = currentActivity.dp_phone.replace("+", "");

            this.callNumber.callNumber(manageNumber, true)
                .then(() => { })
                .catch(() => {
                    console.log('Error launching dialer');
                });
        }
    }

    addphoto(tripId) {

        let title = this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_TITLE'];
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_CANCEL'],
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_ADD_PHOTO_BTN_OK'],
                    handler: documentTypeId => {
                        this.documentScanAndPhotoUpload(tripId, documentTypeId);
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getDocumentTypesByGroup("PIC").then((documentTypes) => {
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

        //this.navCtrl.push('PictureUploadPage', {});
    }

    documentScanAndPhotoUpload(tripId, documentTypeId) {
        this.dataService.getDocumentTypesByTripIdAndDocumentTypeId(tripId, documentTypeId)
            .then((tripDocument) => {
                if (tripDocument.d_barcodeRequired == 1) {
                    let tripDocumentObj = { t_tripId: tripId, td_docType: tripDocument.documentTypeId };
                    this.modalCtrl.create('DocumentScanPage', tripDocumentObj).present();
                }
                else {
                    let tripDocumentObj = {
                        t_tripId: tripId,
                        td_docType: tripDocument.documentTypeId,
                        pageName: 'PhotoUploadActivity'
                    };
                    this.modalCtrl.create('PictureUploadPage', tripDocumentObj).present();

                }
            });
    }

    scandocument(tripId) {
        let title = this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_TITLE'];
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_CANCEL'],
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_SCAN_DOC_BTN_OK'],
                    handler: documentTypeId => {
                        this.documentScanAndPhotoUpload(tripId, documentTypeId);
                    }
                }
            ],
            inputs: []
        };
        this.dataService.getDocumentTypesByGroup("DOC").then((documentTypes) => {
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

        //this.navCtrl.push('PictureUploadPage', {});
        // this.navCtrl.push('DocumentScanPage', {});
    }

    message(currentActivity) {

        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present();

        let activityName = currentActivity.t_company.toString() + "-" + currentActivity.t_number.toString() + "/" + currentActivity.t_branch.toString() + "/" + currentActivity.t_year.toString();

        this.dataService.getMob_messagesByDp_id(this.user.id, currentActivity.t_tripId).then((response) => {
            if (response.length == 0) {
                this.MobMessageObj = {
                    'm_objectType': "Trip",
                    'm_objectKey': currentActivity.t_tripId,
                    'dp_id': this.user.id,
                    'dp_group': '',
                    'm_dtcreation': new Date(),
                    'm_status': 'Open',
                    'm_source': 'Conversation has been started by Mobile',
                    'Deleted': false
                };
                this.sync.insertTableRow('mob_messages', this.MobMessageObj).then((msg) => {
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

        //this.navCtrl.push('ChatsPage', {});

    }

    goBack() {
        this.navCtrl.pop();
    }

    goToOtherPage(pageName) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(pageName);
    }



    createActivity(tripId, groupId, title) {
        var options = {
            title: title,
            buttons: [
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_CANCEL'],
                    role: 'cancel',
                    handler: () => { }
                },
                {
                    text: this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_CREATE_ACTIVITY_BTN_OK'],
                    handler: id => {
                        this.modalCtrl.create('ConfirmActivityPage', {
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

        this.dataService.getMobActivityByActivityGroup(groupId).then((activities) => {
            for (let tripActivity of activities) {
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

    break(currentActivity) {

        if (currentActivity.a_activityGroup == '10' || currentActivity.a_activityGroup == '11') {
            let alert = this.alertCtrl.create({
                title: 'Gruber',
                subTitle: this.tranlageMessage['CURRENT_ACTIVITY_BREAK_ACTIVITY_MESSAGE'],
                buttons: ['OK']
            });
            alert.present();
        } else {
            let breakGroupId = '10';
            let title = this.tranlageMessage['breakActivityTitle'];
            this.createActivity(currentActivity.t_tripId, breakGroupId, title);
        }
    }

    newevent(tripId) {
        let eventGroupId = '20';
        let title = this.tranlageMessage['CURRENT_ACTIVITY_GRUBER_EVENT_ACTIVITY_TITLE'];
        this.createActivity(tripId, eventGroupId, title);
    }

    createDocument(tripDocument) {
        this.documentScanAndPhotoUpload(tripDocument.tripId, tripDocument.td_docType);
    }
}
