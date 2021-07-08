import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titulo = 'Listado de Personas';

  constructor(){}
  ngOnInit(): void {
    firebase.default.initializeApp({
      apiKey: "AIzaSyDI3yJmikScVJkfjZtCCic2ROOJ0RnV30Y",
      authDomain: "angular-8d501.firebaseapp.com",
    })
  }
}
