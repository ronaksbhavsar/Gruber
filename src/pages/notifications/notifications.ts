import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Sync } from '../../providers/sync/sync';

import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsListPage {
    
    notifications: any[] = [];
    userID: string = "";    
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public sync: Sync,
        public dataService: DataService,
        public translateService: TranslateService
    ) {
    }
   
    ionViewDidLoad() {
        console.log('ionViewDidLoad TimelinePage');
        this.getNotificationData();
        
    }
    
    getNotificationData() {
        this.dataService.getUser().then((user) => {
            this.dataService.getMob_notifications(user.id).then((notifications) => {
                this.notifications = notifications;                
            });
        });
       
    }
    syncData() {
        // Our translated text strings
        let syncingLabelString: string = "";
        this.translateService.get('SYNCING_LABEL').subscribe((value) => {
            syncingLabelString = value;
        });

        let loader = this.loadingCtrl.create({
            content: syncingLabelString,
        });
        loader.present();

        this.sync.syncAllLocalTables().then(function () {
            loader.dismiss();
        });
    }
}
