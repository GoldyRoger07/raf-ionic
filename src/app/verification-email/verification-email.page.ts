import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonButton, IonSpinner, IonText } from '@ionic/angular/standalone';


@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.page.html',
  styleUrls: ['./verification-email.page.scss'],
  standalone: true,
  imports: [IonText, IonSpinner, IonButton, IonImg, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,NgOtpInputModule]
})
export class VerificationEmailPage implements OnInit {

  otpInputConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: "my-otp-input",
  }

  isLoading = false

  constructor() { }

  ngOnInit() {
  }

}
