import { Mensaje } from './../../app/models/mensajes.model';
import { Observable } from 'rxjs/Observable';
import { MessageProvider } from './../../providers/message/message';
import { MensajesPage } from './../mensajes/mensajes';
import { Component } from '@angular/core';
import {MetaProvider} from '../../providers/meta/meta';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalController } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

//Importar las paginas de Tabs

import {ResumenPage}  from '../resumen/resumen';
import {AlertasPage}  from '../alertas/alertas';
import {ListadoPage}  from '../metas/listado/listado';
import {LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  countAlertas: number;
  countRecibidos: number = 0;
  //messageList$: Observable<Mensaje[]>;

  constructor( private metaSvc:MetaProvider,
               private usrSvc: UsuarioProvider,
               private modalCtrl: ModalController,
               private toastCtrl: ToastController,
               private msjSvc: MessageProvider ) {
    this.tab1 = ResumenPage;
    this.tab2 = ListadoPage;
    this.tab3 = AlertasPage;
    this.tab4 = MensajesPage;

    this.metaSvc.getAlertas()
    .then(() => {//console.log(this.metaSvc.alertaEventos); 
    this.countAlertas = this.metaSvc.alertaEventos.length }
    );

    this.msjSvc.setMessagesLists();
     
  }

ionViewWillLeave(){
  
  let toast = this.toastCtrl.create({
    message: 'Adios',
    duration: 3000,
    position: 'middle'
  }).present();
    }
  }