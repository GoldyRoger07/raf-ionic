import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { IonContent,IonToast, IonGrid, IonRow, IonCol, IonImg, IonText,IonProgressBar } from '@ionic/angular/standalone';
import { TimerComponent } from "../home/timer/timer.component";
import { CompteService } from '../services/compte.service';
import { closeSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';


@Component({
    selector: 'app-verification-email',
    templateUrl: './verification-email.page.html',
    styleUrls: ['./verification-email.page.scss'],
    imports: [IonProgressBar,IonToast,ReactiveFormsModule,IonText, IonImg, IonCol, IonRow, IonGrid, IonContent, CommonModule, FormsModule, NgOtpInputModule, TimerComponent]
})
export class VerificationEmailPage implements AfterViewInit {

  otpInputConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: "my-otp-input",
  }

  isToastOpen = false
  toastMessage = ""

  @ViewChild("otpInput")
  otpInput! : NgOtpInputComponent

  codeVerification = new FormControl()

  isTimerRunning = true

  isLoading = false

  @ViewChild("timer")
   timer!: TimerComponent

  constructor(private compteService:CompteService,private router:Router) { 
    addIcons({closeSharp}); 
    this.codeVerification.valueChanges.subscribe((value:string)=>{
      if(value!==null && value.length === 6){
        this.isLoading = true
        this.compteService.verifierCode(value).subscribe({
          next:(response)=>{
            this.isLoading = false
            this.otpInput.setValue(null)
            this.router.navigate(["/inscription/create-password"])
          },
          error: (response)=>{
            this.isLoading = false
            this.otpInput.setValue(null)
            try{
              this.toastMessage = response.error.message.contenu
              this.isToastOpen = true
              setTimeout(()=>{ 
                this.isToastOpen = false
                if(response.error.message.codeError === 1)
                  this.router.navigate(["/inscription"])
              },5500)
            }catch(e){
              this.toastMessage = "Verifye koneksyon entenet ou an"
              this.isToastOpen = true
            }
            
            

            
          }
        })
        
      }
       
    })
  }

  ngAfterViewInit() {
      this.timer.startTimer() 
  }

  onTimerFinished(){
    this.isTimerRunning = false
  }

  onClickResendCode(){
    this.compteService.resendCodeVerification()
    this.isTimerRunning = true
    setTimeout(()=>this.timer.startTimer(),100)
    
  }

}
