import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform, IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';

import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';


declare var window: any;
let verificationPrompt: any;

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    LOGIN_ERROR: string = "";
    LOGGING_YOU: string = "";
    LOGIN_NOT_REGISTERED_WITH_US: string = "";
    CANCEL_BUTTON: string = "";
    REGISTER_BUTTON: string = "";
    LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE: string = "";
    LOGIN_YES_REGISTER: string = "";
    LOGIN_REGISTERING: string = "";
    REGISTER_TITLE: string = "";
    REGISTER_VERIFICATION_MESSAGE: string = "";
    REGISTER_INPUT_PLACEHOLDER_NAME: string = "";
    REGISTER_INPUT_BUTTON_VERIFY: string = "";
    REGISTER_VERIFYING_MESSAGE: string = "";
    REGISTER_VERIFICTION_WRONG_CODE_MESSAGE: string = "";
    REGISTER_VERIFICTION_WRONG_CODE_OK: string = "";

    constructor(
        public navCtrl: NavController,
        private device: Device,
        public storage: Storage,
        public androidPermissions: AndroidPermissions,
        public translate: TranslateService,
        public platform: Platform,
        public user: User,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
    ) {

        //this.phoneNumberPattern = /[0-9]{10}$/;
        this.phoneNumberPattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        this.translate.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });

        this.translate.get(["LOGIN_ERROR",
            "LOGGING_YOU",
            "LOGIN_NOT_REGISTERED_WITH_US",
            "CANCEL_BUTTON",
            "REGISTER_BUTTON",
            "LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE",
            "LOGIN_YES_REGISTER",
            "LOGIN_REGISTERING",
            "REGISTER_TITLE",
            "REGISTER_VERIFICATION_MESSAGE",
            "REGISTER_INPUT_PLACEHOLDER_NAME",
            "REGISTER_INPUT_BUTTON_VERIFY",
            "REGISTER_VERIFYING_MESSAGE",
            "REGISTER_VERIFICTION_WRONG_CODE_MESSAGE",
            "REGISTER_VERIFICTION_WRONG_CODE_OK",
        ]).subscribe(
            (values) => {
                console.log('Loaded values', values);
                this.LOGIN_ERROR = values.LOGIN_ERROR;
                this.LOGGING_YOU = values.LOGGING_YOU

                this.LOGIN_NOT_REGISTERED_WITH_US = values.LOGIN_NOT_REGISTERED_WITH_US;
                this.CANCEL_BUTTON = values.CANCEL_BUTTON
                this.REGISTER_BUTTON = values.REGISTER_BUTTON;
                this.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE = values.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE;

                this.LOGIN_YES_REGISTER = values.LOGIN_YES_REGISTER;
                this.LOGIN_REGISTERING = values.LOGIN_REGISTERING;
                this.REGISTER_TITLE = values.REGISTER_TITLE;
                this.REGISTER_VERIFICATION_MESSAGE = values.REGISTER_VERIFICATION_MESSAGE

                this.REGISTER_INPUT_PLACEHOLDER_NAME = values.REGISTER_INPUT_PLACEHOLDER_NAME;
                this.REGISTER_INPUT_BUTTON_VERIFY = values.REGISTER_INPUT_BUTTON_VERIFY;
                this.REGISTER_VERIFYING_MESSAGE = values.REGISTER_VERIFYING_MESSAGE;
                this.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE = values.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE;

                this.REGISTER_VERIFICTION_WRONG_CODE_OK = values.REGISTER_VERIFICTION_WRONG_CODE_OK;

            });


    }

    //countries: any = [{ "name": "Afghanistan", "code": "93" }, { "name": "Albania", "code": "355" }, { "name": "Algeria", "code": "213" }, { "name": "American Samoa", "code": "1-684" }, { "name": "Andorra", "code": "376" }, { "name": "Angola", "code": "244" }, { "name": "Anguilla", "code": "1-264" }, { "name": "Antarctica", "code": "672" }, { "name": "Antigua and Barbuda", "code": "1-268" }, { "name": "Argentina", "code": "54" }, { "name": "Armenia", "code": "374" }, { "name": "Aruba", "code": "297" }, { "name": "Australia", "code": "61" }, { "name": "Austria", "code": "43" }, { "name": "Azerbaijan", "code": "994" }, { "name": "Bahamas", "code": "1-242" }, { "name": "Bahrain", "code": "973" }, { "name": "Bangladesh", "code": "880" }, { "name": "Barbados", "code": "1-246" }, { "name": "Belarus", "code": "375" }, { "name": "Belgium", "code": "32" }, { "name": "Belize", "code": "501" }, { "name": "Benin", "code": "229" }, { "name": "Bermuda", "code": "1-441" }, { "name": "Bhutan", "code": "975" }, { "name": "Bolivia", "code": "591" }, { "name": "Bosnia and Herzegovina", "code": "387" }, { "name": "Botswana", "code": "267" }, { "name": "Brazil", "code": "55" }, { "name": "British Indian Ocean Territory", "code": "246" }, { "name": "British Virgin Islands", "code": "1-284" }, { "name": "Brunei", "code": "673" }, { "name": "Bulgaria", "code": "359" }, { "name": "Burkina Faso", "code": "226" }, { "name": "Burundi", "code": "257" }, { "name": "Cambodia", "code": "855" }, { "name": "Cameroon", "code": "237" }, { "name": "Canada", "code": "1" }, { "name": "Cape Verde", "code": "238" }, { "name": "Cayman Islands", "code": "1-345" }, { "name": "Central African Republic", "code": "236" }, { "name": "Chad", "code": "235" }, { "name": "Chile", "code": "56" }, { "name": "China", "code": "86" }, { "name": "Christmas Island", "code": "61" }, { "name": "Cocos Islands", "code": "61" }, { "name": "Colombia", "code": "57" }, { "name": "Comoros", "code": "269" }, { "name": "Cook Islands", "code": "682" }, { "name": "Costa Rica", "code": "506" }, { "name": "Croatia", "code": "385" }, { "name": "Cuba", "code": "53" }, { "name": "Curacao", "code": "599" }, { "name": "Cyprus", "code": "357" }, { "name": "Czech Republic", "code": "420" }, { "name": "Democratic Republic of the Congo", "code": "243" }, { "name": "Denmark", "code": "45" }, { "name": "Djibouti", "code": "253" }, { "name": "Dominica", "code": "1-767" }, { "name": "Dominican Republic", "code": "1-809, 1-829, 1-849" }, { "name": "East Timor", "code": "670" }, { "name": "Ecuador", "code": "593" }, { "name": "Egypt", "code": "20" }, { "name": "El Salvador", "code": "503" }, { "name": "Equatorial Guinea", "code": "240" }, { "name": "Eritrea", "code": "291" }, { "name": "Estonia", "code": "372" }, { "name": "Ethiopia", "code": "251" }, { "name": "Falkland Islands", "code": "500" }, { "name": "Faroe Islands", "code": "298" }, { "name": "Fiji", "code": "679" }, { "name": "Finland", "code": "358" }, { "name": "France", "code": "33" }, { "name": "French Polynesia", "code": "689" }, { "name": "Gabon", "code": "241" }, { "name": "Gambia", "code": "220" }, { "name": "Georgia", "code": "995" }, { "name": "Germany", "code": "49" }, { "name": "Ghana", "code": "233" }, { "name": "Gibraltar", "code": "350" }, { "name": "Greece", "code": "30" }, { "name": "Greenland", "code": "299" }, { "name": "Grenada", "code": "1-473" }, { "name": "Guam", "code": "1-671" }, { "name": "Guatemala", "code": "502" }, { "name": "Guernsey", "code": "44-1481" }, { "name": "Guinea", "code": "224" }, { "name": "Guinea-Bissau", "code": "245" }, { "name": "Guyana", "code": "592" }, { "name": "Haiti", "code": "509" }, { "name": "Honduras", "code": "504" }, { "name": "Hong Kong", "code": "852" }, { "name": "Hungary", "code": "36" }, { "name": "Iceland", "code": "354" }, { "name": "India", "code": "91" }, { "name": "Indonesia", "code": "62" }, { "name": "Iran", "code": "98" }, { "name": "Iraq", "code": "964" }, { "name": "Ireland", "code": "353" }, { "name": "Isle of Man", "code": "44-1624" }, { "name": "Israel", "code": "972" }, { "name": "Italy", "code": "39" }, { "name": "Ivory Coast", "code": "225" }, { "name": "Jamaica", "code": "1-876" }, { "name": "Japan", "code": "81" }, { "name": "Jersey", "code": "44-1534" }, { "name": "Jordan", "code": "962" }, { "name": "Kazakhstan", "code": "7" }, { "name": "Kenya", "code": "254" }, { "name": "Kiribati", "code": "686" }, { "name": "Kosovo", "code": "383" }, { "name": "Kuwait", "code": "965" }, { "name": "Kyrgyzstan", "code": "996" }, { "name": "Laos", "code": "856" }, { "name": "Latvia", "code": "371" }, { "name": "Lebanon", "code": "961" }, { "name": "Lesotho", "code": "266" }, { "name": "Liberia", "code": "231" }, { "name": "Libya", "code": "218" }, { "name": "Liechtenstein", "code": "423" }, { "name": "Lithuania", "code": "370" }, { "name": "Luxembourg", "code": "352" }, { "name": "Macau", "code": "853" }, { "name": "Macedonia", "code": "389" }, { "name": "Madagascar", "code": "261" }, { "name": "Malawi", "code": "265" }, { "name": "Malaysia", "code": "60" }, { "name": "Maldives", "code": "960" }, { "name": "Mali", "code": "223" }, { "name": "Malta", "code": "356" }, { "name": "Marshall Islands", "code": "692" }, { "name": "Mauritania", "code": "222" }, { "name": "Mauritius", "code": "230" }, { "name": "Mayotte", "code": "262" }, { "name": "Mexico", "code": "52" }, { "name": "Micronesia", "code": "691" }, { "name": "Moldova", "code": "373" }, { "name": "Monaco", "code": "377" }, { "name": "Mongolia", "code": "976" }, { "name": "Montenegro", "code": "382" }, { "name": "Montserrat", "code": "1-664" }, { "name": "Morocco", "code": "212" }, { "name": "Mozambique", "code": "258" }, { "name": "Myanmar", "code": "95" }, { "name": "Namibia", "code": "264" }, { "name": "Nauru", "code": "674" }, { "name": "Nepal", "code": "977" }, { "name": "Netherlands", "code": "31" }, { "name": "Netherlands Antilles", "code": "599" }, { "name": "New Caledonia", "code": "687" }, { "name": "New Zealand", "code": "64" }, { "name": "Nicaragua", "code": "505" }, { "name": "Niger", "code": "227" }, { "name": "Nigeria", "code": "234" }, { "name": "Niue", "code": "683" }, { "name": "North Korea", "code": "850" }, { "name": "Northern Mariana Islands", "code": "1-670" }, { "name": "Norway", "code": "47" }, { "name": "Oman", "code": "968" }, { "name": "Pakistan", "code": "92" }, { "name": "Palau", "code": "680" }, { "name": "Palestine", "code": "970" }, { "name": "Panama", "code": "507" }, { "name": "Papua New Guinea", "code": "675" }, { "name": "Paraguay", "code": "595" }, { "name": "Peru", "code": "51" }, { "name": "Philippines", "code": "63" }, { "name": "Pitcairn", "code": "64" }, { "name": "Poland", "code": "48" }, { "name": "Portugal", "code": "351" }, { "name": "Puerto Rico", "code": "1-787, 1-939" }, { "name": "Qatar", "code": "974" }, { "name": "Republic of the Congo", "code": "242" }, { "name": "Reunion", "code": "262" }, { "name": "Romania", "code": "40" }, { "name": "Russia", "code": "7" }, { "name": "Rwanda", "code": "250" }, { "name": "Saint Barthelemy", "code": "590" }, { "name": "Saint Helena", "code": "290" }, { "name": "Saint Kitts and Nevis", "code": "1-869" }, { "name": "Saint Lucia", "code": "1-758" }, { "name": "Saint Martin", "code": "590" }, { "name": "Saint Pierre and Miquelon", "code": "508" }, { "name": "Saint Vincent and the Grenadines", "code": "1-784" }, { "name": "Samoa", "code": "685" }, { "name": "San Marino", "code": "378" }, { "name": "Sao Tome and Principe", "code": "239" }, { "name": "Saudi Arabia", "code": "966" }, { "name": "Senegal", "code": "221" }, { "name": "Serbia", "code": "381" }, { "name": "Seychelles", "code": "248" }, { "name": "Sierra Leone", "code": "232" }, { "name": "Singapore", "code": "65" }, { "name": "Sint Maarten", "code": "1-721" }, { "name": "Slovakia", "code": "421" }, { "name": "Slovenia", "code": "386" }, { "name": "Solomon Islands", "code": "677" }, { "name": "Somalia", "code": "252" }, { "name": "South Africa", "code": "27" }, { "name": "South Korea", "code": "82" }, { "name": "South Sudan", "code": "211" }, { "name": "Spain", "code": "34" }, { "name": "Sri Lanka", "code": "94" }, { "name": "Sudan", "code": "249" }, { "name": "Suriname", "code": "597" }, { "name": "Svalbard and Jan Mayen", "code": "47" }, { "name": "Swaziland", "code": "268" }, { "name": "Sweden", "code": "46" }, { "name": "Switzerland", "code": "41" }, { "name": "Syria", "code": "963" }, { "name": "Taiwan", "code": "886" }, { "name": "Tajikistan", "code": "992" }, { "name": "Tanzania", "code": "255" }, { "name": "Thailand", "code": "66" }, { "name": "Togo", "code": "228" }, { "name": "Tokelau", "code": "690" }, { "name": "Tonga", "code": "676" }, { "name": "Trinidad and Tobago", "code": "1-868" }, { "name": "Tunisia", "code": "216" }, { "name": "Turkey", "code": "90" }, { "name": "Turkmenistan", "code": "993" }, { "name": "Turks and Caicos Islands", "code": "1-649" }, { "name": "Tuvalu", "code": "688" }, { "name": "U.S. Virgin Islands", "code": "1-340" }, { "name": "Uganda", "code": "256" }, { "name": "Ukraine", "code": "380" }, { "name": "United Arab Emirates", "code": "971" }, { "name": "United Kingdom", "code": "44" }, { "name": "United States", "code": "1" }, { "name": "Uruguay", "code": "598" }, { "name": "Uzbekistan", "code": "998" }, { "name": "Vanuatu", "code": "678" }, { "name": "Vatican", "code": "379" }, { "name": "Venezuela", "code": "58" }, { "name": "Vietnam", "code": "84" }, { "name": "Wallis and Futuna", "code": "681" }, { "name": "Western Sahara", "code": "212" }, { "name": "Yemen", "code": "967" }, { "name": "Zambia", "code": "260" }, { "name": "Zimbabwe", "code": "263" }];
    countries: any = [{ "name": "India", "code": "91" }, { "name": "Italy", "code": "39" }, { "name": "United States", "code": "1" }];

    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    account: { country: string, phone_number: string, password: string, verification: string, action: string } = {
        country: '',
        phone_number: '',
        password: '',
        verification: '',
        action: 'Login'
    };
    phoneNumberPattern: any;

    // Our translated text strings
    private loginErrorString: string;

    ionViewWillEnter() {

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
            success => console.log('Permission granted'),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
        );
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);

    }

    // Attempt to login in through our User service
    doLogin() {

        let loader = this.loadingCtrl.create({
            content: this.LOGGING_YOU,
        });
        loader.present();

        var identity = this.device.uuid.toString().concat(this.account.country.toString().replace('+', '')).concat(this.account.phone_number.toString());

        //var identity = 'e81975b6eb40eaaa393358497296';

        let phoneNumberWithCode = this.account.country.concat(this.account.phone_number);

        this.user.authenticate({
            phone_number: phoneNumberWithCode,
            password: identity,
            verification: "",
            action: "Login"
        }).subscribe((resp) => {
            if (resp) {
                console.log('Login Successfull');

                // Set in local storage for get or set user data.
                this.storage.ready().then(() => {
                    this.storage.set('user', JSON.stringify(resp));
                });

                loader.dismiss();
                this.navCtrl.push(MainPage, { isFirstTimeLogin: true });
            }
            else {
                alert('Something went wrong. Please try later.');
                loader.dismiss();
            }
        }, (err: HttpErrorResponse) => {
            if (err.status === 400) {
                //User is not registered with us..
                console.log('Bad Request');
                loader.dismiss();

                let alert = this.alertCtrl.create({
                    title: 'Gruber',
                    message: this.LOGIN_NOT_REGISTERED_WITH_US,
                    buttons: [
                        {
                            text: this.CANCEL_BUTTON,
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: this.REGISTER_BUTTON,
                            handler: () => {
                                this.doRegister(phoneNumberWithCode, identity);
                                //this.navCtrl.push('RegisterPage', { phone_number: this.account.phone_number });
                                console.log('Register clicked');
                            }
                        }
                    ]
                });
                alert.present();
            }
            else if (err.status === 409) {
                //User is alredy registered on another device..
                console.log('Bad Request');
                loader.dismiss();

                let alert = this.alertCtrl.create({
                    title: 'Gruber',
                    message: this.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE,
                    buttons: [
                        {
                            text: this.CANCEL_BUTTON,
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: this.LOGIN_YES_REGISTER,
                            handler: () => {
                                this.doRegister(phoneNumberWithCode, identity);
                                //this.navCtrl.push('RegisterPage', { phone_number: this.account.phone_number });
                                console.log('Register clicked');
                            }
                        }
                    ]
                });
                alert.present();
            }
            else {
                loader.dismiss();

                // Unable to log in
                let alertError = this.alertCtrl.create({
                    title: 'Gruber',
                    subTitle: this.loginErrorString,
                    buttons: ['OK']
                });
                alertError.present();
            }
        });
    }

    // Attempt to register in through our User service
    doRegister(phone_number: string, identity: string) {

        let loader = this.loadingCtrl.create({
            content: this.LOGIN_REGISTERING,
        });
        loader.present();

        let account = {
            Phone_Number: phone_number,
            Password: identity,
            Verification: "",
            Action: "Register"
        }

        this.user.authenticate(account).subscribe((resp) => {
            console.log('Register Successfull');
            loader.dismiss();

            if (this.platform.is('android')) {
                this.getVerificationCodeFromSMS();
            }

            verificationPrompt = this.alertCtrl.create({
                title: this.REGISTER_TITLE,
                message: this.REGISTER_VERIFICATION_MESSAGE,
                inputs: [
                    {
                        name: 'VerificationCode',
                        placeholder: this.REGISTER_INPUT_PLACEHOLDER_NAME,
                        type: 'numeric',
                        value: ''

                    },
                ],
                buttons: [
                    {
                        text: this.CANCEL_BUTTON,
                        handler: data => {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: this.REGISTER_INPUT_BUTTON_VERIFY,
                        handler: data => {
                            // Verify code.
                            this.doVerify(phone_number, identity, data.VerificationCode);
                        }
                    }
                ]
            });

            verificationPrompt.present();

        }, (err: HttpErrorResponse) => {
            if (err.status === 400) {
                loader.dismiss();

                let errorMessage = JSON.parse(err.error).Message;
                console.log(errorMessage);
                let alertError = this.alertCtrl.create({
                    title: 'Gruber',
                    subTitle: errorMessage,
                    buttons: ['OK']
                });
                alertError.present();
            }
            else {
                loader.dismiss();
            }
        });
    }

    // Attempt to Verify in through our User service
    doVerify(phone_number: string, identity: string, verificationCode: number) {
        let loaderVerify = this.loadingCtrl.create({
            content: this.REGISTER_VERIFYING_MESSAGE,
        });
        loaderVerify.present();

        this.user.authenticate({
            Phone_Number: phone_number,
            Password: identity,
            Verification: verificationCode,
            Action: "Verify"
        }).subscribe((resp) => {
            //verification successfull..
            if (resp) {
                loaderVerify.dismiss();
                console.log(JSON.stringify(resp));

                // Set in local storage for get or set user data.
                this.storage.ready().then(() => {
                    this.storage.set('user', JSON.stringify(resp));
                });

                this.navCtrl.push(MainPage, { isFirstTimeLogin: true });
            }
        }, (err) => {
            //loaderVerify.dismiss();
            console.log(JSON.stringify(err));
            loaderVerify.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Gruber',
                subTitle: this.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE,
                buttons: [this.REGISTER_VERIFICTION_WRONG_CODE_OK]
            });
            alert.present();
            return;
            //verification code wrong!
        });
    }

    getVerificationCodeFromSMS() {
        //template : "Verification code is 125075.";         

        this.startWatchSMS();
        document.addEventListener('onSMSArrive', (e: any) => {
            var msg = e.data.body;
            let verificationCode = msg.substr(21, 6);
            if (new Number(verificationCode)) {
                if (verificationPrompt.data.inputs[0].value.length == 0) {
                    verificationPrompt.data.inputs[0].value = verificationCode;
                    verificationPrompt.setTitle(msg);
                    this.stopWatchSMS();
                }
            }
            console.log(msg);
        });
    }

    startWatchSMS() {
        if (window.SMS) window.SMS.startWatch(() => {
            console.log('watching started');
        }, Error => {
            console.log('failed to start watching');
        });
    }

    stopWatchSMS() {
        if (window.SMS) window.SMS.stopWatch(() => {
            console.log('watching stoped');
        }, Error => {
            console.log('failed to stoped');
        });
    }


}
