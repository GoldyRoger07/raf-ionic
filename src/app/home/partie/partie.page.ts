import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'app-partie',
  templateUrl: './partie.page.html',
  styleUrls: ['./partie.page.scss'],
  standalone: true,
  imports: [IonAlert, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PartiePage implements OnInit {

  isAlertOpen = false

  alertButtons = [
    {
      text: "Akey",
      role: "cancel",
      handler: ()=>{
        console.log("Alert canceled")
      }
    },{
      text: "Jwe on lot pati",
      role: "confirm",
      handler: ()=>{
        console.log("alert confirmed")
      }
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  setOpen(value: boolean){
    this.isAlertOpen = value
  }

  setResult(ev: any){
    console.log(`Dismissed with role: ${ev.detail.role}`)
  }

}
