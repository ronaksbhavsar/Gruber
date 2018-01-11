import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';


@IonicPage()
@Component({
    selector: 'page-chats',
    templateUrl: 'chats.html',
})

export class ChatsPage {
    dispatcherData: any;
    chatsData: any = [];
    status: boolean = false;

    userFilter: any = { dispatcherName: '', lastMessage: '' };
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public translate: TranslateService,
        public sync: Sync,
        public dataService: DataService

    ) {
       
    }

    ionViewDidLoad() {
        this.getChatsData();
    }

    getChatsData() {
        let loadingLabelString: string = "";
        this.translate.get('LOADING_LABEL').subscribe((value) => {
            loadingLabelString = value;
        });
        let loader = this.loadingCtrl.create({
            content: loadingLabelString,
        });

        this.dataService.getUser().then((res) => {
            this.dataService.getChatsByDp_id(res.id).then((response) => {
                this.chatsData = response;
                loader.dismiss();
            });
        });
    }

    syncData() {
        // Our translated text strings
        let syncingLabelString: string = "";
        this.translate.get('SYNCING_LABEL').subscribe((value) => {
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

    viewMessages(chat) {
        this.navCtrl.push('MessagesPage', { 'MessageId': chat.id, 'DpName': chat.dispatcherName });
    }

    viewContacts(pageName) {
        this.navCtrl.push(pageName);
    }

    goToOtherPage(pageName) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(pageName);
    }

    generateUserIcon(nameCharacter) {
        let colorArr = [
            "#51b8a3",
            "#5abd53",
            "#1866fa",
            "#c63926",
            "#f17a30",
            "#9754fc"
        ];
        let charASCCI = nameCharacter.charCodeAt(0);
        let mod = charASCCI % 6;

        //let k = colorArr[Math.floor(Math.random() * colorArr.length)];
        let profilePpictureStyle = {
            'border': '1px solid ' + colorArr[mod],            
            'background': colorArr[mod]
        };
        return profilePpictureStyle;
        //return profilePpictureClass;
    }
}
