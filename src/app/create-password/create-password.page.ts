import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent,IonToast, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonInput, IonButton, IonText, IonSpinner } from '@ionic/angular/standalone';
import { passwordMatchValidator } from '../validators/PasswordMatchValidator';
import { Compte } from '../models/Compte';
import { CompteService } from '../services/compte.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.page.html',
    styleUrls: ['./create-password.page.scss'],
    imports: [IonToast,ReactiveFormsModule,IonSpinner, IonText, IonButton, IonInput, IonImg, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CreatePasswordPage implements OnInit,OnDestroy {

  isLoading = false

  isToastOpen = false

  toastMessage = ""

  colorToast = ""

  iconToast = ""

  subscription = new Subscription()

  formGroup = new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern("^(?=\\S*[a-zA-Z])(?=\\S*[0-9])\\S*$")]),
    confirmPassword: new FormControl('',[Validators.required])
  },{
    validators: passwordMatchValidator('password', 'confirmPassword')
  })

  passwordErrorText = "Modpass lan paka rete vid"
  confirmPasswordErrorText = "Modpass konfimasyon an paka rete vid"

  constructor(private compteService:CompteService,private router:Router) { 
    addIcons({closeSharp,checkmarkSharp}) 
    this.formGroup.valueChanges.subscribe(()=>{
      if(this.formGroup.invalid && (this.formGroup.touched || this.formGroup.dirty) ){
          if(this.formGroup.controls.password.hasError("required"))
              this.passwordErrorText = "Modpass lan paka rete vid"

          if(this.formGroup.controls.confirmPassword.hasError("required"))
              this.confirmPasswordErrorText = "Modpass konfimasyon an paka rete vid"

          if(this.formGroup.controls.confirmPassword.hasError("passwordmismatch"))
            this.confirmPasswordErrorText = "Modpass yo pa dwe diferan"

          if(this.formGroup.controls.password.hasError("pattern"))
            this.passwordErrorText = "Modpass sa pa valid"

          if(this.formGroup.controls.password.hasError("minlength"))
            this.passwordErrorText = "Modpass lan dwe gen pou pi piti 8 karakte"
      }
    })
  }

  onSubmit(){
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
        this.isLoading = true
        const formValue = this.formGroup.value
        const compte = new Compte()
        compte.email = localStorage.getItem("email") as string
        compte.password = formValue.password as string
        this.subscription.add(this.compteService.inscriptionPartie2(compte).subscribe({next:(response:any)=>{
          this.isLoading = false
          this.showToast(response.message.contenu,response.message.type,()=>{
              this.formGroup.reset()
              this.router.navigate(["/login"])
              localStorage.removeItem("email")
          })
         
        },error:(response)=>{
          this.isLoading = false

          try{
              this.showToast(response.error.message.contenu,response.error.message.type,()=>{
                if(response.error.message.codeError === 1){
                  this.formGroup.reset()
                  this.router.navigate(["/inscription"])
                  
                }

                if(response.error.message.codeError === 2){
                  this.formGroup.reset()
                  this.router.navigate(["/inscription/verification-email"])
                  
                }
              })
             
          }catch(e){
            this.showToast("Verifye koneksyon entenet ou an","error")
          }
        }}))
    }
  }

  showToast(message:string,type:string,callback?:any){
    if(type === "success"){
      this.iconToast = "checkmark-sharp"
      this.colorToast = "success"
      
    }else{
      this.iconToast = "close-sharp"
      this.colorToast = "danger"
    }

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

  ngOnInit() {
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
