import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonCol, IonText, IonImg, IonRow, IonInput, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
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


  constructor() { }

  ngOnInit() {
  }


  onSubmit(){
    const formValue = this.formGroup.value

    console.log(formValue)
  }

}
