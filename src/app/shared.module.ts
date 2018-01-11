import { PIPES } from './app.imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    PIPES
    
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    PIPES    
  ]
})

export class SharedModule { }
