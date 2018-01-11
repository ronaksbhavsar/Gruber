import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CurrentActivityPage } from './current-activity';

@NgModule({
  declarations: [
      CurrentActivityPage,
  ],
  imports: [
      IonicPageModule.forChild(CurrentActivityPage),
    TranslateModule.forChild()
  ],
  exports: [
      CurrentActivityPage
  ]
})
export class CurrentActivityPageModule { }
 