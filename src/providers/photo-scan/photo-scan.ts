import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CameraProvider } from '../../providers/util/camera.provider';

@Injectable()

export class PhotoScanService {
    constructor(
        public loadingCtrl: LoadingController,
        private barcodeScanner: BarcodeScanner,
        public cameraProvider: CameraProvider,
    ) { }

    scanBarcode() {
        const options = {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            prompt: 'Place a barcode inside the scan area', // Android
            // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            resultDisplayDuration: 500,
            //formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
            // Android only (portrait|landscape), default unset so it rotates with the device
            orientation: 'portrait',
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS
        };
        
        return this.barcodeScanner.scan(options).then((barcodeData) => {            
            return barcodeData;
        }, (err) => {
            return err;
        });
    }

    takePicture() {
        const loading = this.loadingCtrl.create();
        loading.present();
        return this.cameraProvider.getPictureFromCamera().then(picture => {
            loading.dismiss();
            return picture;
        }, error => {
            alert(error);
            return error;
        });
    }

    getPicture() {
        const loading = this.loadingCtrl.create();
        loading.present();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
            loading.dismiss();
            return picture;
        }, error => {
            alert(error);
            return error;
        });
    }
}
