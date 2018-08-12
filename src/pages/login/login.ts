import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  nameUser;
  pass;
  constructor(public alertCtrl: AlertController,   public rest: RestProvider, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
  	this.myForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  
  login(){
    this.nameUser = this.myForm.value.email;
    this.pass = this.myForm.value.password;
    this.rest.login(this.myForm.value.email, this.myForm.value.password).then((res)=>{              
      let dataUser:any;
      dataUser = res;
      localStorage.setItem('usuario_id', dataUser.usuario_id);
      localStorage.setItem('token', dataUser.token);
      localStorage.setItem('username', this.nameUser);
              this.showMessage();
            },(err)=>{
              this.showErrorMessage();
            });
  }
  showMessage() {
      let alert = this.alertCtrl.create({
        title: '<br><center>Succes</center></br>',
        subTitle: "<br><center>Bienvenido </br>" + this.nameUser + "<br> a Feicobol</center></br>.",
        buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(TabsPage);
}
showErrorMessage() {
      let alert = this.alertCtrl.create({
       title: '<br><center>Ops!</center></br>',
       subTitle: '<br><center>El usuario no existe, inténtelo otra vez</br></center>',
       buttons: ['OK']
      });
      alert.present();
  }

}
