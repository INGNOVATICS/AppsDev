import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  encuestaSatisfaccion; FormGroup;
  intentoEnvio: boolean = false;


  constructor(public formBuilder: FormBuilder) {
    this.encuestaSatisfaccion = formBuilder.group({
      poblacion: ['', Validators.required],
      tiempoAtencion: ['', Validators.required],
      escucharonInquietud: ['', Validators.required],
      solucionInquietud: ['', Validators.required],
      nombre: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(10), Validators.minLength(7), Validators.pattern('[0-9 ]*'), Validators.required])]
    })
  }

  save(){
    this.intentoEnvio = true;
    if(!this.encuestaSatisfaccion.valid)
      console.log("error");
    else 
      console.log(this.encuestaSatisfaccion.value);
      

  }

}
