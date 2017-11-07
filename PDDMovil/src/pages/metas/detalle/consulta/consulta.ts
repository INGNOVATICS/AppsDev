import { Mensaje } from './../../../../app/models/mensajes.model';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';
import { UsuarioProvider } from '../../../../providers/usuario/usuario';
import { MessageProvider } from '../../../../providers/message/message';


// interface mensaje {
//   idCoordinador: string;

// }

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  jsonMensaje:Mensaje;
  meta:any;
  mensaje:string ="";
  
  constructor(public navParams: NavParams, private viewCtrl: ViewController, 
              private usrSvc:UsuarioProvider,
              private toastCtrl: ToastController, private msgSvc: MessageProvider) {
    this.meta = this.navParams.get("meta");
    console.log(this.meta);
    //this.msgSvc.getMessages();
  }

  cerrarModal(messageSent: boolean){
    if (messageSent){
    let toast = this.toastCtrl.create({
      message: 'Su mensaje ha sido guardado',
      duration: 3000,
      position: 'middle'
    }).present();
  }
    else {
      let toast = this.toastCtrl.create({
        message: 'Mensaje no enviado',
        duration: 3000,
        position: 'middle'
      }).present(); 

    }

    this.viewCtrl.dismiss();
  }

  sendMessage(){
    this.jsonMensaje = {
      messageText: this.mensaje,
      metaId: this.meta.idMeta,
      metaName: this.meta.tituloMeta,
      requesterId: this.usrSvc.idUsuario,
      requesterName: this.usrSvc.nombreUsuario,
      responseText: '',
      responserId: this.meta.idCoordinador,
      responserName: this.meta.nombreCoordinador,
      status: 0
    };

    // this.msgSvc.createMessage(this.meta, this.jsonMensaje);
   this.msgSvc.createMessage(this.jsonMensaje)
   .then(ref => {
      if (ref.key){ 
      console.log(ref.key);
      this.msgSvc.setCountPendingMessages();
      console.log("Responder: "+this.msgSvc.countPendienteResponder);
      console.log("Cerrar: "+this.msgSvc.countPendienteCerrar);
      this.cerrarModal(true);
      }else
      this.cerrarModal(false);
   })
  }

}
