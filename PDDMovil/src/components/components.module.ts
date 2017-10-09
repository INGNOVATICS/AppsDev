import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';


@NgModule ({

    declarations: [BarraNavegacionComponent],
    imports: [IonicModule],
    exports: [BarraNavegacionComponent]
})

export class ComponentsModule{
    
}