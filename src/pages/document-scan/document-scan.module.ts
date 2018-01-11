import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
 

import { DocumentScanPage } from './document-scan';

@NgModule({
  declarations: [
      DocumentScanPage,
  ],
  imports: [
      IonicPageModule.forChild(DocumentScanPage),
    TranslateModule.forChild()
  ],
  exports: [
      DocumentScanPage
  ]
})
export class DocumentScanPageModule { }
