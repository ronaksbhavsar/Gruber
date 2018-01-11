import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';
import { Sync } from '../../providers/sync/sync';

import { Events } from 'ionic-angular';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    // Our local settings object
    pageTitle: string = "";
    profilePicture: string;
    chosenPicture: any;
    public userSettings: any = [];
    user: any = {
        id: "",
        u_name: "",
        selectedLanguage: "",
        imageUrl: ""
    }

    Languages: any[] = [
        {
            'name': 'English',
            'id': 'en'
        },
        {
            'name': 'Italian',
            'id': 'it'
        }
    ];

    constructor(public navCtrl: NavController,

        public navParams: NavParams,
        public dataService: DataService,
        public sync: Sync,
        public platform: Platform,
        public actionsheetCtrl: ActionSheetController,
        public translate: TranslateService,
        public loadingCtrl: LoadingController,
        public events: Events
    ) {
        this.getUserDetail();
        this.getUserSettings();
    }


    getUserDetail() {
        this.dataService.getUser().then((response) => {
            this.user.id = response.id;
            this.user.u_name = response.u_name;

            if (response.u_language == "" || response.u_language == null) {
                this.user.selectedLanguage = this.Languages[0];
            } else {
                this.user.selectedLanguage = this.Languages.filter(q => q.id == response.u_language);
            }
        });
    }

    getUserSettings() {
        this.dataService.getMob_UserSettings().then((response) => {
            this.userSettings = response;
        });
    }

    updateSettingItem(option) {

        this.sync.updateTableRow('Mob_userSettings', {
            "id": option.id,
            "set_value": option.set_value
        }).then((result) => {

        });
    }

    updateUserName(value) {
        this.user.u_name = value;

        this.sync.updateTableRow('Mob_user', {
            "id": this.user.id,
            "u_name": this.user.u_name
        }).then((result) => {

        });
    }

    updateUserLanguages(option) {

        this.events.publish('changeUserLanguage', option.id);

        this.sync.updateTableRow('Mob_user', {
            "id": this.user.id,
            "u_language": option.id
        }).then((result) => {
        });
    }

    logoff() {
        this.dataService.clearUserData().then(() => {
            this.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'backward' });
        });
    }
}
