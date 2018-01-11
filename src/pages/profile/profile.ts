import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { DataService } from '../../providers/data-service/data-service';
import { Sync } from '../../providers/sync/sync';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    logoImage: string = 'assets/img/logo.png';
    profilePic: string = 'assets/img/avatar/profile-pic.png';

    user = {
        u_name: '',
        u_photo: 'assets/img/avatar/profile-pic.png'
    };

    tranlageMessage: any = [];
    subSettings: any = ProfilePage;

    constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        //public settings: Settings,
        public navParams: NavParams,
        public translate: TranslateService,
        public alertCtrl: AlertController,
        public locationTracker: LocationTracker,
        public sync: Sync,
        public dataService: DataService,
        private push: Push
    ) { 

        this.translate.get([
            "SYNCING_LABEL",
            "PROFILE_SHOW_ALERT_TITLE",
            "PROFILE_SHOW_ALERT_SUBTITLE",
            "LOADING_LABEL",
        ]).subscribe(
            (values) => {
                this.tranlageMessage['SYNCING_LABEL'] = values.SYNCING_LABEL;
                this.tranlageMessage['PROFILE_SHOW_ALERT_TITLE'] = values.PROFILE_SHOW_ALERT_TITLE;
                this.tranlageMessage['PROFILE_SHOW_ALERT_SUBTITLE'] = values.PROFILE_SHOW_ALERT_SUBTITLE;
                this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
            });

        let isFirstTimeLogin = this.navParams.get('isFirstTimeLogin');
        if (isFirstTimeLogin) {

            let loader = this.loadingCtrl.create({
                content: this.tranlageMessage['SYNCING_LABEL'],
            });
            loader.present();
            this.sync.syncAllLocalTables().then(() => {
                this.getUserDetail();

                this.initPushNotification();

                loader.dismiss();
                this.locationTracker.startTracking();
            });
        }
        else {
            this.sync.syncAllLocalTables().then(() => {
                this.locationTracker.startTracking();
            });
            this.getUserDetail();            
        }
    }

    ionViewDidLoad() {
        console.log('Hello Profile Page');
    }
    getUserDetail() {
        this.dataService.getUser().then((response) => {
            this.user = response;
        });
    }
    goToOtherPage(pageName) {
        this.navCtrl.push(pageName);
    }

    syncData() {
        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['SYNCING_LABEL'],
        });
        loader.present();

        return this.sync.syncAllLocalTables().then(function () {
            loader.dismiss();
            return true;
        });
    }

    checkPageHasCurrentActivity() {
         
        this.dataService.getCurrentActivityDetails().then((currentActivity) => {
            if (currentActivity) {
                this.goToOtherPage('CurrentActivityPage');
            } else {
                let alertMsg = this.alertCtrl.create({                    
                    title: this.tranlageMessage['PROFILE_SHOW_ALERT_TITLE'],
                    subTitle: this.tranlageMessage['PROFILE_SHOW_ALERT_SUBTITLE'],
                    buttons: [{
                        text: 'OK',
                        role: 'cancel'
                    }]
                });
                alertMsg.present();

            }
        });
    }

    saveDeviceToken(t) {
        // Need to Save Registration Token in database..

        //const messageData =
        //    {
        //        'ms_messageId': "ae4a40c4-5482-4554-b10a-c18c946c7cd0",
        //        'ms_dtcreation': new Date(),
        //        'ms_sender': "a8b2040a-156f-40c3-9a1e-42cfc95681c5",
        //        'ms_message': t
        //    };

        ////alert(JSON.stringify(messageData));

        //this.sync.insertTableRow('Mob_messagesTexts', messageData)
        //    .then((result) => {
        //    });
    }

    initPushNotification() {
        // to check if we have permission
        this.push.hasPermission()
            .then((res: any) => {

                if (res.isEnabled) {
                    console.log('We have permission to send push notifications');
                } else {
                    console.log('We don\'t have permission to send push notifications');
                }

            });

        // to initialize push notifications

        const options: PushOptions = {
            android: {
                senderID: '1092171990852'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
            console.log('Received a notification', notification);

            //Notification Display Section
            let confirmAlert = this.alertCtrl.create({
                title: 'New Notification',
                message: JSON.stringify(notification),
                buttons: [{
                    text: 'Ignore',
                    role: 'cancel'
                }, {
                        text: 'View',
                        handler: () => {
                            //TODO: Your logic here
                            //self.nav.push(DetailsPage, {message: data.message});
                        }
                    }]
            });
            confirmAlert.present();
            //
        });

        pushObject.on('registration').subscribe((registration: any) => {
            console.log('Device registered', registration);
            this.saveDeviceToken(registration.registrationId);
        });

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }

}
