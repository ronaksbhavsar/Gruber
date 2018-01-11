import { Injectable } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Sync } from '../sync/sync';
import { DataService } from '../data-service/data-service';

import 'rxjs/add/operator/filter';


@Injectable()
export class LocationTracker {

    user = {
        id: "",
        auth_token: ""
    };

    constructor(
        public backgroundGeolocation: BackgroundGeolocation,
        public geolocation: Geolocation,
        public sync: Sync,
        public dataService: DataService
    ) {

        this.dataService.getUserFromLocalStorage().then((res) => {
            this.user = res;
        });

    }

    saveMobilePosition(location) {

        var mob_positionsTable = this.sync.getTableReference('mob_positions');
        mob_positionsTable.insert({
            p_dtCreazion: new Date(),
            p_positionLatitude: location.latitude,
            p_positionLongitude: location.longitude,
            p_origin: 'PHONE',
            p_tripId: '',
            p_userId: this.user.id,
            p_accurateSettings: ''
            //p_identity: ''
            //p_identity: location.serviceProvider
        }).then((result) => {

            this.sync.pushLocalTablesData();
        }, function (error) {
            alert('error :' + error);
        });
    }

    startTracking() {
        // Get a reference to the plugin.
        var bgGeo = (<any>window).BackgroundGeolocation;
        //This callback will be executed every time a geolocation is recorded in the background.
        var callbackFn = (location) => {
            console.log('- Location: ', JSON.stringify(location));
            this.saveMobilePosition(location);
        };

        // This callback will be executed if a location-error occurs. 
        // Eg: this will be called if user disables location- services.
        var failureFn = (errorCode) => {
            //alert('- BackgroundGeoLocation error: ' + errorCode);
        }
        // Listen to location events & errors.
        bgGeo.on('location', callbackFn, failureFn);
        // Fired whenever state changes from moving->stationary or vice-versa.
        bgGeo.on('motionchange', (isMoving) => {
            console.log('- onMotionChange: ', isMoving);
            //alert('- onMotionChange: ' + isMoving);
        });

        // Fired whenever a geofence transition occurs.
        bgGeo.on('geofence', (geofence) => {
            console.log('- onGeofence: ', geofence.identifier, geofence.location);
        });

        // Fired whenever an HTTP response is received from your server.
        bgGeo.on('http', (response) => {
            console.log('http success: ', response.responseText);

            //alert('http success: ' + response.responseText);
        }, (response) => {
            console.log('http failure: ', response.status);
            //alert('http success: ' + response.responseText);
        });

        // BackgroundGeoLocation is highly configurable.
        bgGeo.configure({
            // Geolocation config
            desiredAccuracy: 0,
            distanceFilter: 10,
            stationaryRadius: 25,
            // Activity Recognition config
            activityRecognitionInterval: 10000,
            stopTimeout: 5,
            // Application config
            debug: true,  // <-- Debug sounds & notifications.
            stopOnTerminate: false,
            startOnBoot: true,
            // HTTP / SQLite config
            url: "https://gruberapidev.azurewebsites.net/POST_MobilePositions",
            method: "POST",
            autoSync: true,
            maxDaysToPersist: 3,
            headers: {  // <-- Optional HTTP headers
                "ZUMO-API-VERSION": "2.0.0",
                "X-ZUMO-AUTH": this.user.auth_token
            },
            params: {   // <-- Optional HTTP params                
            }
        }, (state) => {
            // This callback is executed when the plugin is ready to use.
            console.log("BackgroundGeolocation ready: ", state);
            if (!state.enabled) {
                bgGeo.start();
            }
        });

    }

    getCurrentLocation() {
         
        let location: any = {};
        location = {
            latitude: '',
            longitude: '',
            coordinatesOrigin: "GPS",
            coordinatesDatetime: new Date()
        };
        this.geolocation.getCurrentPosition().then((pos) => {

            location.latitude = pos.coords.latitude;
            location.longitude = pos.coords.longitude;
            location.coordinatesDatetime = new Date()
            return location;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
        return location;

    }

    stopTracking() {
        console.log('stopTracking');
        this.backgroundGeolocation.finish();
    }
}

