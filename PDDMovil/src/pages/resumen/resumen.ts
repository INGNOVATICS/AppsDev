import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
//Charts
import { Chart } from 'chart.js';
//Servicios
import { MetaProvider } from '../../providers/meta/meta';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';
import { ConfiguracionPage } from '../configuracion/configuracion';


@IonicPage()
@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  estadoLabels: string[] = [];
  estadoCantidad: number[] = [];
  estadoColor: string[] = [];
  estadoColorHover: string[] = [];
  currentDate = new Date();

  doughnutChart: any;

  constructor(private metaSvc: MetaProvider, private usrSvc: UsuarioProvider, 
              private navCtrl: NavController, private modalCtrl: ModalController) { 

              this.cargarResumen();
   }

   cargarResumen(){
    this.estadoLabels = [];
    this.estadoCantidad = [];
    this.estadoColor = [];
    this.estadoColorHover = [];
    this.metaSvc.getEstadoMetasDependencia()
    .then( () =>{
      
      for (let estadoMetas of this.metaSvc.estados){
        //console.log(estadoMetas.cantidad);
        this.estadoLabels.push(estadoMetas.estado);
        this.estadoCantidad.push(estadoMetas.cantidad);
        this.estadoColor.push(estadoMetas.idColor);
        this.estadoColorHover.push(this.ColorLuminance(estadoMetas.idColor, 0.5));
      };
      this.cargarChart();
    } )
    .catch( () => console.log("error") )
   }

   showConfig(){
    let configModal = this.modalCtrl.create( ConfiguracionPage );
    configModal.present();
    configModal.onDidDismiss( cambio => {
      console.log(this.usrSvc.idDependencia);
      this.cargarResumen();

      this.metaSvc.getAlertas()
      .then(() => { //Cambiar alertas 
      console.log(this.metaSvc.countAlertas); }
      );
    })
   }

  cargarChart(){
    
    //console.log(this.estadoLabels[0] +" : "+ this.estadoCantidad[0]);
    //console.log(this.estadoLabels[1] +" : "+ this.estadoCantidad[1]);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      
                 type: 'doughnut',
                 data: {
                     labels: this.estadoLabels, //["Atrasado", "Gestión Normal", "Detenido", "Finalizado"], //, "Purple", "Orange"],
                     datasets: [{
                         label: 'Cantidad',
                         data: this.estadoCantidad, // [12, 19, 3, 5], //, 2, 3],
                          backgroundColor: this.estadoColor, //[
                        //   "#e3182b", //'rgba(255, 99, 132, 0.8)',
                        //      'rgba(54, 162, 235, 0.8)',
                        //      'rgba(255, 206, 86, 0.8)',
                        //      'rgba(75, 192, 192, 0.8)'/*,
                        //      'rgba(153, 102, 255, 0.2)',
                        //      'rgba(255, 159, 64, 0.2)'*/
                        //  ],
                          hoverBackgroundColor: this.estadoColorHover//[
                        //      "#FF6384",
                        //      "#36A2EB",
                        //      "#FFCE56",
                        //      "#4BC0C0"
                        //      //"#FF6384",
                        //      //"#36A2EB",
                        //      //"#FFCE56"
                        //  ]
                     }]
                 },
                 options: {
                   responsive:true
                 }
      
             });
  }

  ColorLuminance(hex, lum) {
    
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      }
      lum = lum || 0;
    
      // convert to decimal and change luminosity
      var rgb = "#", c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
      }
    
      return rgb;
    }
  }
