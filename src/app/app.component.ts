import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ToastController, LoadingController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

import { Events } from 'ionic-angular';
 
import { LoginPage, MainPage } from '../pages/pages';
//import { Settings } from '../providers/providers';

import { DataService } from '../providers/data-service/data-service';

@Component({
    template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage: any;

    @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        { title: 'LoginPage', component: 'LoginPage' },        
        { title: 'ProfilePage', component: 'ProfilePage' }
    ]

    private isInstantiated: boolean;
    constructor(       
        private translate: TranslateService,
        private platform: Platform,
        private config: Config,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private backgroundMode: BackgroundMode,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public dataService: DataService,
        public events: Events
        ) {

        this.initTranslate();

        if (!this.isInstantiated) {

            platform.ready().then(() => {

                //To Enable Backgroud mode for prevent to close app.
                if (!this.backgroundMode.isActive()) {
                    this.backgroundMode.enable();
                    //this.backgroundMode.excludeFromTaskList();
                    this.backgroundMode.disableWebViewOptimizations();
                }

                this.isInstantiated = true;
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                //this.statusBar.styleDefault();

                this.statusBar.backgroundColorByHexString('#077f7f');

                //back button handle
                //Registration of push in Android and Windows Phone
                var lastTimeBackPress = 0;
                var timePeriodToExit = 2000;

                platform.registerBackButtonAction(() => {
                    // get current active page
                    let view = this.nav.getActive();
                    if (view.component.name == "ProfilePage" || view.component.name == "LoginPage") {
                        //Double check to exit app
                        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                            //this.platform.exitApp(); //Exit from app    
                            this.backgroundMode.overrideBackButton();
                        } else {
                            let toast = this.toastCtrl.create({
                                message: 'Press back again to exit app?',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            lastTimeBackPress = new Date().getTime();
                        }
                    } else {
                        // go to previous page
                        this.nav.pop({});
                    }
                });

                this.dataService.getUser().then((user) => {                     
                    if (user != null && user.id != null) {
                        //this.dataService.getUserFromLocalStorage().then((user) => {
                        //    console.log('local storage: ', user);
                        //});
                        this.rootPage = MainPage;

                        this.splashScreen.hide();
                        //// Set in local storage for get or set user data.
                        //this.dataService.setUserInLocalStorage(user).then(() => {
                        //    //this.nav.setRoot('ProfilePage', { isFirstTimeLogin: false }, { animate: true, direction: 'forward' });
                        //});
                    }
                    else {
                        this.rootPage = LoginPage;
                        this.splashScreen.hide();
                    }
                });
                                  
            });
        }

    }


    ionViewDidLoad() {
     
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.

        this.translate.setDefaultLang('en');
        this.translate.use('en');

        this.dataService.getUser().then((response) => {
            if (response != null && response.u_language != null && response.u_language != "") {                
                this.translate.setDefaultLang(response.u_language); // Set your language here
                this.translate.use(response.u_language); // Set your language here
            }
        });

        this.events.subscribe('changeUserLanguage', (langId) => {
            this.translate.setDefaultLang(langId);
            this.translate.use(langId);
        });

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

}
