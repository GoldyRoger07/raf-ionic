import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonCol, IonText, IonImg, IonRow, IonInput, IonButton, IonSpinner, IonToast, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import {closeCircleSharp,closeCircleOutline, closeSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [IonIcon, IonToast,
        IonSpinner,
        IonButton,
        IonInput,
        IonRow,
        IonImg,
        IonCol,
        IonGrid,
        IonText,
        IonContent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ]
})
export class LoginPage implements OnInit {

  formGroup = new FormGroup({
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required) 
  })

  isLoading = true


  constructor() {
    addIcons({closeSharp,closeCircleOutline});
   }

  ngOnInit() {
  }


  onSubmit(){
    const formValue = this.formGroup.value

    console.log(formValue)
  }

}
