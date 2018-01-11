import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ActivityListPage } from './activity-list';

@NgModule({
  declarations: [
      ActivityListPage,
  ],
  imports: [
      IonicPageModule.forChild(ActivityListPage),
    TranslateModule.forChild()
  ],
  exports: [
      ActivityListPage
  ]
})
export class ActivityListPageModule { }
 