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

  jsonMensaje:any = {};
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
        message: 'Error enviando mensaje. Revise su conexión',
        duration: 3000,
        position: 'middle'
      }).present(); 

    }

    this.viewCtrl.dismiss();
  }

  sendMessage(){
    // console.log(this.mensaje);
    // this.jsonMensaje.requesterId = this.usrSvc.idUsuario;
    // this.jsonMensaje.message = this.mensaje;
    // this.jsonMensaje.status = 0; //0 = open, 1 = closed

    // this.msgSvc.createMessage(this.meta, this.jsonMensaje);
   if (this.msgSvc.createMessage(this.meta, this.mensaje))
    this.cerrarModal(true);
   else
    this.cerrarModal(false); 
  }

}
