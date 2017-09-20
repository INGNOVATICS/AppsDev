import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController, NavController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

interface usuario{
  userName: string,
  key: string
}

@Injectable()
export class UsuarioProvider {

   idUsuario: string;
   token:string;
   fbLogin:string;
   fbPass:string;
   idDependencia:string;
   
   public jsonUser: any = {};

  urlLogin = 'http://192.99.14.27:8089/santamarta/sigob/usuarios/login';
  domain:string = '@sigobsmr.gov.co';

  constructor(public http: Http, 
              public alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage,
              private afAuth:AngularFireAuth
              ) {
    //cargar desde el storage los datos del usuario
    console.log('Hello UsuarioProvider Provider');
  }

  doLogin(userName:string, key:string){
    // console.log(userName+" - "+key);
    this.jsonUser.userName = userName;
    this.jsonUser.key = key;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.urlLogin, JSON.stringify(this.jsonUser),{headers:headers})
                    .map(response =>{
                      let userData = response.json();
                      // console.log(userData);
                      if (userData.error){
                        this.alertCtrl.create({
                          title: "Error en Login",
                          subTitle: userData.mensaje,
                          buttons: ["Aceptar"]
                        }).present();
                      }else{
                        this.token = userData.token;
                        this.idUsuario = userData.idUsuario; 
                        this.idDependencia = userData.idDependencia;                        
                        //Guardar en Storage
                        this.guardarEnStorage();
                      }
                    })


  }

  doLogout(){
    this.token = null;
    this.idUsuario = null;
    this.fbLogin = null;
    this.fbPass = null;
    this.idDependencia = null;
    this.afAuth.auth.signOut();

    //Guardar en Storage
    this.guardarEnStorage();
    
  }

  private guardarEnStorage(){
    if (this.platform.is("cordova")){
      this.storage.set('token',this.token);
      this.storage.set('userId', this.idUsuario);
      this.storage.set('fbLogin', this.jsonUser.userName+this.domain);
      this.storage.set('fbPass', this.jsonUser.userName);
      this.storage.set('idDependencia', this.idDependencia);      
    }else{
      if( this.token ){
      localStorage.setItem("token", this.token);
      localStorage.setItem("userId", this.idUsuario);
      localStorage.setItem("fbLogin", this.jsonUser.userName+this.domain);
      localStorage.setItem("fbPass", this.jsonUser.userName);
      localStorage.setItem("idDependencia", this.idDependencia);
      }else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("fbLogin");
        localStorage.removeItem("fbPass");
        localStorage.removeItem("idDependencia");
      }
    }
    // this.setupFirebase();
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

                                  })

                      this.storage.get("fbLogin")
                                  .then(fbLogin => {
                                    if(fbLogin){ this.fbLogin = fbLogin}

                                  })

                      this.storage.get("idDependencia")
                                  .then(idDependencia => {
                                    if(idDependencia){ this.idDependencia = idDependencia}

                                  })                                  

                      this.storage.get("fbPass")
                                  .then(fbPass => {
                                    if(fbPass){ this.fbPass = fbPass}

                                     resolve();
                                  })                                  
                    })
      }else {

        if (localStorage.getItem("token")){
          this.token = localStorage.getItem("token");
          this.idUsuario = localStorage.getItem("userId");
          this.fbLogin = localStorage.getItem("fbLogin");
          this.fbPass = localStorage.getItem("fbPass");
          this.idDependencia = localStorage.getItem("idDependencia");
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

  // async setupFirebase(){
  //   // if (this.afAuth.app.)
  //   try{
  //     const result1 = await this.afAuth.auth.createUserWithEmailAndPassword(this.fbLogin, this.fbPass);
  //     console.log(result1);
  //     // const result2 = await this.afAuth.auth.signInWithEmailAndPassword(this.fbLogin, this.fbPass);
  //     // console.log(result2);
  //   }catch{
  //     console.log(Error);

  //   }
  // }

}
