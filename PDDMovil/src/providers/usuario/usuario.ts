import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController, NavController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

interface usuario{
  userName: string,
  key: string
}

@Injectable()
export class UsuarioProvider {

   idUsuario: string;
   token:string;
   public jsonUser: any = {};

  urlLogin = 'http://192.99.14.27:8089/santamarta/sigob/usuarios/login';

  constructor(public http: Http, 
              public alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage
              ) {
    //cargar desde el storage los datos del usuario
    console.log('Hello UsuarioProvider Provider');
  }

  doLogin(userName:string, key:string){
    console.log(userName+" - "+key);
    this.jsonUser.userName = userName;
    this.jsonUser.key = key;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.urlLogin, JSON.stringify(this.jsonUser),{headers:headers})
                    .map(response =>{
                      let userData = response.json();
                      console.log(userData);
                      if (userData.error){
                        this.alertCtrl.create({
                          title: "Error en Login",
                          subTitle: userData.mensaje,
                          buttons: ["Aceptar"]
                        }).present();
                      }else{
                        this.token = userData.token;
                        this.idUsuario = userData.idUsuario;
                        //Guardar en Storage
                        this.guardarEnStorage();
                      }
                    })


  }

  doLogout(){
    this.token = null;
    this.idUsuario = null;

    //Guardar en Storage
    this.guardarEnStorage();
    
  }

  private guardarEnStorage(){
    if (this.platform.is("cordova")){
      this.storage.set('token',this.token);
      this.storage.set('userId', this.idUsuario);            
    }else{
      if( this.token ){
      localStorage.setItem("token", this.token);
      localStorage.setItem("userId", this.idUsuario);
      }else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    }
  }

  public cargarDelStorage(){
    let promesa = new Promise(( resolve, reject ) => {
      if(this.platform.is("cordova")) {
        this.storage.ready()
                    .then(() => {
                      this.storage.get("token")
                                  .then(token => {
                                    if(token){ this.token = token}
                                  })

                      this.storage.get("userId")
                                  .then(userId => {
                                    if(userId){ this.idUsuario = userId}

                                    resolve();
                                  })
                    })
      }else {

        if (localStorage.getItem("token")){
          this.token = localStorage.getItem("token");
          this.idUsuario = localStorage.getItem("userId");
        }
        resolve();
      }
    });
    return promesa;
  }

  isLogged(){
    if ( this.token ){
      return true;
    }else{
      return false;
    }
  }

}
