import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonGrid, IonRow, IonToast, IonCol, IonButton, IonSpinner, IonText, IonImg } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CompteService } from '../services/compte.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeSharp, checkmarkSharp } from 'ionicons/icons';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [IonInput,IonImg, ReactiveFormsModule,IonText, IonSpinner, IonButton, IonCol, IonToast, IonRow, IonGrid, IonContent, CommonModule, FormsModule]
})
export class ForgetPasswordPage implements OnInit {

  isLoading = false
  
  isToastOpen = false
  
  toastMessage = ""
  
  colorToast = ""
  
  iconToast = ""
  
  subscription = new Subscription()

  emailErrorText = ""

  formGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })


  constructor(private compteService:CompteService,private router:Router) { 
    addIcons({closeSharp,checkmarkSharp})

    this.formGroup.valueChanges.subscribe(()=>{
      if(this.formGroup.invalid && (this.formGroup.touched || this.formGroup.dirty)){
        if(this.formGroup.controls.email.hasError("required"))
              this.emailErrorText = "Imel lan paka rete vid"

        if(this.formGroup.controls.email.hasError("email"))
              this.emailErrorText = "Imel sa pa valid"
        
      }
    })
  }

  onSubmit(){
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
      this.isLoading = true
      const email = this.formGroup.value.email

      this.subscription.add(
        this.compteService.forgetPassword(email as string).subscribe({
            next:()=>{
              this.isLoading = false
              this.formGroup.reset()
              this.router.navigate(["/inscription/verification-email"])
              localStorage.setItem("email",email as string)
              localStorage.setItem("context","changerPassword")
            },
            error:(response)=>{
              this.isLoading = false
              try {
               
                  this.showToast(response.error.message.contenu,response.error.message.type)
              
              } catch (e) {
                this.showToast("Verifye koneksyon entenet ou an","error")
              }
            }
        })
      )
    }
  }

  ngOnInit() {
  }

  showToast(message:string,type:string,callback?:any){
    
    this.toastMessage = message
    this.isToastOpen = true

    setTimeout(()=>{ 
      this.closeToast()
      if(callback)
        callback()
    },5500)
  }

  closeToast(){
    this.isToastOpen = false
  }

}
