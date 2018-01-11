import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
    selector: 'page-activity-list',
    templateUrl: 'activity-list.html'
})
export class ActivityListPage {

    activeActivitiesList: any = [];
    completedActivitiesList: any = [];

    tranlageMessage: any = [];

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public sync: Sync,
        public dataService: DataService,
        public translate: TranslateService
    ) {

        this.translate.get([
            "LOADING_LABEL",
            "SYNCING_LABEL",
        ]).subscribe(
            (values) => {
                this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
                this.tranlageMessage['SYNCING_LABEL'] = values.SYNCING_LABEL;
                   
            });

        
        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });

        loader.present();

        this.dataService.getActiveActivities().then((activeActivities) => {
            this.activeActivitiesList = activeActivities;
        }).then(() => {
            this.dataService.getCompletedActivities().then((completedActivities) => {
                this.completedActivitiesList = completedActivities;
            });
        }).then(() => {
            loader.dismiss();
        });

    }
    activityStatus: string = 'Active';

    goToActivityDetailsPage(trip) {
        this.navCtrl.push('ActivityDetailsPage', { 'tripId': trip.id });
    }
    syncData() {
        // Our translated text strings
       
        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['SYNCING_LABEL'],
        });
        loader.present();

        this.sync.syncAllLocalTables().then(function () {
            loader.dismiss();
        });
    }


    goToOtherPage(pageName) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(pageName);
    }

}