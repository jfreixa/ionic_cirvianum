import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  public topPlayers;

  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    db.collection('usuaris', ref => ref.limit(10)).valueChanges().subscribe(val => {
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

}
