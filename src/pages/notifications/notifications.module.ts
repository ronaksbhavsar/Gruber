import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NotificationsListPage } from './notifications';

@NgModule({
  declarations: [
      NotificationsListPage,
  ],
  imports: [
      IonicPageModule.forChild(NotificationsListPage),
    TranslateModule.forChild()
  ],
  exports: [
      NotificationsListPage
  ]
})
export class NotificationsPageModule { }
 