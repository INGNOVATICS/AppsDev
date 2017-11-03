import { Mensaje } from './../../app/models/mensajes.model';
import { UsuarioProvider } from './../../providers/usuario/usuario';
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
  msjRecibidos: Mensaje[];
  msjEnviados:  Mensaje[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private msjSvc: MessageProvider, private usrSvc: UsuarioProvider) {
  }

  ionViewWillLoad() {

    this.msjSvc.messageList$.subscribe(mensajes =>{
      mensajes.forEach(mensaje => {
        console.log(mensaje.requesterId +" - "+mensaje.responserId);
        if (mensaje.requesterId == this.usrSvc.idUsuario)
          this.msjEnviados.push(mensaje);
        if (mensaje.responserId == this.usrSvc.idUsuario)
          this.msjRecibidos.push(mensaje);
      })
      console.log(this.msjRecibidos)
    })
  }

  cambiarEstado(item){

    let respuesta ="cualquier cosa";
    console.log(item);
    item.status = 1;
    item.responseText = respuesta;
    this.msjSvc.setResponseAndClose(item)
    .then(() => {console.log("borrados")})
    .catch(err => console.log(err))
  }

}
