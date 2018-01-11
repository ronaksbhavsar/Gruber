import { SharedModule } from '../../../app/shared.module';
import { MessagesPage } from './messages';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
      IonicPageModule.forChild(MessagesPage),
      TranslateModule.forChild(),
      SharedModule,
  ],
  exports: [
    MessagesPage
  ]
})

export class MessagesPageModule { }
