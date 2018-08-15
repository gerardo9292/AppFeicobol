import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  key: any;
  userId: any;
  pedidosList: any = [];
  constructor(public navCtrl: NavController, public rest: RestProvider) {
    localStorage.getItem('token');
    localStorage.getItem('usuario_id');
    this.getPedidosUser();
  }
  ionViewWillEnter(){
    this.getPedidosUser();
  }
  getPedidosUser() {
    this.key = localStorage.getItem('token');
    this.userId = localStorage.getItem('usuario_id');
    this.rest.pedidosUser(this.userId, this.key).then((data) => {
      this.pedidosList = data;
      console.log(this.pedidosList);
    },
      err => console.log("Error de conexión"));
  }

}
