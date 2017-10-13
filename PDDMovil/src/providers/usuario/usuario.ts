import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController, NavController, Platform, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Network } from '@ionic-native/network';

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
   emailUsuario: string;
   nombreUsuario: string;
   otrasDependencias: any = [];
   
   public jsonUser: any = {};

  private urlLogin: string = 'http://192.99.14.27:8089/santamarta/sigob/usuarios/login';
  private urlOtrasDependencias: string = "http://192.99.14.27:8089/santamarta/sigob/usuarios/seguimiento/";
  domain:string = '@sigobsmr.gov.co';

  constructor(public http: Http, 
              public alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage,
              private afAuth:AngularFireAuth,
              private toastCtrl: ToastController,
              private network: Network
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
    // headers.append('access-control-allow-origin','*');
    if (this.network.type !=='none'){
      console.log(this.network.type);
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
                        this.idDependencia = userData.idDependencia; 
                        this.fbLogin = this.jsonUser.userName+this.domain;
                        this.fbPass = this.jsonUser.userName; 
                        this.emailUsuario = userData.email;
                        this.nombreUsuario = userData.funcionario;                      
                        //Guardar en Storage
                        this.guardarEnStorage();
                      }
                    })
                  } else {
                    console.log(this.network.type);
                    let toast = this.toastCtrl.create({
                      message: 'Sin conexión a Internet',
                      duration: 3000,
                      position: 'middle'
                    }).present();
                  }


  }

   async doLoginFirebase(){
     try {
       const result = await this.afAuth.auth.signInWithEmailAndPassword(this.fbLogin, this.fbPass);
       console.log(result);
     }
     catch(e){
       console.log("se produjo un error");
       console.error(e);
     }

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
      this.storage.set('fbLogin', this.fbLogin);
      this.storage.set('fbPass', this.fbPass);
      this.storage.set('idDependencia', this.idDependencia);  
      this.storage.set('email', this.emailUsuario);
      this.storage.set('userName', this.nombreUsuario);    
    }else{
      if( this.token ){
      localStorage.setItem("token", this.token);
      localStorage.setItem("userId", this.idUsuario);
      localStorage.setItem("fbLogin", this.fbLogin);
      localStorage.setItem("fbPass", this.fbPass);
      localStorage.setItem("idDependencia", this.idDependencia);
      localStorage.setItem("email", this.emailUsuario);
      localStorage.setItem("userName", this.nombreUsuario);
      }else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("fbLogin");
        localStorage.removeItem("fbPass");
        localStorage.removeItem("idDependencia");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
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

                                  })

                      this.storage.get("email")
                                  .then(email => {
                                    if(email){ this.emailUsuario = email}

                                  })
                      
                      this.storage.get("userName")
                                    .then(userName => {
                                      if(userName){ this.nombreUsuario = userName}

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
          this.emailUsuario = localStorage.getItem("email");
          this.nombreUsuario = localStorage.getItem("userName");
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

  cambiarDependencia(idNuevaDependencia: string){
    this.idDependencia = idNuevaDependencia;
    if (this.platform.is("cordova")){
      this.storage.set('idDependencia', this.idDependencia);      
    }else{
      if( this.token ){
      localStorage.setItem("idDependencia", this.idDependencia);
      }else {
        localStorage.removeItem("idDependencia");
      }
    }

  }

  getOtrasDependencias(){
    this.otrasDependencias = [];
    let promiseOtrasDependencias = new Promise((resolve, reject) => {

      return this.http.get(this.urlOtrasDependencias+this.idUsuario)
      .map( res => res.json() )
      .subscribe( data => {
        console.log(data.dependencias);
      if(data.dependencias instanceof Array){
        this.otrasDependencias = data.dependencias.slice();
        console.log("Array");
        console.log(this.otrasDependencias);
      }
      else {
        this.otrasDependencias[0] = data.dependencias;
        console.log("no Array");
      }
      
      resolve();
      },
    err => {
      reject();
      let toast = this.toastCtrl.create({
        message: 'Error cargando dependencias.',
        duration: 3000,
        position: 'middle'
      }).present();

      });

    });
    return promiseOtrasDependencias;    
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
