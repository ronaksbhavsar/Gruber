import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ConfirmActivityPage } from './confirm-activity';

@NgModule({
  declarations: [
      ConfirmActivityPage,
  ],
  imports: [
      IonicPageModule.forChild(ConfirmActivityPage),
    TranslateModule.forChild()
  ],
  exports: 
  [
  ]
})
export class ConfirmActivityPageModule { }
