import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
  public topPlayers;
  public myNom;

  constructor(public navCtrl: NavController, public db: AngularFirestore, public navParams: NavParams) {
    this.myNom = navParams.get('nom');
    console.log("ola");
    console.log(this.myNom);
    db.collection('usuaris', ref => ref.limit(10)).valueChanges().subscribe(val => {
      this.topPlayers = val.sort(this.ordenarPasses);
      console.log(this.topPlayers)
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
