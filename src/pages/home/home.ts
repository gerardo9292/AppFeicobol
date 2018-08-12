import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,  App, ViewController  } from 'ionic-angular';
// import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { RestProvider } from '../../providers/rest/rest';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  categoriaList:any = [];
  categoria:string;
  data: any;
  almacenList: any = [];
  almacen: string;

  productoList: any = [];
  producto: string;

  tipoEmpaqueList: any = [];
  tipoEmpaque: string;

  description: any;
  cantidad: any;
  key: any ;
  usuario: any;
  estado= "Pedido";
  date : any;
  today_date: any;
  hour: any;
  constructor(public viewCtrl: ViewController,public appCtrl: App, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public rest: RestProvider) {
    this.getAlmacenes();
    this.getCategorias();
   localStorage.getItem('token');
   localStorage.getItem('usuario_id');

  }

  getAlmacenes(){
    this.key = localStorage.getItem('token');
    this.rest.getAlmacenes(this.key).then((data) => {
      this.almacenList = data;
    },
      err => console.log("Error de conexión"));
  }

  getCategorias() {
    this.key = localStorage.getItem('token');
        this.rest.getCategorias(this.key).then((data) => {
          this.categoriaList = data;
        },
          err => console.log("Error de conexión"));
    }
  

  getProductos(categoria, almacen) {
    this.key = localStorage.getItem('token');
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Cargando productos',
        duration: 3000
    });
    loading.present().then(() => {
    this.rest.getProductos(categoria, almacen, this.key).then((data) => {
      this.productoList = data;
      loading.dismiss();
      if (this.almacen == null || this.categoria == null){
        this.showAlert();
      }
    },
      err => this.showAlert()
    );
  });
  }
  
  sendParams(producto, p, cantidad, description){
    //dateTime
    this.date = new Date();
    //Get date Year-month-day
    this.today_date = moment().format('YYYY-MM-DD');
    // get Hour
    let hour = this.date.toTimeString();
    hour = hour.split(' ')[0];  
    this.hour = moment().format('h:mm:ss a');
    //get token localStorage
    this.key = localStorage.getItem('token');
    //get id_usuario localStorage
    this.usuario = localStorage.getItem('usuario_id');
    this.rest.sendParamsB(this.key, cantidad, p, description, this.estado, this.today_date, hour, this.usuario, producto).then((data) => {
      this.showMessage();
      },err => {
        let error = JSON.parse(err._body);
        this.showAlertError(error.messages);
      }
    );   
  } 

  showMessage() {
    let alert = this.alertCtrl.create({
      title: '<br><center>Exito</center></br>',
      subTitle: "<br><center>Se registro correctamente</center></br>.",
      buttons: ['OK']
    });
    alert.present();
    this.confirm();
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: '<center>Error</center>',
      subTitle: '<center>No se selecciono Almacen o Categoria</center>',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertError(mensaje) {
    const alert = this.alertCtrl.create({
      title: '<center>Error</center>',
      subTitle: '<center>'+mensaje+'</center>',
      buttons: ['OK']
    });
    alert.present();
  }
  confirm() {
    //window.location.reload();
    this.almacen="";
    this.categoria= "";
    this.producto="";
    this.tipoEmpaque="";
    this.cantidad="";
    this.description="";
  }
}
