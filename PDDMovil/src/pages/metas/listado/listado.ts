import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import {NavController} from 'ionic-angular';

import {DetallePage} from '../detalle/detalle';

import { MetaProvider } from '../../../providers/meta/meta';
import { UsuarioProvider } from '../../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

  pagDetalle: any = DetallePage;
  searchQuery: string = ''; //Search
  items: any[]; //Search
  dependenciaActual: string;
  
  constructor(public metaSvc: MetaProvider,
              public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private usrSvc: UsuarioProvider) {
                this.dependenciaActual = this.usrSvc.idDependencia;
                this.initializeItems();
               }

  initializeItems(){
  
  let loader = this.loadingCtrl.create({
    content: "Cargando metas"
  });
  loader.present();

  this.metaSvc.getMetasDependencia()
        .then( (resp) => {
          loader.dismiss();
          this.items = [];
          console.log(resp);
          this.items = this.metaSvc.metasDependencia; //Search
          this.dependenciaActual = this.usrSvc.idDependencia;
        
        } //console.log(this.metaSvc.metasDependencia)
        )
        .catch(() => loader.dismiss() )

}

getItems(ev: any) {
  // Reset items back to all of the items
  //this.initializeItems();

  // set val to the value of the searchbar
  let val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return (item.tituloMeta.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  else {this.initializeItems()}
}

ionViewWillEnter(){
  console.log(this.usrSvc.idDependencia+" - "+this.usrSvc.idUsuario+" - "+this.dependenciaActual);
  // if (this.usrSvc.idDependencia != this.usrSvc.idUsuario || this.usrSvc.idDependencia != this.dependenciaActual){
    if (this.usrSvc.idDependencia != this.dependenciaActual){
    // this.dependenciaActual = this.usrSvc.idDependencia;
    this.initializeItems();
  }
}

}
