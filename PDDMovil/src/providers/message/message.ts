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
  //listadoMensajesRecibidos: Observable<any[]>;
  listadoMensajesRecibidos: any[];
  listadoMensajesEnviados: any[];
  //listadoMensajes: any[] = [];
  countMensajesPendientes: number = 0;
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
    jsonMensaje.responserId = meta.idCoordinador;
    jsonMensaje.responserName = meta.nombreCoordinador;

    this.nodoMensaje = this.afDB.list('/mensajes/');
    this.nodoMensaje.push(jsonMensaje)
    .catch( err => {return false} );
  }

  getReceivedMessages() {
    try {
      this.afDB.list('/mensajes/', {
        query: {
          orderByChild: 'responserId',
          equalTo: this.usrSvc.idUsuario
        }
      })
      .subscribe(items => {
        this.listadoMensajesRecibidos = items;
        items.forEach(item =>{
          if(item.status == 0)
            this.countMensajesPendientes++;
        })
      });

      this.afDB.list('/mensajes/', {
        query: {
          orderByChild: 'requesterId',
          equalTo: this.usrSvc.idUsuario
        }
      })
      .subscribe(items => {
        this.listadoMensajesEnviados = items;
        console.log(items);
        items.forEach(item => {
          console.log(item.status);
        })
      })


    } catch(Error){
      console.error(Error);
    }
  }

  // getSentMessages(){
  //   try{
  //     this.afDB.list('/mensajes', {
  //       query: {
  //         orderByChild: 'requesterId',
  //         equalTo: this.usrSvc.idUsuario
  //       }
  //     })
  //     .subscribe(items => {
  //       this.listadoMensajesEnviados = items;
  //       console.log(items);
  //     })
  //   }
  //   catch(Error){
  //     console.log(Error);
  //   }
  // }

  setResponseAndClose(id, response){
    this.nodoMensaje = this.afDB.list('/mensajes/');
    console.log(this.nodoMensaje);// this.nodoMensaje.push(response);
    this.nodoMensaje.update(id, 
      {
        status: 1,
        responseText: response
      })
      .then(() => this.countMensajesPendientes--); 
  }

}
