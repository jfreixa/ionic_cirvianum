import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireModule } from "angularfire2";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { AngularFirestore } from "angularfire2/firestore";
import { LoginPage } from "../pages/login/login";
import { LeaderboardPage } from "../pages/leaderboard/leaderboard";
import { AngularFireAuth } from "angularfire2/auth";
import { IonicStorageModule } from "@ionic/storage";
import { Storage } from "@ionic/storage";
import { Pedometer } from "@ionic-native/pedometer";

var config = {
  apiKey: "AIzaSyBmkL-0QrpsmMf6pIKpNxyjrpBvYreDELg",
  authDomain: "ioniccirvianum.firebaseapp.com",
  databaseURL: "https://ioniccirvianum.firebaseio.com",
  projectId: "ioniccirvianum",
  storageBucket: "",
  messagingSenderId: "1000059520478"
};

@NgModule({
  declarations: [MyApp, HomePage, LoginPage, LeaderboardPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, LoginPage, LeaderboardPage],
  providers: [
    StatusBar,
    AngularFirestore,
    AngularFireAuth,
    SplashScreen,
    Pedometer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
