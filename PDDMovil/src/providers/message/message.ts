import { Mensaje } from './../../app/models/mensajes.model';
import { UsuarioProvider } from './../usuario/usuario';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class MessageProvider {


  private mensajesRef = this.afDB.list<Mensaje>('/mensajes/');
  messageList$: Observable<Mensaje[]>;

  countPendienteResponder: number = 0
  countPendienteCerrar: number = 0;
 

  constructor(private afDB: AngularFireDatabase, private usrSvc: UsuarioProvider) { }

  createMessage(messageItem: Mensaje) {
    return this.mensajesRef.push(messageItem);
  }

  getReceivedMessages() {
    return this.mensajesRef;  
  }

  updateTask(messageItem: Mensaje){
    return this.mensajesRef.update(messageItem.key, messageItem);
  }

  setMessagesLists(){
    this.messageList$ = this
    .getReceivedMessages()
    .snapshotChanges()
    .map(
      changes =>{
        this.setCountPendingMessages();
        return changes.map( c => ({
          key: c.payload.key,
          ...c.payload.val()
        })

        )
      }
    )
  }

  setCountPendingMessages(){
    // this.countPendienteCerrar = 0;
    // this.countPendienteResponder = 0;

    this.messageList$.forEach(mensajes =>{
      this.countPendienteCerrar = 0;
      this.countPendienteResponder = 0;
      mensajes.forEach(mensaje => {
        if (mensaje.status===0 && mensaje.responserId == this.usrSvc.idUsuario)
          this.countPendienteResponder++;
        if (mensaje.status===1 && mensaje.requesterId == this.usrSvc.idUsuario)
        this.countPendienteCerrar++;
      })
    })
    console.log("Responder: "+this.countPendienteResponder);
    console.log("Cerrar: "+this.countPendienteCerrar);
  }

}
