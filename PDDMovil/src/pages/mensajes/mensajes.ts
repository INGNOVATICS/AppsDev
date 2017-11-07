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
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private msjSvc: MessageProvider, private usrSvc: UsuarioProvider) {

  }

  resolverTarea(item){
    let respuesta ="Tarea resuelta";
    console.log(item);
    item.status = 1;
    item.responseText = respuesta;
    this.msjSvc.updateTask(item)
    .then(() => {
      console.log("Tarea resuelta por el responsable");
      this.msjSvc.setCountPendingMessages(); 
      console.log("Responder: "+this.msjSvc.countPendienteResponder);
      console.log("Cerrar: "+this.msjSvc.countPendienteCerrar);   
    })
    .catch(err => console.log(err))
  }

  aceptarSolucion(item){
    console.log(item);
    item.status = 2;
    this.msjSvc.updateTask(item)
    .then(() => {
      console.log("Tarea cerrada por el solicitante");
      this.msjSvc.setCountPendingMessages();
      console.log("Responder: "+this.msjSvc.countPendienteResponder);
      console.log("Cerrar: "+this.msjSvc.countPendienteCerrar);
    })
    .catch(err => console.log(err))
  }

}
