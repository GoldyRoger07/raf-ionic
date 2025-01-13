import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonToast, IonButton, IonText, IonSpinner, IonCol, IonRow, IonGrid, IonImg } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from '../validators/PasswordMatchValidator';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeSharp, checkmarkSharp } from 'ionicons/icons';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-changer-password',
  templateUrl: './changer-password.page.html',
  styleUrls: ['./changer-password.page.scss'],
  standalone: true,
  imports: [IonImg, IonInput,ReactiveFormsModule,IonGrid, IonRow, IonCol, IonSpinner, IonText, IonButton, ReactiveFormsModule,IonContent, CommonModule, FormsModule]
})
export class ChangerPasswordPage implements OnInit {


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
            const formValue = {
              password: this.formGroup.value.password,
              email: localStorage.getItem("email")
            }
            
            localStorage.removeItem("context")
            this.subscription.add(this.compteService.forgetPassword2(formValue).subscribe({next:(response:any)=>{
              this.isLoading = false
              this.formGroup.reset()
              this.router.navigate(["/login"])
              localStorage.removeItem("email")
             
            },error:(response)=>{
              this.isLoading = false
    
              try{
                  
              }catch(e){
                this.showToast("Verifye koneksyon entenet ou an","error")
              }
            }}))
        }
      }


  ngOnInit() {
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

}
