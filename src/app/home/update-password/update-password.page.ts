import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonButton, IonSpinner, IonText, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
  standalone: true,
  imports: [IonInput, IonText, IonSpinner, IonButton, ReactiveFormsModule,IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class UpdatePasswordPage implements OnInit {
  formGroup = new FormGroup({
    ancienPassword: new FormControl(""),
    nouveauPassword: new FormControl(""),
    confirmPassword: new FormControl("")
  })

  isLoading = false
  constructor() { }

  ngOnInit() {
  }

}
