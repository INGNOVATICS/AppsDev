import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { App, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {
  newDependencia: string = '';
  constructor(private usrSvc: UsuarioProvider, private app: App, 
              private viewCtrl: ViewController, private loadingCtrl: LoadingController) {
    //  this.newDependencia = this.usrSvc.idDependencia;
     this.cargaOtrasDependencias();    
  }

  salir(){
    this.usrSvc.doLogout();
    this.viewCtrl.dismiss();
    this.app.getRootNav().setRoot(LoginPage);
    
  }

  cambiarDependencia(){
    this.usrSvc.cambiarDependencia(this.newDependencia);
    this.viewCtrl.dismiss( true );
  }

  cargaOtrasDependencias(){
    
    let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loader.present();
  
    this.usrSvc.getOtrasDependencias()
          .then( (resp) => {
            loader.dismiss();
            console.log(this.usrSvc.otrasDependencias);
          })
          .catch(() => loader.dismiss() )
  
  }

}
