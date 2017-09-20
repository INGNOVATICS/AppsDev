import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MetaProvider } from '../../providers/meta/meta';

@IonicPage()
@Component({
  selector: 'page-alertas',
  templateUrl: 'alertas.html',
})
export class AlertasPage {
  
  alerta: any = {};
  alertas: any[] = [];
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public metaSvc: MetaProvider) { }

  
  ionViewDidLoad(){

    // let i: number = 0;
    // this.alertas = [];
    // for (let meta of this.metaSvc.alertaEventos ){
      

    //   this.alerta.idMeta = meta.idMeta;
    //   this.alerta.tituloMeta = meta.tituloMeta;

    //   // console.log(i +" "+meta.idMeta+" "+this.alerta.idMeta+" "+this.alerta.tituloMeta);
    //   this.alerta.eventos = [];
    //   if (meta.eventos instanceof Array) { 
    //     this.alerta.eventos = meta.eventos.slice(); //se asigna el arreglo completo
    //     console.log("es array");
    //     console.log(this.alerta.eventos);
    //   }
    //   else {
    //     this.alerta.eventos[0] = meta.eventos; //es un solo objeto, se guarda en la posición 0
    //     console.log("No es array");
    //     console.log(this.alerta.eventos);
    //   }

    //   // console.log(this.alerta);

    //   this.alertas[i] = this.alerta; //se guarda el objeto en el array de alertas
    //   i++;
    //    //console.log(this.alertas);
    // }

    // //console.log(this.alertas)
    
  }

}
