import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {UsuarioProvider} from '../../../../providers/usuario/usuario';
interface mensaje {
  idCoordinador: string;

}

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  jsonMensaje:any = {};
  meta:any;
  mensaje:string ="";
  mensajes: FirebaseListObservable<any>;

  constructor(public navParams: NavParams, private viewCtrl: ViewController, 
              private afDB: AngularFireDatabase, private usrSvc:UsuarioProvider,
              private toastCtrl: ToastController) {
    this.meta = this.navParams.get("meta");
    console.log(this.meta);
  }

  cerrarModal(){
    let toast = this.toastCtrl.create({
      message: 'Su mensaje ha sido guardado',
      duration: 3000,
      position: 'middle'
    }).present();
    this.viewCtrl.dismiss();
  }

  sendMessage(){
    console.log(this.mensaje);
    this.jsonMensaje.requester = this.usrSvc.idUsuario;
    this.jsonMensaje.message = this.mensaje;
    this.mensajes = this.afDB.list('/mensajes/'+this.meta.idCoordinador+'/'+this.meta.idMeta);
    this.mensajes.push(this.jsonMensaje);

    this.cerrarModal();
  }

}
