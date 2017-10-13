import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { MetaProvider } from '../../../../../providers/meta/meta';

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {
  error: boolean = false;
  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public metaSvc: MetaProvider) {}

  ionViewDidLoad(){
    let idMeta: number;
    idMeta = this.navParams.get("idMeta");
    //console.log("id de meta:"+idMeta);
    this.metaSvc.getEventosMeta(idMeta)
    .then( () => console.log(this.metaSvc.eventosMeta) 
    )
    .catch(()=>      this.error = true
     );
  }

cerrarModal(){
  this.viewCtrl.dismiss();
}

estiloEstadoEvento(idEstado: number){
  // console.log(idEstado);
  let colorEstadoEvento: string;
  switch(idEstado){
    case 0: //En gestión
      colorEstadoEvento = 'secondary';
      break;
    case 1: //Atrasada
      colorEstadoEvento = 'danger';
      break;
    case 2: //Suspendida
      colorEstadoEvento = 'nodata';
      break;
    case 3: //Terminada
      colorEstadoEvento = 'primary';
      break;
    case 4: //Programada
      colorEstadoEvento = 'waitdata';
      break;
  };

  return colorEstadoEvento;
}

}
