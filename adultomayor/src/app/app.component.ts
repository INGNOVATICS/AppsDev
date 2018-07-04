import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) { }

  title = 'Adulto Mayor - Programa Colombia Mayor';
  cedula = '';
  exito = false;
  datos: any = {};
  serviceUrl = 'http://192.99.14.27:8089/santamarta/tramites/adultomayor/estado?cedula=';

  longitudCedula() {
    if (this.cedula.length < 4) { return false; } else { return true; }
  }

  consultarEstado() {
    this.http.get(this.serviceUrl + this.cedula)
    .subscribe(
      (res: Response) => {
        this.datos = res.json();
        console.log(this.datos);
        this.exito = true;
        this.cedula = '';
      },
      error => {
        console.log('Status: ' + error.status);
        this.exito = false;
      }
    );
  }
}
