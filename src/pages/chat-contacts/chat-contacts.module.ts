import { SharedModule } from '../../app/shared.module';
import { ChatContactsPage } from './chat-contacts';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { IonicPageModule } from 'ionic-angular';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@NgModule({
  declarations: [
      ChatContactsPage,
  ],
  imports: [
      IonicPageModule.forChild(ChatContactsPage),
      TranslateModule.forChild(),
      SharedModule,
      Ng2FilterPipeModule
  ],
  exports: [
      ChatContactsPage
  ]
})

export class ChatContactsPageModule { }
