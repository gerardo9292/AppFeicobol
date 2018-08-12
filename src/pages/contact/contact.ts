import { Component } from '@angular/core';
import { NavController, App  } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user : any;
  constructor(public appCtrl: App, public navCtrl: NavController) {
    localStorage.getItem('username');
  }
  ionViewDidLoad() {
    this.user = localStorage.getItem('username');
  }
  deleteCache (){
    localStorage.clear()
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }

}
