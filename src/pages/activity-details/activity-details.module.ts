import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityDetailsPage } from './activity-details';

@NgModule({
  declarations: [
      ActivityDetailsPage,
  ],
  imports: [
      IonicPageModule.forChild(ActivityDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
      ActivityDetailsPage
  ]
})
export class ActivityDetailsPageModule { }
 