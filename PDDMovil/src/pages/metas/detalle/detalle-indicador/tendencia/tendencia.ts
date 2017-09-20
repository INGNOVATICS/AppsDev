import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, Platform, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';

import { MetaProvider } from '../../../../../providers/meta/meta';


@IonicPage()
@Component({
  selector: 'page-tendencia',
  templateUrl: 'tendencia.html',
})
export class TendenciaPage {

  @ViewChild('lineCanvas') lineCanvas = null;
  periodosLabels: string[] = [];
  programadoValor: number[] = [];
  avanzadoValor: number[] = [];

  lineChart: any;

  constructor( public viewCtrl: ViewController,
               public platform: Platform,
               public navParams: NavParams,
               public metaSvc: MetaProvider ) {

                // if(this.platform.is('cordova')){
                //   this.scOrient.lock(this.scOrient.ORIENTATIONS.LANDSCAPE);
                //   };

                  // this.cargarChart();

  }

  ionViewWillEnter() {

    let idIndicador = this.navParams.get("idIndicador");
    //console.log(this.metaSvc.periodosIndicador);
    this.periodosLabels = [];
    this.programadoValor = [];
    this.avanzadoValor = [];
    this.metaSvc.getPeriodosIndicador(idIndicador)
      .then(() => {
        let i: number = 1;

        for (let periodo of this.metaSvc.periodosIndicador ){ 
          this.periodosLabels.push("P"+i);
          this.programadoValor.push(periodo.valorProgramado);
          if (periodo.vencido == 'Si')
            this.avanzadoValor.push(periodo.valorAvanzado);
          i++;                      
        };
        this.cargarChart();
      });
      
    }

  cargarChart(){

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      
                 type: 'line',
                 data: {
                        labels: this.periodosLabels,
                     datasets: [
                         {
                             label: "Programado",
                             fill: false,
                             lineTension: 0.1,
                             backgroundColor: "rgba(75,192,192,0.4)",
                             borderColor: "rgba(75,192,192,1)",
                             borderCapStyle: 'butt',
                             borderDash: [],
                             borderDashOffset: 0.0,
                             borderJoinStyle: 'miter',
                             pointBorderColor: "rgba(75,192,192,1)",
                             pointBackgroundColor: "#fff",
                             pointBorderWidth: 1,
                             pointHoverRadius: 5,
                             pointHoverBackgroundColor: "rgba(75,192,192,1)",
                             pointHoverBorderColor: "rgba(220,220,220,1)",
                             pointHoverBorderWidth: 2,
                             pointRadius: 1,
                             pointHitRadius: 10,
                             data: this.programadoValor,
                             spanGaps: false,
                         },
                         {
                          label: "avanzado",
                          fill: true,
                          lineTension: 0.1,
                          backgroundColor: "rgba(255, 159, 64, 0.8)",
                          borderColor: "rgba(255, 159, 64,1)",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "rgba(255, 159, 64,1)",
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(255, 159, 64,1)",
                          pointHoverBorderColor: "rgba(220,220,220,1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 2,
                          pointHitRadius: 10,
                          data: this.avanzadoValor,
                          spanGaps: false,
                      }
                     ]
                 }
      
             });
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  // ionViewDidLeave(){
  //   if (this.platform.is('cordova')){
  //     this.scOrient.unlock();
  //     this.scOrient.lock(this.scOrient.ORIENTATIONS.PORTRAIT);
  //   }
  // }

}
