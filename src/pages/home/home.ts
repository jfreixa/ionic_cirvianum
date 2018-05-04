import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public topPlayers: any;
  
  constructor(public navCtrl: NavController, public db: AngularFirestore) {

    db.collection('usuaris').valueChanges().subscribe(val => {
      this.topPlayers = val.sort(this.ordenarPasses);
      console.log(val);
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
