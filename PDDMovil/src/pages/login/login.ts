import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userName:string = "";
  userKey:string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private usrSvc: UsuarioProvider,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    this.usrSvc.cargarDelStorage()
               .then( () => {
                  if(this.usrSvc.isLogged()){
                    console.log("usuario registrado: " + this.usrSvc.idUsuario);
                    this.navCtrl.setRoot(HomePage);
                  }     
  })
 
  }

  getUserInfo(){
    
    let loader = this.loadingCtrl.create({
      content: "Cargando datos"
      //duration: 3000
    });
    loader.present();

    this.usrSvc.doLogin(this.userName, this.userKey)
    .subscribe(userData => {
      if (this.usrSvc.isLogged()){

        console.log(this.usrSvc.fbLogin);

        this.usrSvc.doLoginFirebase();
        
        this.navCtrl.setRoot(HomePage);
      }
      loader.dismiss();
    },
    err =>{
      loader.dismiss();
      let toast = this.toastCtrl.create({
        message: 'No fue posible la conexión. Verifique su acceso a Internet',
        duration: 3000,
        position: 'middle'
      }).present();
    }
  )
  }

}
