import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, db: AngularFirestore, private storage: Storage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    /*
    const settings: firebase.firestore.Settings = { timestampsInSnapshots: true };
    db.app.firestore().settings(settings);
    */

    this.storage.get('uid').then(val => {
      if (val) this.rootPage = HomePage;
    })
  }

}