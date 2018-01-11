import { Component} from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Sync } from '../../providers/sync/sync';
import { DataService } from '../../providers/data-service/data-service';


@IonicPage()
@Component({
    selector: 'page-chat-contacts',
    templateUrl: 'chat-contacts.html',
})

export class ChatContactsPage {

    user = {
        id: "",
        u_identity: "",
        u_photo: "",
        u_lastLogin: "",
        u_language: "",
        u_name: "",
        u_phone: ""
    };

    // userId: string = "";
    userChatList: any = [];
    MobMessageObj: any;
    userFilter: any = { dp_name: '', dp_phone: '' };
    MobMessages: any = [];
    tranlageMessage: any = [];

    constructor(public navCtrl: NavController,
        public translate: TranslateService,
        public sync: Sync,

        public loadingCtrl: LoadingController,
        public dataService: DataService
    ) {

        this.translate.get([
            "SYNCING_LABEL",           
            "LOADING_LABEL",
        ]).subscribe(
            (values) => {
                this.tranlageMessage['SYNCING_LABEL'] = values.SYNCING_LABEL;            
                this.tranlageMessage['LOADING_LABEL'] = values.LOADING_LABEL;
            });

        this.dataService.getUser().then((res) => {          
            this.user = res;            
        });
    } 

    ionViewDidLoad() {
        this.getChatContacts();
    }

    getChatContacts() {
       
        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });

        this.dataService.getMob_dispatchers().then((response) => {
            this.userChatList = response;
            loader.dismiss();
        });
    }

    viewMessages(chat) {
        let loader = this.loadingCtrl.create({
            content: this.tranlageMessage['LOADING_LABEL'],
        });
        loader.present();        
        this.dataService.getMob_messagesByDp_id(this.user.id, chat.id).then((response) => {
            if (response.length == 0) {
                this.MobMessageObj = {
                    'm_objectType': "User",
                    'm_objectKey': chat.id,
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
                    this.navCtrl.push('MessagesPage', { DpName: chat.dp_name, MessageId: msg.id, DpPhone: msg.m_objectKey });
                });
            }
            else {
                loader.dismiss();
                // already availbale in messages. so no need to add it again.
                this.navCtrl.push('MessagesPage', { DpName: chat.dp_name, MessageId: response[0].id, DpPhone: response[0].m_objectKey });
            }
        });
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
