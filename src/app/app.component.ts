import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      localStorage.getItem('usuario_id');
      if (localStorage.getItem('usuario_id') == null) {
        this.nav.setRoot(LoginPage);
      }
      else {
        this.nav.setRoot(TabsPage);
      }



      /*this.store.get('username').then((val) => {
        });*/

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
}
