import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol, IonRow, IonGrid, IonAvatar, IonImg, IonList, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, listOutline, lockClosedOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-compte-profile',
    templateUrl: './compte-profile.page.html',
    styleUrls: ['./compte-profile.page.scss'],
    imports: [RouterLink, IonLabel, IonIcon, IonItem, IonList, IonImg, IonAvatar, IonGrid, IonRow, IonCol, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CompteProfilePage implements OnInit {

  constructor() {
    addIcons({createOutline,lockClosedOutline,listOutline});
  }

  ngOnInit() {
  }

}
