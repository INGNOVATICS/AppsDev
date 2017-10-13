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

  recibidos: Observable<any[]>;
  enviados: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private msjSvc: MessageProvider) {
  }

  ionViewDidEnter() {
    this.msjSvc.getMessages();
    console.log(this.msjSvc.listadoMensajes);
  }

}
