import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { LeaderboardPage } from '../leaderboard/leaderboard';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public topPlayers: Array<object>;
  public usuari: any;
  public steps: any = 0;
  constructor(public navCtrl: NavController, public db: AngularFirestore, private storage: Storage, private pedometer: Pedometer) {
    this.storage.get('uid').then(key => {
      db.doc(`usuaris/${key}`).valueChanges().subscribe(val => {
        if (val) this.usuari = val;
      });
      pedometer.isStepCountingAvailable().then(val => {
        if (val) {
          pedometer.startPedometerUpdates()
            .subscribe((data: IPedometerData) => {
              db.doc(`usuaris/${key}`).update({passes: data.numberOfSteps});
            });
        }
      });
    });
    db.collection('usuaris', ref => ref.limit(3)).valueChanges().subscribe(val => {
      this.topPlayers = val.sort(this.ordenarPasses);
    });
  }

  private ordenarPasses(a, b) {
    if (a.passes < b.passes)
      return 1;
    if (a.passes > b.passes)
      return -1;
    return 0;
  }

  public logout() {
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

  public gotoRankings() {
    this.navCtrl.push(LeaderboardPage, { nom: this.usuari.nom });
  }
}
