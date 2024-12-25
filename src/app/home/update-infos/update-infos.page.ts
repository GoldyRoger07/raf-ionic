import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonInput, IonButton, IonSpinner, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-update-infos',
  templateUrl: './update-infos.page.html',
  styleUrls: ['./update-infos.page.scss'],
  standalone: true,
  imports: [IonText, IonSpinner, IonButton, ReactiveFormsModule,IonInput, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class UpdateInfosPage implements OnInit {

  formGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    telephone: new FormControl(''),
    username: new FormControl('')
  })

  isLoading = false
  constructor() { }

  ngOnInit() {
  }

}
