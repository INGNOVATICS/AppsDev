import { MensajesPage } from './../pages/mensajes/mensajes';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
//Paginas
import { ResumenPage } from '../pages/resumen/resumen';
import { ListadoPage } from '../pages/metas/listado/listado';
import { DetallePage } from '../pages/metas/detalle/detalle';
import { AlertasPage } from '../pages/alertas/alertas';
import {TendenciaPage} from '../pages/metas/detalle/detalle-indicador/tendencia/tendencia';
import { CalendarioPage } from '../pages/metas/detalle/calendario-eventos/calendario/calendario';
import { LoginPage } from '../pages/login/login';
import { ConsultaPage } from '../pages/metas/detalle/consulta/consulta';
import { ConfiguracionPage } from '../pages/configuracion/configuracion'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Plugins
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
//Servicios
import { MetaProvider } from '../providers/meta/meta';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { MessageProvider } from '../providers/message/message';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResumenPage,
    ListadoPage,
    DetallePage,
    AlertasPage,
    TendenciaPage,
    CalendarioPage,
    LoginPage,
    ConsultaPage,
    ConfiguracionPage,
    MensajesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { backButtonText: 'Volver' }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResumenPage,
    ListadoPage,
    DetallePage,
    AlertasPage,
    TendenciaPage,
    CalendarioPage,
    LoginPage,
    ConsultaPage,
    ConfiguracionPage,
    MensajesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MetaProvider,
    UsuarioProvider,
    Network,
    MessageProvider
  ]
})
export class AppModule {}
