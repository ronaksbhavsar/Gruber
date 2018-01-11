import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
 

import { PictureUploadPage } from './picture-upload';

@NgModule({
  declarations: [
      PictureUploadPage,
  ],
  imports: [
      IonicPageModule.forChild(PictureUploadPage),
    TranslateModule.forChild()
  ],
  exports: [
      PictureUploadPage
  ]
})
export class PictureUploadPageModule { }
