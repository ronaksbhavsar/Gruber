 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { CameraProvider } from '../providers/util/camera.provider';
import { Device } from '@ionic-native/device';
 
import { CallNumber } from '@ionic-native/call-number';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLite } from '@ionic-native/sqlite';
import { AndroidPermissions} from '@ionic-native/android-permissions';

import { LocationTracker } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';


//import { GoogleMaps } from '@ionic-native/google-maps';
import { BackgroundMode } from '@ionic-native/background-mode';
 

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule} from '@ionic/storage';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

//import { Items } from '../mocks/providers/items';
//import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { Sync } from '../providers/sync/sync';
import { DataService } from '../providers/data-service/data-service';
import { PhotoScanService } from '../providers/photo-scan/photo-scan';

//import { NativeGoogleMapsProvider } from '../providers/native-google-maps/native-google-maps';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//export function provideSettings(storage: Storage) {
//    /**
//     * The Settings provider takes a set of default settings for your app.
//     *
//     * You can add new settings options at any time. Once the settings are saved,
//     * these values will not overwrite the saved values (this can be done manually if desired).
//     */
//    return new Settings(storage, {
//        option1: true,
//        option2: 'Ionitron J. Framework',
//        option3: '3',
//        option4: 'Hello'
//    });
//}



@NgModule({
    declarations: [
        MyApp      
    ],
    imports: [
        BrowserModule,
        HttpClientModule,       
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
     
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        TranslateService,
        LocationTracker,
        BackgroundGeolocation,
        Geolocation,
        Api,        
        User,
        Camera,
        CameraProvider,
        Device,
        SplashScreen,
        CallNumber,
        BarcodeScanner,       
        StatusBar,
        SQLite,   
        AndroidPermissions,    
        BackgroundMode,
        Sync, 
        DataService,                        
        PhotoScanService,
        Push,
        //{ provide: Settings, useFactory: provideSettings, deps: [Storage] },
        // Keep this to enable Ionic's runtime error handling during development
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
