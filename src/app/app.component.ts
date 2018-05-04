import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, db: AngularFirestore) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    /* tslint:disable */

    const settings: firebase.firestore.Settings = { timestampsInSnapshots: true };
    db.app.firestore().settings(settings);
  }
  /* tslint:enable */
}