import { SharedModule } from '../../app/shared.module';
import { ChatsPage } from './chats';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@NgModule({
  declarations: [
    ChatsPage,
  ],
  imports: [
      IonicPageModule.forChild(ChatsPage),
      TranslateModule.forChild(),
      SharedModule,
      Ng2FilterPipeModule
  ],
  exports: [
    ChatsPage
  ]
})

export class ChatsPageModule { }
