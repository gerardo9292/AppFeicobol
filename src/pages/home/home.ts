import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  categoriaList:any = [];
  categoria:string;
  constructor(public navCtrl: NavController, public rest: RestProvider) {
    this.getCategorias();
  }

  getCategorias(){
    this.rest.getCategorias().subscribe((data)=>{
      console.log(data);
      this.categoriaList = data;
    });
  }
}
