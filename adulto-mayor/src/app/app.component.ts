import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private http: Http ) { }

  title = 'Secretaría de Promoción Social, Inclusión y Equidad';
  subtitle = 'Programa Adulto Mayor';
  cedula = '';
  datos: any = {};
  show = false;

  consultarEstado() {
    this.http.get('http://192.99.14.27:8089/santamarta/tramites/adultomayor/estado?cedula=' + this.cedula)
    .subscribe(
      (res: Response) => {
        this.datos = res.json();
        this.cedula = '';
        console.log(res.status);
        this.show = true;
      },
      error => {
        this.show = false;
        console.log('errorcito: ' + error.status);
      }
    );
  }
}
