import { Component } from '@angular/core';
import {MetaProvider} from '../../providers/meta/meta';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalController } from 'ionic-angular';

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
  countAlertas: number;

  constructor( private metaSvc:MetaProvider,
               private usrSvc: UsuarioProvider,
               private modalCtrl: ModalController ) {
    this.tab1 = ResumenPage;
    this.tab2 = ListadoPage;
    this.tab3 = AlertasPage;

    this.metaSvc.getAlertas()
    .then(() => {//console.log(this.metaSvc.alertaEventos); 
    this.countAlertas = this.metaSvc.alertaEventos.length }
    );
  
  }

ionViewDidLoad(){
  
      // this.metaSvc.getAlertas()
      // .then(() => {//console.log(this.metaSvc.alertaEventos); 
      // this.countAlertas = this.metaSvc.alertaEventos.length }
      // );
    }
  }