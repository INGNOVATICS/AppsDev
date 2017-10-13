import { UsuarioProvider } from './../usuario/usuario';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class MessageProvider {
  nodoMensaje: FirebaseListObservable<any>;
  listadoMensajes: Observable<any[]>;
  //listadoMensajes: any[] = [];
  constructor(private afDB: AngularFireDatabase, private toastCtrl: ToastController, private usrSvc: UsuarioProvider) {
    console.log('Hello MessageProvider Provider');
  }

  // createMessage(meta, jsonMensaje) {
  createMessage(meta, mensaje) {
    let jsonMensaje:any = {}
    jsonMensaje.requesterId = this.usrSvc.idUsuario;
    jsonMensaje.requesterName = this.usrSvc.nombreUsuario;
    jsonMensaje.status = 0;
    jsonMensaje.metaId = meta.idMeta;
    jsonMensaje.metaName = meta.tituloMeta;
    jsonMensaje.messageText = mensaje;

    this.nodoMensaje = this.afDB.list('/mensajes/' + meta.idCoordinador);
    this.nodoMensaje.push(jsonMensaje);
  }

  getMessages() {
    try {
      this.listadoMensajes = this.afDB.list('/mensajes/'+this.usrSvc.idUsuario);
    } catch(Error){
      console.error(Error);
    }
  }

}
