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
 

  constructor(private afDB: AngularFireDatabase, private usrSvc: UsuarioProvider) { }

  createMessage(messageItem: Mensaje) {
    return this.mensajesRef.push(messageItem);
  }

  getReceivedMessages() {
    return this.mensajesRef;  
  }

  setResponseAndClose(messageItem: Mensaje){
    return this.mensajesRef.update(messageItem.key, messageItem);
  }

  setMessagesLists(){
    this.messageList$ = this
    .getReceivedMessages()
    .snapshotChanges()
    .map(
      changes =>{
        return changes.map( c => ({
          key: c.payload.key,
          ...c.payload.val()
        })

        )
      }
    )
  }

}
