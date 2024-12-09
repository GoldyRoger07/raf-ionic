import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonImg, IonText, IonInput, IonSpinner, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
  standalone: true,
  imports: [IonButton, IonSpinner, IonInput, 
    IonText,
    IonImg,
    IonRow, 
    IonCol, 
    IonGrid, 
    IonContent, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InscriptionPage implements OnInit {

  formGroup = new FormGroup({
    nom: new FormControl("",Validators.required),
    prenom: new FormControl("",Validators.required),
    telephone: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required)
  })

  isLoading = false

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    
  }

}
