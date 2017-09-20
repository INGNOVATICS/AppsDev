import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TendenciaPage } from './tendencia';

@NgModule({
  declarations: [
    TendenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(TendenciaPage),
  ],
})
export class TendenciaPageModule {}
