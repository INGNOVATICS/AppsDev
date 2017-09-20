import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';

 import { MetaModel } from '../../../../src/app/models/meta_model';

import { TendenciaPage } from './detalle-indicador/tendencia/tendencia';
import { CalendarioPage } from './calendario-eventos/calendario/calendario';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

   detalleMeta: MetaModel;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public platform: Platform) {

    console.log( navParams );
    this.detalleMeta = this.navParams.get("meta");
  }

  verTendenciaIndicador(idIndicador: number){
    console.log("mostrar modal Tendencia");
    let modalTrend = this.modalCtrl.create( TendenciaPage, {idIndicador: idIndicador} );
    modalTrend.present();
  }

  verCalendarioProyecto(idMeta: number){
    console.log("Mostrar modal Calendario");
    let modalCalendar = this.modalCtrl.create( CalendarioPage, {idMeta: idMeta} );
    modalCalendar.present();
  }

  // ionViewWillEnter(){
  //   if (this.platform.is('cordova'))
  //     this.scOrient.lock(this.scOrient.ORIENTATIONS.PORTRAIT);
  // }

  // ionViewDidLeave(){
  //   if (this.platform.is('cordova'))
  //     this.scOrient.unlock();
  // }
}
