import { FormControl, FormBuilder } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Content, NavParams, LoadingController } from 'ionic-angular';

import { Sync } from '../../../providers/sync/sync';
import { DataService } from '../../../providers/data-service/data-service';

@IonicPage()
@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html'
})
export class MessagesPage {
    toUser: any = '';

    MessageId: string = '';
    LastMessageDatetime: Date;
    messages: any = [];
    public messageForm: any;
    chatBox: any;

    public timerMessages: any;
    user = {
        id: '',
        pic: 'assets/img/speakers/cheetah.jpg',
        username: '',
        u_phone: ''
    };

    constructor(
        public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public translate: TranslateService,

        public sync: Sync,
        public dataService: DataService
    ) {
        this.messageForm = formBuilder.group({
            message: new FormControl('')
        });

        this.chatBox = '';
        this.MessageId = navParams.get("MessageId");

        this.dataService.getUser().then((res) => {
            this.user = res;
        });

        this.toUser = {
            'MessageId': this.MessageId,
            'pic': 'assets/img/speakers/bear.jpg',
            'username': navParams.get("DpName"),
        };

    }

    doneLoading = false;

    @ViewChild(Content) content: Content;

    ionViewDidLoad() {
        this.getMessagesTexts();
    }

    getMessagesTexts() {

        this.dataService.getMob_messagesTextsByMessageId(this.MessageId)
            .then((response) => {

                this.messages = response;
                let messageCount = response.length - 1;

                if (messageCount > 0) {
                    this.LastMessageDatetime = response[messageCount].ms_dtcreation;
                }

                this.scrollToBottom();
                this.getLatestMessagesTexts();

                setTimeout(() => {

                    for (var v in this.messages) // for acts as a foreach  
                    {
                        if (!this.messages[v].Mob_messagesTextsReadId && this.user.id != this.messages[v].ms_sender ) {

                            let readMessage = {
                                ms_messageId: this.MessageId.toString(),
                                ms_messageTextId: this.messages[v].id,
                                ms_user: this.user.id.toString(),
                                ms_dtRead: new Date(),
                                deleted: false
                            };

                            this.sync.insertTableRow('Mob_messagesTextsRead', readMessage).then((data) => {
                                this.messages[v].Mob_messagesTextsReadId = data.id;
                                // this.getMessagesTexts();
                            });
                        }
                    }

                }, 3000);
            });
    }

    getLatestMessagesTexts() {
        this.timerMessages = setInterval(() => {

            this.sync.syncMessageTextsRelatedLocalTables().then(() => {
                this.dataService.getMob_messagesTextsByMessageIdAndDatetime(this.MessageId, this.LastMessageDatetime)
                    .then((latestMessages) => {
                        //let messageCount = latestMessages.length - 1;
                        //alert(JSON.stringify(latestMessages));
                        latestMessages.forEach((messageData: any) => {
                            this.messages.push(messageData);
                            this.LastMessageDatetime = messageData.ms_dtcreation;
                        });
                        //this.messages.push(latestMessages);
                    });
            });
        }, 5000);
    }

    ionViewDidLeave() {
        //Fired when you leave a page, after it stops being the active one. Similar to the previous one.
        clearInterval(this.timerMessages);
        console.log('messages sync stopped');
    }
    send(message) {
        if (message && message !== '') {

            const messageData =
                {
                    'ms_messageId': this.MessageId,
                    'ms_dtcreation': new Date(),
                    'ms_sender': this.user.id,
                    'ms_message': message
                };

            //alert(JSON.stringify(messageData));

            this.sync.insertTableRow('Mob_messagesTexts', messageData)
                .then((result) => {
                    //this.msMessageTextId = result.id;
                    this.messages.push(messageData);
                    //alert(JSON.stringify(result));
                    this.scrollToBottom();
                });

            //setTimeout(() => {
            //    this.getMessagesTexts();
            //    this.scrollToBottom();
            //}, 3000);
        }

        this.chatBox = '';
    }

    goToOtherPage(pageName) {
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        this.navCtrl.push(pageName);
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

    scrollToBottom() {
        this.content.scrollToBottom();
    }

    onProfilePicError() {
    };

}
