import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public email;
  public password;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, private storage: Storage) {
    
  }

  public login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(val => {
      if(val){
        this.storage.set('uid', val.uid);
        this.navCtrl.setRoot(HomePage);
      }
      
    });
  }

}
