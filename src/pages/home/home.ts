import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { LeaderboardPage } from '../leaderboard/leaderboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public topPlayers: Array<object>;
  public usuari: any;

  constructor(public navCtrl: NavController, public db: AngularFirestore, private storage: Storage) {
    this.storage.get('uid').then(key => {
      db.doc(`usuaris/${key}`).valueChanges().subscribe(val => {
        if (val) this.usuari = val;
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

  public gotoRankings(){
    this.navCtrl.push(LeaderboardPage, {nom: this.usuari.nom});
  }
}
