webpackJsonp([7],{

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(466);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]
        ]
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_providers__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var verificationPrompt;
var LoginPage = (function () {
    function LoginPage(navCtrl, device, storage, androidPermissions, translate, platform, user, toastCtrl, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.device = device;
        this.storage = storage;
        this.androidPermissions = androidPermissions;
        this.translate = translate;
        this.platform = platform;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.LOGIN_ERROR = "";
        this.LOGGING_YOU = "";
        this.LOGIN_NOT_REGISTERED_WITH_US = "";
        this.CANCEL_BUTTON = "";
        this.REGISTER_BUTTON = "";
        this.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE = "";
        this.LOGIN_YES_REGISTER = "";
        this.LOGIN_REGISTERING = "";
        this.REGISTER_TITLE = "";
        this.REGISTER_VERIFICATION_MESSAGE = "";
        this.REGISTER_INPUT_PLACEHOLDER_NAME = "";
        this.REGISTER_INPUT_BUTTON_VERIFY = "";
        this.REGISTER_VERIFYING_MESSAGE = "";
        this.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE = "";
        this.REGISTER_VERIFICTION_WRONG_CODE_OK = "";
        //countries: any = [{ "name": "Afghanistan", "code": "93" }, { "name": "Albania", "code": "355" }, { "name": "Algeria", "code": "213" }, { "name": "American Samoa", "code": "1-684" }, { "name": "Andorra", "code": "376" }, { "name": "Angola", "code": "244" }, { "name": "Anguilla", "code": "1-264" }, { "name": "Antarctica", "code": "672" }, { "name": "Antigua and Barbuda", "code": "1-268" }, { "name": "Argentina", "code": "54" }, { "name": "Armenia", "code": "374" }, { "name": "Aruba", "code": "297" }, { "name": "Australia", "code": "61" }, { "name": "Austria", "code": "43" }, { "name": "Azerbaijan", "code": "994" }, { "name": "Bahamas", "code": "1-242" }, { "name": "Bahrain", "code": "973" }, { "name": "Bangladesh", "code": "880" }, { "name": "Barbados", "code": "1-246" }, { "name": "Belarus", "code": "375" }, { "name": "Belgium", "code": "32" }, { "name": "Belize", "code": "501" }, { "name": "Benin", "code": "229" }, { "name": "Bermuda", "code": "1-441" }, { "name": "Bhutan", "code": "975" }, { "name": "Bolivia", "code": "591" }, { "name": "Bosnia and Herzegovina", "code": "387" }, { "name": "Botswana", "code": "267" }, { "name": "Brazil", "code": "55" }, { "name": "British Indian Ocean Territory", "code": "246" }, { "name": "British Virgin Islands", "code": "1-284" }, { "name": "Brunei", "code": "673" }, { "name": "Bulgaria", "code": "359" }, { "name": "Burkina Faso", "code": "226" }, { "name": "Burundi", "code": "257" }, { "name": "Cambodia", "code": "855" }, { "name": "Cameroon", "code": "237" }, { "name": "Canada", "code": "1" }, { "name": "Cape Verde", "code": "238" }, { "name": "Cayman Islands", "code": "1-345" }, { "name": "Central African Republic", "code": "236" }, { "name": "Chad", "code": "235" }, { "name": "Chile", "code": "56" }, { "name": "China", "code": "86" }, { "name": "Christmas Island", "code": "61" }, { "name": "Cocos Islands", "code": "61" }, { "name": "Colombia", "code": "57" }, { "name": "Comoros", "code": "269" }, { "name": "Cook Islands", "code": "682" }, { "name": "Costa Rica", "code": "506" }, { "name": "Croatia", "code": "385" }, { "name": "Cuba", "code": "53" }, { "name": "Curacao", "code": "599" }, { "name": "Cyprus", "code": "357" }, { "name": "Czech Republic", "code": "420" }, { "name": "Democratic Republic of the Congo", "code": "243" }, { "name": "Denmark", "code": "45" }, { "name": "Djibouti", "code": "253" }, { "name": "Dominica", "code": "1-767" }, { "name": "Dominican Republic", "code": "1-809, 1-829, 1-849" }, { "name": "East Timor", "code": "670" }, { "name": "Ecuador", "code": "593" }, { "name": "Egypt", "code": "20" }, { "name": "El Salvador", "code": "503" }, { "name": "Equatorial Guinea", "code": "240" }, { "name": "Eritrea", "code": "291" }, { "name": "Estonia", "code": "372" }, { "name": "Ethiopia", "code": "251" }, { "name": "Falkland Islands", "code": "500" }, { "name": "Faroe Islands", "code": "298" }, { "name": "Fiji", "code": "679" }, { "name": "Finland", "code": "358" }, { "name": "France", "code": "33" }, { "name": "French Polynesia", "code": "689" }, { "name": "Gabon", "code": "241" }, { "name": "Gambia", "code": "220" }, { "name": "Georgia", "code": "995" }, { "name": "Germany", "code": "49" }, { "name": "Ghana", "code": "233" }, { "name": "Gibraltar", "code": "350" }, { "name": "Greece", "code": "30" }, { "name": "Greenland", "code": "299" }, { "name": "Grenada", "code": "1-473" }, { "name": "Guam", "code": "1-671" }, { "name": "Guatemala", "code": "502" }, { "name": "Guernsey", "code": "44-1481" }, { "name": "Guinea", "code": "224" }, { "name": "Guinea-Bissau", "code": "245" }, { "name": "Guyana", "code": "592" }, { "name": "Haiti", "code": "509" }, { "name": "Honduras", "code": "504" }, { "name": "Hong Kong", "code": "852" }, { "name": "Hungary", "code": "36" }, { "name": "Iceland", "code": "354" }, { "name": "India", "code": "91" }, { "name": "Indonesia", "code": "62" }, { "name": "Iran", "code": "98" }, { "name": "Iraq", "code": "964" }, { "name": "Ireland", "code": "353" }, { "name": "Isle of Man", "code": "44-1624" }, { "name": "Israel", "code": "972" }, { "name": "Italy", "code": "39" }, { "name": "Ivory Coast", "code": "225" }, { "name": "Jamaica", "code": "1-876" }, { "name": "Japan", "code": "81" }, { "name": "Jersey", "code": "44-1534" }, { "name": "Jordan", "code": "962" }, { "name": "Kazakhstan", "code": "7" }, { "name": "Kenya", "code": "254" }, { "name": "Kiribati", "code": "686" }, { "name": "Kosovo", "code": "383" }, { "name": "Kuwait", "code": "965" }, { "name": "Kyrgyzstan", "code": "996" }, { "name": "Laos", "code": "856" }, { "name": "Latvia", "code": "371" }, { "name": "Lebanon", "code": "961" }, { "name": "Lesotho", "code": "266" }, { "name": "Liberia", "code": "231" }, { "name": "Libya", "code": "218" }, { "name": "Liechtenstein", "code": "423" }, { "name": "Lithuania", "code": "370" }, { "name": "Luxembourg", "code": "352" }, { "name": "Macau", "code": "853" }, { "name": "Macedonia", "code": "389" }, { "name": "Madagascar", "code": "261" }, { "name": "Malawi", "code": "265" }, { "name": "Malaysia", "code": "60" }, { "name": "Maldives", "code": "960" }, { "name": "Mali", "code": "223" }, { "name": "Malta", "code": "356" }, { "name": "Marshall Islands", "code": "692" }, { "name": "Mauritania", "code": "222" }, { "name": "Mauritius", "code": "230" }, { "name": "Mayotte", "code": "262" }, { "name": "Mexico", "code": "52" }, { "name": "Micronesia", "code": "691" }, { "name": "Moldova", "code": "373" }, { "name": "Monaco", "code": "377" }, { "name": "Mongolia", "code": "976" }, { "name": "Montenegro", "code": "382" }, { "name": "Montserrat", "code": "1-664" }, { "name": "Morocco", "code": "212" }, { "name": "Mozambique", "code": "258" }, { "name": "Myanmar", "code": "95" }, { "name": "Namibia", "code": "264" }, { "name": "Nauru", "code": "674" }, { "name": "Nepal", "code": "977" }, { "name": "Netherlands", "code": "31" }, { "name": "Netherlands Antilles", "code": "599" }, { "name": "New Caledonia", "code": "687" }, { "name": "New Zealand", "code": "64" }, { "name": "Nicaragua", "code": "505" }, { "name": "Niger", "code": "227" }, { "name": "Nigeria", "code": "234" }, { "name": "Niue", "code": "683" }, { "name": "North Korea", "code": "850" }, { "name": "Northern Mariana Islands", "code": "1-670" }, { "name": "Norway", "code": "47" }, { "name": "Oman", "code": "968" }, { "name": "Pakistan", "code": "92" }, { "name": "Palau", "code": "680" }, { "name": "Palestine", "code": "970" }, { "name": "Panama", "code": "507" }, { "name": "Papua New Guinea", "code": "675" }, { "name": "Paraguay", "code": "595" }, { "name": "Peru", "code": "51" }, { "name": "Philippines", "code": "63" }, { "name": "Pitcairn", "code": "64" }, { "name": "Poland", "code": "48" }, { "name": "Portugal", "code": "351" }, { "name": "Puerto Rico", "code": "1-787, 1-939" }, { "name": "Qatar", "code": "974" }, { "name": "Republic of the Congo", "code": "242" }, { "name": "Reunion", "code": "262" }, { "name": "Romania", "code": "40" }, { "name": "Russia", "code": "7" }, { "name": "Rwanda", "code": "250" }, { "name": "Saint Barthelemy", "code": "590" }, { "name": "Saint Helena", "code": "290" }, { "name": "Saint Kitts and Nevis", "code": "1-869" }, { "name": "Saint Lucia", "code": "1-758" }, { "name": "Saint Martin", "code": "590" }, { "name": "Saint Pierre and Miquelon", "code": "508" }, { "name": "Saint Vincent and the Grenadines", "code": "1-784" }, { "name": "Samoa", "code": "685" }, { "name": "San Marino", "code": "378" }, { "name": "Sao Tome and Principe", "code": "239" }, { "name": "Saudi Arabia", "code": "966" }, { "name": "Senegal", "code": "221" }, { "name": "Serbia", "code": "381" }, { "name": "Seychelles", "code": "248" }, { "name": "Sierra Leone", "code": "232" }, { "name": "Singapore", "code": "65" }, { "name": "Sint Maarten", "code": "1-721" }, { "name": "Slovakia", "code": "421" }, { "name": "Slovenia", "code": "386" }, { "name": "Solomon Islands", "code": "677" }, { "name": "Somalia", "code": "252" }, { "name": "South Africa", "code": "27" }, { "name": "South Korea", "code": "82" }, { "name": "South Sudan", "code": "211" }, { "name": "Spain", "code": "34" }, { "name": "Sri Lanka", "code": "94" }, { "name": "Sudan", "code": "249" }, { "name": "Suriname", "code": "597" }, { "name": "Svalbard and Jan Mayen", "code": "47" }, { "name": "Swaziland", "code": "268" }, { "name": "Sweden", "code": "46" }, { "name": "Switzerland", "code": "41" }, { "name": "Syria", "code": "963" }, { "name": "Taiwan", "code": "886" }, { "name": "Tajikistan", "code": "992" }, { "name": "Tanzania", "code": "255" }, { "name": "Thailand", "code": "66" }, { "name": "Togo", "code": "228" }, { "name": "Tokelau", "code": "690" }, { "name": "Tonga", "code": "676" }, { "name": "Trinidad and Tobago", "code": "1-868" }, { "name": "Tunisia", "code": "216" }, { "name": "Turkey", "code": "90" }, { "name": "Turkmenistan", "code": "993" }, { "name": "Turks and Caicos Islands", "code": "1-649" }, { "name": "Tuvalu", "code": "688" }, { "name": "U.S. Virgin Islands", "code": "1-340" }, { "name": "Uganda", "code": "256" }, { "name": "Ukraine", "code": "380" }, { "name": "United Arab Emirates", "code": "971" }, { "name": "United Kingdom", "code": "44" }, { "name": "United States", "code": "1" }, { "name": "Uruguay", "code": "598" }, { "name": "Uzbekistan", "code": "998" }, { "name": "Vanuatu", "code": "678" }, { "name": "Vatican", "code": "379" }, { "name": "Venezuela", "code": "58" }, { "name": "Vietnam", "code": "84" }, { "name": "Wallis and Futuna", "code": "681" }, { "name": "Western Sahara", "code": "212" }, { "name": "Yemen", "code": "967" }, { "name": "Zambia", "code": "260" }, { "name": "Zimbabwe", "code": "263" }];
        this.countries = [{ "name": "India", "code": "91" }, { "name": "Italy", "code": "39" }, { "name": "United States", "code": "1" }];
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.account = {
            country: '',
            phone_number: '',
            password: '',
            verification: '',
            action: 'Login'
        };
        //this.phoneNumberPattern = /[0-9]{10}$/;
        this.phoneNumberPattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        this.translate.get('LOGIN_ERROR').subscribe(function (value) {
            _this.loginErrorString = value;
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
        ]).subscribe(function (values) {
            console.log('Loaded values', values);
            _this.LOGIN_ERROR = values.LOGIN_ERROR;
            _this.LOGGING_YOU = values.LOGGING_YOU;
            _this.LOGIN_NOT_REGISTERED_WITH_US = values.LOGIN_NOT_REGISTERED_WITH_US;
            _this.CANCEL_BUTTON = values.CANCEL_BUTTON;
            _this.REGISTER_BUTTON = values.REGISTER_BUTTON;
            _this.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE = values.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE;
            _this.LOGIN_YES_REGISTER = values.LOGIN_YES_REGISTER;
            _this.LOGIN_REGISTERING = values.LOGIN_REGISTERING;
            _this.REGISTER_TITLE = values.REGISTER_TITLE;
            _this.REGISTER_VERIFICATION_MESSAGE = values.REGISTER_VERIFICATION_MESSAGE;
            _this.REGISTER_INPUT_PLACEHOLDER_NAME = values.REGISTER_INPUT_PLACEHOLDER_NAME;
            _this.REGISTER_INPUT_BUTTON_VERIFY = values.REGISTER_INPUT_BUTTON_VERIFY;
            _this.REGISTER_VERIFYING_MESSAGE = values.REGISTER_VERIFYING_MESSAGE;
            _this.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE = values.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE;
            _this.REGISTER_VERIFICTION_WRONG_CODE_OK = values.REGISTER_VERIFICTION_WRONG_CODE_OK;
        });
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(function (success) { return console.log('Permission granted'); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_SMS); });
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
    };
    // Attempt to login in through our User service
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.LOGGING_YOU,
        });
        loader.present();
        var identity = this.device.uuid.toString().concat(this.account.country.toString().replace('+', '')).concat(this.account.phone_number.toString());
        //var identity = 'e81975b6eb40eaaa393358497296';
        var phoneNumberWithCode = this.account.country.concat(this.account.phone_number);
        this.user.authenticate({
            phone_number: phoneNumberWithCode,
            password: identity,
            verification: "",
            action: "Login"
        }).subscribe(function (resp) {
            if (resp) {
                console.log('Login Successfull');
                // Set in local storage for get or set user data.
                _this.storage.ready().then(function () {
                    _this.storage.set('user', JSON.stringify(resp));
                });
                loader.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages__["b" /* MainPage */], { isFirstTimeLogin: true });
            }
            else {
                alert('Something went wrong. Please try later.');
                loader.dismiss();
            }
        }, function (err) {
            if (err.status === 400) {
                //User is not registered with us..
                console.log('Bad Request');
                loader.dismiss();
                var alert_1 = _this.alertCtrl.create({
                    title: 'Gruber',
                    message: _this.LOGIN_NOT_REGISTERED_WITH_US,
                    buttons: [
                        {
                            text: _this.CANCEL_BUTTON,
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: _this.REGISTER_BUTTON,
                            handler: function () {
                                _this.doRegister(phoneNumberWithCode, identity);
                                //this.navCtrl.push('RegisterPage', { phone_number: this.account.phone_number });
                                console.log('Register clicked');
                            }
                        }
                    ]
                });
                alert_1.present();
            }
            else if (err.status === 409) {
                //User is alredy registered on another device..
                console.log('Bad Request');
                loader.dismiss();
                var alert_2 = _this.alertCtrl.create({
                    title: 'Gruber',
                    message: _this.LOGIN_ALREADY_REGISTERED_WITH_ANOTHER_DEVICE,
                    buttons: [
                        {
                            text: _this.CANCEL_BUTTON,
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: _this.LOGIN_YES_REGISTER,
                            handler: function () {
                                _this.doRegister(phoneNumberWithCode, identity);
                                //this.navCtrl.push('RegisterPage', { phone_number: this.account.phone_number });
                                console.log('Register clicked');
                            }
                        }
                    ]
                });
                alert_2.present();
            }
            else {
                loader.dismiss();
                // Unable to log in
                var alertError = _this.alertCtrl.create({
                    title: 'Gruber',
                    subTitle: _this.loginErrorString,
                    buttons: ['OK']
                });
                alertError.present();
            }
        });
    };
    // Attempt to register in through our User service
    LoginPage.prototype.doRegister = function (phone_number, identity) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: this.LOGIN_REGISTERING,
        });
        loader.present();
        var account = {
            Phone_Number: phone_number,
            Password: identity,
            Verification: "",
            Action: "Register"
        };
        this.user.authenticate(account).subscribe(function (resp) {
            console.log('Register Successfull');
            loader.dismiss();
            if (_this.platform.is('android')) {
                _this.getVerificationCodeFromSMS();
            }
            verificationPrompt = _this.alertCtrl.create({
                title: _this.REGISTER_TITLE,
                message: _this.REGISTER_VERIFICATION_MESSAGE,
                inputs: [
                    {
                        name: 'VerificationCode',
                        placeholder: _this.REGISTER_INPUT_PLACEHOLDER_NAME,
                        type: 'numeric',
                        value: ''
                    },
                ],
                buttons: [
                    {
                        text: _this.CANCEL_BUTTON,
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: _this.REGISTER_INPUT_BUTTON_VERIFY,
                        handler: function (data) {
                            // Verify code.
                            _this.doVerify(phone_number, identity, data.VerificationCode);
                        }
                    }
                ]
            });
            verificationPrompt.present();
        }, function (err) {
            if (err.status === 400) {
                loader.dismiss();
                var errorMessage = JSON.parse(err.error).Message;
                console.log(errorMessage);
                var alertError = _this.alertCtrl.create({
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
    };
    // Attempt to Verify in through our User service
    LoginPage.prototype.doVerify = function (phone_number, identity, verificationCode) {
        var _this = this;
        var loaderVerify = this.loadingCtrl.create({
            content: this.REGISTER_VERIFYING_MESSAGE,
        });
        loaderVerify.present();
        this.user.authenticate({
            Phone_Number: phone_number,
            Password: identity,
            Verification: verificationCode,
            Action: "Verify"
        }).subscribe(function (resp) {
            //verification successfull..
            if (resp) {
                loaderVerify.dismiss();
                console.log(JSON.stringify(resp));
                // Set in local storage for get or set user data.
                _this.storage.ready().then(function () {
                    _this.storage.set('user', JSON.stringify(resp));
                });
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages__["b" /* MainPage */], { isFirstTimeLogin: true });
            }
        }, function (err) {
            //loaderVerify.dismiss();
            console.log(JSON.stringify(err));
            loaderVerify.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Gruber',
                subTitle: _this.REGISTER_VERIFICTION_WRONG_CODE_MESSAGE,
                buttons: [_this.REGISTER_VERIFICTION_WRONG_CODE_OK]
            });
            alert.present();
            return;
            //verification code wrong!
        });
    };
    LoginPage.prototype.getVerificationCodeFromSMS = function () {
        //template : "Verification code is 125075.";         
        var _this = this;
        this.startWatchSMS();
        document.addEventListener('onSMSArrive', function (e) {
            var msg = e.data.body;
            var verificationCode = msg.substr(21, 6);
            if (new Number(verificationCode)) {
                if (verificationPrompt.data.inputs[0].value.length == 0) {
                    verificationPrompt.data.inputs[0].value = verificationCode;
                    verificationPrompt.setTitle(msg);
                    _this.stopWatchSMS();
                }
            }
            console.log(msg);
        });
    };
    LoginPage.prototype.startWatchSMS = function () {
        if (window.SMS)
            window.SMS.startWatch(function () {
                console.log('watching started');
            }, function (Error) {
                console.log('failed to start watching');
            });
    };
    LoginPage.prototype.stopWatchSMS = function () {
        if (window.SMS)
            window.SMS.stopWatch(function () {
                console.log('watching stoped');
            }, function (Error) {
                console.log('failed to stoped');
            });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"D:\Gruber\MobileApp\Gruber\src\pages\login\login.html"*/'<ion-content>\n\n    <form>\n\n        <ion-row>\n\n            <ion-col col-1>\n\n            </ion-col>\n\n            <ion-col col-10>\n\n                <ion-row>\n\n                    <ion-col>\n\n                        <img src="assets/img/gruber-logo.png" />\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row class="title-text">\n\n                    <ion-col>\n\n                        <span>{{ \'LOGIN_SENDVERIFICATIONCODE_TITLE\' | translate }}</span>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n                <ion-row class="phone-number">\n\n                    <ion-label stacked class="phone-number-label">{{ \'COUNTRIES_TITLE\' | translate }}</ion-label>\n\n                    <ion-col col-12 class="country">\n\n                        <ion-item>\n\n                            <ion-label> </ion-label>\n\n                            <ion-select id="country" [(ngModel)]="account.country" #country="ngModel" required [ngModelOptions]="{standalone: true}">\n\n                                <ion-option *ngFor="let country of countries"\n\n                                            value="+{{country.code}}">{{country.name}}</ion-option>\n\n                            </ion-select>\n\n                        </ion-item>\n\n                    </ion-col>\n\n                    <ion-col>\n\n                        <ion-label stacked class="phone-number-label">{{ \'LOGIN_PHONENUMBER_LABEL\' | translate }}</ion-label>\n\n                        <div>\n\n                            <ion-input col-4 id="countrycode" type="text" value="{{account.country}}" disabled></ion-input>\n\n\n\n                            <ion-input col-8 id="phonenumber" type="number" required maxlength="10" [(ngModel)]="account.phone_number"\n\n                                       [pattern]="phoneNumberPattern" #phonenumber="ngModel" name="phone_number"></ion-input>\n\n                        </div>\n\n                        <div [hidden]="phonenumber.valid || phonenumber.pristine" class="help-block">\n\n                            <div [hidden]="!phonenumber.hasError(\'required\')">{{\'Phone number is required\' | translate}}</div>\n\n                            <div [hidden]="!phonenumber.hasError(\'pattern\')">{{\'Phone number format should be\' | translate}} <small><b>{{\'9978113511\' | translate}}</b></small></div>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n            </ion-col>\n\n            <ion-col col-1>\n\n            </ion-col>\n\n        </ion-row>\n\n    </form>\n\n</ion-content>\n\n<ion-footer>\n\n    <button ion-button full color="primary" class="login-button" [disabled]="!phonenumber.valid || !country.valid" (click)="doLogin()">{{ \'LOGIN_SENDVERIFICATIONCODE_BUTTON\' | translate }}</button>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Gruber\MobileApp\Gruber\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__["a" /* AndroidPermissions */],
        __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_6__providers_providers__["b" /* User */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* LoadingController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=7.js.map