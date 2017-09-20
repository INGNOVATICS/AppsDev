export class MetaModel {

    idDependencia: string;
    nombreDependencia: string;
    jefeDependencia: string;
    idMeta: number;
    tituloMeta: string;
    descripcionMeta: string;
    fechaInicioMeta: string;
    fechaFinMeta: string;
    idEstadoMeta: number;
    descEstadoMeta: string;
    iconoEstadoMeta: string;
    colorEstadoMeta: string;
    idIndicador: number;
    nombreIndicador: string;
    avanceIndicador: number;
    metaIndicador: number;
    estadoIndicador: string;
    iconoEstadoIndicador: string;
    colorEstadoIndicador: string;
    idCoordinador: string;
    nombreCoordinador: string;
    
    

    constructor( meta:any, idDep:string, nomDep: string, nomJefe:string ) {

         this.idDependencia = idDep;
         this.nombreDependencia = nomDep;
         this.jefeDependencia = nomJefe;
         this.idMeta = meta.idMeta;
         this.tituloMeta = meta.tituloMeta;
         this.descripcionMeta = meta.descEstadoMeta;
         this.fechaInicioMeta = meta.fechaInicioMeta;
         this.fechaFinMeta = meta.fechaFinMeta;
         this.idEstadoMeta = meta.idEstadoMeta;
         this.descEstadoMeta = meta.descEstadoMeta;
         this.idIndicador = meta.idIndicador;
         this.nombreIndicador = meta.nombreIndicador;
         this.avanceIndicador = meta.avanceIndicador;
         this.metaIndicador = meta.metaIndicador;
         this.estadoIndicador = meta.estadoIndicador;
         this.idCoordinador = meta.idCoordinador;
         this.nombreCoordinador = meta.nombreCoordinador;

         this.estiloEstados(meta);
    }

    estiloEstados(meta){

        switch( meta.colorEstadoMeta ){
            case 0 : {
                this.colorEstadoMeta = 'primary';
                this.iconoEstadoMeta = 'trophy';
                break;
            }
            case 255 : {
                this.colorEstadoMeta = 'danger';
                this.iconoEstadoMeta = 'alert'; 
                break;               
            }
            case 65535 : {
                this.colorEstadoMeta = 'warning';
                this.iconoEstadoMeta = 'warning';
                break;                
            }
            case 65280 : {
                this.colorEstadoMeta = 'secondary';
                this.iconoEstadoMeta = 'checkmark-circle';
                break;                
            }

        }

        switch ( meta.idEstadoIndicador ){
            case 0 : {
                this.colorEstadoIndicador = 'secondary';
                this.iconoEstadoIndicador = 'checkmark-circle';
                break;
            }
            case 1 : {
                this.colorEstadoIndicador = 'warning';
                this.iconoEstadoIndicador = 'warning';
                break;
            }
            case 2 : {
                this.colorEstadoIndicador = 'danger';
                this.iconoEstadoIndicador = 'remove-circle';
                break;
            }
            case 3 : {
                this.colorEstadoIndicador = 'nodata';
                this.iconoEstadoIndicador = 'help-circle';
                break;
            }
            case 4 : {
                this.colorEstadoIndicador = 'waitclose';
                this.iconoEstadoIndicador = 'timer';
                break;
            }
            case 5 : {
                this.colorEstadoIndicador = 'waitdata';
                this.iconoEstadoIndicador = 'timer';
                break;
            }
        }
    }


}