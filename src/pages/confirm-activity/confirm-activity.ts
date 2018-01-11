import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';

@IonicPage()
@Component({
    selector: 'page-confirm-activity',
    templateUrl: 'confirm-activity.html'
})
export class ConfirmActivityPage {
    tripData: any;
    tlDateTime: string;
    pageName: string;
    tripId: string;
    activityId: string;
    nextActivityId: string;
    eventTripTimeLineData: any = {};

    //tlTime: string;
    isDisabled: boolean = false;
    constructor(
        public navCtrl: NavController,
        private viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        private navParams: NavParams,
        public translate: TranslateService,
        public sync: Sync,
        public dataService: DataService,
        public locationTracker: LocationTracker
    ) {

        this.pageName = this.navParams.get('pageName');

        this.tripDataIsFoto(this.pageName);
    }

    tripDataIsFoto(pageName) {
        if (pageName == 'ConfirmTimeLineActivity') {

            this.tripData = this.navParams.get('data');
            if (this.tripData.a_permitsManualDate == 0) {
                this.isDisabled = false;
                //Bug 94 : Confirm acitivy -> Date and Time
                //this.tlDateTime = new Date(this.tripData.tl_dtTimeEstimate).toISOString();
            } else {
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
                this.dataService.getTripTimeRecordForNewEvent(this.tripId).then((timelineRes) => {
                    this.eventTripTimeLineData = timelineRes;
                });
            }
            this.dataService.getMob_activityById(this.activityId)
                .then((activity) => {

                    if (activity) {
                        if (activity.hasOwnProperty('a_nextActivity')) {
                            this.nextActivityId = activity.a_nextActivity;
                        }
                        if (activity.a_permitsManualDate == 0) {
                            this.isDisabled = false;
                            //Bug 94 : Confirm acitivy -> Date and Time
                            //this.tlDateTime = new Date(this.eventTripTimeLineData.tl_dtTimeEstimate).toISOString();
                        } else {
                            this.isDisabled = true;
                            //Bug 94 : Confirm acitivy -> Date and Time
                            //this.tlDateTime = new Date(this.eventTripTimeLineData.tl_dtTimeEstimate).toISOString();
                        }
                        this.tlDateTime = new Date().toISOString();
                    }
                });
        }
        else {

        }
    }

    confirm(pageName) {

        if (pageName == 'ConfirmTimeLineActivity') {

            if (this.tripData.a_isFoto == 1) {

                let confirmActivityObj = {
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
                this.updateMobEventsDateTime().then(() => {
                    this.successMessage();
                });
            }
        }
        else if (pageName == 'BreakEventActivity') {
            this.insertMobTripTimeLine().then(() => {
                this.successMessage();
            });
        }
        else {

        }

    }

    close() {
        this.viewCtrl.dismiss();
    }

    insertMobTripTimeLine() {

        return this.locationTracker.getCurrentLocation().then((location) => {

            let currentRecord = {
                'tl_tripId': this.eventTripTimeLineData.tl_tripId,
                'tl_sequence': (this.eventTripTimeLineData.tl_sequence + 1),
                'tl_dtTimeEstimate': new Date(this.eventTripTimeLineData.tl_dtTimeEstimate),
                'tl_dtTimeEffective': new Date(this.tlDateTime),
                'tl_activityId': this.activityId,
                'tl_orderId': this.eventTripTimeLineData.tl_orderId,
                'tl_orderStop': this.eventTripTimeLineData.tl_orderStop,
                'tl_longitude': location.longitude,
                'tl_latitude': location.latitude,
                'tl_placeDescription': this.eventTripTimeLineData.tl_placeDescription,
                'tl_placeAddress': this.eventTripTimeLineData.tl_placeAddress,
                'tl_placeZip': this.eventTripTimeLineData.tl_placeZip,
                'tl_placeCity': this.eventTripTimeLineData.tl_placeCity,
                'tl_placeNation': this.eventTripTimeLineData.tl_placeNation,
                'tl_notes': this.eventTripTimeLineData.tl_notes,
                'tl_dtInsert': new Date(),
                'tl_externalKey': this.eventTripTimeLineData.tl_externalKey
            };

            let nextActivityRecord = {
                'tl_tripId': this.eventTripTimeLineData.tl_tripId,
                'tl_sequence': (this.eventTripTimeLineData.tl_sequence + 1),
                'tl_dtTimeEstimate': new Date(this.tlDateTime),
                //'tl_dtTimeEffective': this.eventTripTimeLineData.tl_dtTimeEffective,
                'tl_activityId': this.nextActivityId,
                'tl_orderId': this.eventTripTimeLineData.tl_orderId,
                'tl_orderStop': this.eventTripTimeLineData.tl_orderStop,
                'tl_longitude': location.longitude,
                'tl_latitude': location.latitude,
                'tl_placeDescription': this.eventTripTimeLineData.tl_placeDescription,
                'tl_placeAddress': this.eventTripTimeLineData.tl_placeAddress,
                'tl_placeZip': this.eventTripTimeLineData.tl_placeZip,
                'tl_placeCity': this.eventTripTimeLineData.tl_placeCity,
                'tl_placeNation': this.eventTripTimeLineData.tl_placeNation,
                'tl_notes': this.eventTripTimeLineData.tl_notes,
                //'tl_dtInsert': this.eventTripTimeLineData.tl_dtInsert,
                'tl_externalKey': this.eventTripTimeLineData.tl_externalKey
            };

            if (this.nextActivityId) {

                return this.sync.insertTableRow('mob_tripTimeLine', currentRecord).then((currentRes) => {

                    return this.sync.insertTableRow('mob_tripTimeLine', nextActivityRecord).then((nextRes) => {
                        // alert(JSON.stringify(result));
                        return nextRes;
                    })
                    //return result;
                });
            }
            else {
                return this.sync.insertTableRow('mob_tripTimeLine', currentRecord).then((nextRes) => {
                    // alert(JSON.stringify(result));
                    return nextRes;
                })
            }
        });
    }

    updateMobEventsDateTime() {
        let updateRecord = {
            "id": this.tripData.Id,
            "tl_dtTimeEffective": new Date(this.tlDateTime),
            "tl_dtInsert": new Date()
        };
        return this.sync.updateTableRow('mob_tripTimeLine', updateRecord).then((result) => {
            return this.insertMobEventsDateTime().then((inserted) => {
                return inserted;
            });
        });
    }

    insertMobEventsDateTime() {
        return this.locationTracker.getCurrentLocation().then((location) => {
            let u_phone = '';

            this.dataService.getUser().then((user) => {
                if (user.id != null) {
                    u_phone = user.u_phone;
                }
            });

            let insertRecord = {
                'e_tripid': this.tripData.t_tripId,
                'e_sequence': this.tripData.tl_sequence,
                'e_activityId': this.tripData.activityId,
                'e_dtFilledTime': new Date(this.tlDateTime),
                'e_dtDeviceTime': new Date(),
                'e_dtGPSTime': location.coordinatesDatetime,
                'e_longitude': location.longitude,
                'e_latitude': location.latitude,
                'e_coordinatesOrigin': location.coordinatesOrigin,
                'e_placeAddress': this.tripData.tl_placeAddress,
                'e_placeZip': this.tripData.tl_placeZip,
                'e_placeCity': this.tripData.tl_placeCity,
                'e_placeNation': this.tripData.tl_placeNation,
                'e_phone': u_phone
            };

            return this.sync.insertTableRow('mob_events', insertRecord).then((result) => {
                return result;
            });

        });

    }

    successMessage() {

        let savedLabelString: string = "";
        this.translate.get('DATA_SAVED_SUCCESSFULLY').subscribe((value) => {
            savedLabelString = value;
        });
        let alert = this.alertCtrl.create({
            title: 'Success',
            message: savedLabelString,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.viewCtrl.dismiss();
                    }
                }]
        });
        alert.present();
    }
}
