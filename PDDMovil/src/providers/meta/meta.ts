import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { MetaModel } from '../../../src/app/models/meta_model';
import {UsuarioProvider} from '../usuario/usuario';

@Injectable()
export class MetaProvider {

  public estados: any[] = [];
  public dependencia: string; 
  public metasDependencia: MetaModel[] = [];
  public tituloMeta: string;
  public eventosMeta: any[] = [];
  public alertaEventos: any[] = [];
  public periodosIndicador: any[] = [];
  public tituloIndicador: string;
  public indicadorAcumula: string;
  public tendenciaIndicador: string;
  public periodicidadIndicador: string;
  public countAlertas: number = 0;
  private urlEstados: string = "http://192.99.14.27:8089/santamarta/sigob/metas/resumen/";
  private urlMetas: string = "http://192.99.14.27:8089/santamarta/sigob/metas/";
  private urlEventos: string = "http://192.99.14.27:8089/santamarta/sigob/eventos?idmeta=";
  private urlPeriodos: string = "http://192.99.14.27:8089/santamarta/sigob/indicadores/";
  private urlAlertas: string = "http://192.99.14.27:8089/santamarta/sigob/eventos/";


  constructor(public http: Http,
              private usrService: UsuarioProvider,
              private toastCtrl: ToastController) {

               // this.getEstadoMetasDependencia();
              }

  public getEstadoMetasDependencia(){

    let promiseEstados = new Promise( (resolve, reject) => {

    return this.http.get(this.urlEstados+this.usrService.idDependencia)
    .map( res => res.json () )
    .subscribe(data =>{
      console.log(data);
      if (data.error){ 
        /////////////////

      }else {
        this.estados = [];
        if( data.estadoMetas instanceof Array )
          this.estados = data.estadoMetas.slice();
        else
          this.estados[0] = data.estadoMetas;
        console.log(data);
      }
      resolve();
    },
    err =>{ reject();
      if (this.usrService.token){
      let toast = this.toastCtrl.create({
        message: 'No se encontraron metas para el usuario actual. Vaya a configuración y pruebe seleccionar una dependencia.',
        duration: 3000,
        position: 'middle'
      }).present();
    }
  }
  )
  });

  return promiseEstados;
    
  }

  public getMetasDependencia(){

    let promiseMetas = new Promise( (resolve, reject) => {

      return this.http.get( this.urlMetas+this.usrService.idDependencia )
      .map ( res => res.json() )
      .subscribe( data => {
        if ( data.error ){
          console.log("Errorrr")
        }else {
          this.dependencia = data.nombreDependencia;
          this.creaObjetos(data);
        }
        resolve();
      },
      err => reject())
    } );
    return promiseMetas;
  }

  getEventosMeta(idMeta: number){
      this.eventosMeta = [];
      let PromiseEventos = new Promise(( resolve, reject ) => {
      return this.http.get( this.urlEventos + idMeta )
      .map( res => res.json() )
      .subscribe( data => {
        if ( data.error ){
          //bbbbbbb
        }else {
          this.eventosMeta.push(data);
        }
        resolve();
      })
    });
    return PromiseEventos;
  }

  getAlertas(){
    
    this.alertaEventos = [];
    let promiseAlertas = new Promise((resolve, reject) => {
      console.log(this.urlAlertas+this.usrService.idDependencia);
      return this.http.get(this.urlAlertas+this.usrService.idDependencia)
      .map(res => res.json() )
      .subscribe ( data => {
        if( data.error ){
          //ffffffff
        }else{ //console.log(data.metas)
         // this.alertaEventos.push( ...data.metas );
         if ( !(data.metas instanceof Array) ){
          let alerta: any ={};
          alerta.idMeta = data.metas.idMeta;
          alerta.tituloMeta = data.metas.tituloMeta;
          if ( data.metas.eventos instanceof Array )
            alerta.eventos = data.metas.eventos.slice();
          else
            alerta.eventos[0] = data.metas.eventos;

          this.alertaEventos[0] = alerta;
            
         }else {

         let i: number = 0;
         this.alertaEventos = [];
         for (let meta of data.metas ){
          console.log("debo entrar aqui");
          let alerta: any ={};
     
           alerta.idMeta = meta.idMeta;
           alerta.tituloMeta = meta.tituloMeta;
     
           // console.log(i +" "+meta.idMeta+" "+this.alerta.idMeta+" "+this.alerta.tituloMeta);
           alerta.eventos = [];
           if (meta.eventos instanceof Array) { 
             alerta.eventos = meta.eventos.slice(); //se asigna el arreglo completo
             console.log("es array");
             console.log(alerta.eventos);
           }
           else {
             alerta.eventos[0] = meta.eventos; //es un solo objeto, se guarda en la posición 0
             console.log("No es array");
             console.log(alerta.eventos);
           }
     
           // console.log(this.alerta);
     
           this.alertaEventos[i] = alerta; //se guarda el objeto en el array de alertas
           i++;
            //console.log(this.alertas);
         }
        }
         //console.log(this.alertas)
         console.log(this.alertaEventos);
        }
        this.countAlertas = this.alertaEventos.length;
        resolve();
      }, err => this.countAlertas = 0)
    });
    return promiseAlertas;
  }

  getPeriodosIndicador(idIndicador: number){
    console.log("indicador: " + idIndicador);
    this.periodosIndicador = [];
    let promisePeriodos = new Promise((resolve, reject) => {
      return this.http.get(this.urlPeriodos + idIndicador)
      .map( res => res.json() )
      .subscribe( data => {
        if ( data.error ){
          //ccccccccccc
        }else {
          this.tituloIndicador = data.tituloIndicador;
          this.indicadorAcumula = data.acumula;
          this.tendenciaIndicador = data.tendenciaIndicador;
          this.periodicidadIndicador = data.periodicidadIndicador;
          this.periodosIndicador.push(...data.periodosIndicador);
          //console.log(this.periodosIndicador);
        }
        resolve();
      })
    });
    console.log("123");
    return promisePeriodos;
  }
  

  creaObjetos(data){
      let i = 0;
      for (let meta of data.metas){
        //let objeto = new MetaModel();
        this.metasDependencia[i] = new MetaModel(meta, data.idDependencia, data.nombreDependencia, data.jefeDependencia);
        i++;
      }
    }
}

