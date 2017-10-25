import { MessageProvider } from './../../providers/message/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
 

@IonicPage()
@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {

  bandejaDefault: string = 'recibidas';
  constructor(public navCtrl: NavController, public navParams: NavParams, private msjSvc: MessageProvider) {
  }

  ionViewDidEnter() {
    // this.msjSvc.getMessages();
     console.log(this.msjSvc.listadoMensajesRecibidos);
     console.log(this.msjSvc.listadoMensajesEnviados);
  }

  cambiarEstado(item){

    let respuesta ="cualquier cosa";
    console.log(item.$key);
    this.msjSvc.setResponseAndClose(item.$key, respuesta);
  }

}
