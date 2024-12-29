import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonButton, IonSpinner, IonText, IonInput, IonToast } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { passwordMatchValidator } from 'src/app/validators/PasswordMatchValidator';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.page.html',
    styleUrls: ['./update-password.page.scss'],
    standalone: true,
    imports: [IonToast, IonInput, IonText, IonSpinner, IonButton, ReactiveFormsModule, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class UpdatePasswordPage implements OnInit,OnDestroy {
  formGroup = new FormGroup({
    ancienPassword: new FormControl("",[Validators.required]),
    nouveauPassword: new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern("^(?=\\S*[a-zA-Z])(?=\\S*[0-9])\\S*$")]),
    confirmPassword: new FormControl("",[Validators.required])
  },{
      validators: passwordMatchValidator('nouveauPassword', 'confirmPassword')
  })

  nouveauPasswordErrorText = "Novo modpass la paka rete vid"
  confirmPasswordErrorText = "Modpass konfimasyon an paka rete vid"

  isLoading = false

  toastColor = ""
  isToastOpen = false
  toastMessage = ""
  toastIcon = ""

  subscription = new Subscription()

  constructor(private compteService:CompteService,private router:Router) {
     addIcons({checkmarkSharp,closeSharp})
    this.subscription.add( 
      this.formGroup.valueChanges.subscribe(()=>{
          if(this.formGroup.invalid && (this.formGroup.touched || this.formGroup.dirty)){
              if(this.formGroup.controls.nouveauPassword.hasError("required"))
                this.nouveauPasswordErrorText = "Nouvo modpass lan paka rete vid"

              if(this.formGroup.controls.nouveauPassword.hasError("pattern"))
                this.nouveauPasswordErrorText = "Nouvo modpass sa pa valid"

              if(this.formGroup.controls.nouveauPassword.hasError("minlength"))
                this.nouveauPasswordErrorText = "Modpass lan dwe gen pou pi piti 8 karakte"

              if(this.formGroup.controls.confirmPassword.hasError("required"))
                this.confirmPasswordErrorText = "Modpass konfimasyon an paka rete vid"
  
              if(this.formGroup.controls.confirmPassword.hasError("passwordmismatch"))
                this.confirmPasswordErrorText = "Modpass yo pa dwe diferan"
          }
      })
    )
  }

  ngOnInit() {
   
  }

  showToast(message:string,type:string,callback?:any){
    if(type === "success"){
      this.toastIcon = "checkmark-sharp"
      this.toastColor = "success"
      
    }else{
      this.toastIcon = "close-sharp"
      this.toastColor = "danger"
    }

    this.toastMessage = message
    this.isToastOpen = true

    setTimeout(()=>{ 
      this.closeToast()
      if(callback)
        callback()
    },3500)
  }

  closeToast(){
    this.isToastOpen = false
  }

  onSubmit(){
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
        this.isLoading = true

        const formValue = this.formGroup.value

        this.subscription.add(
          this.compteService.changerPassword(formValue).subscribe({next:(response:any)=>{
            this.isLoading = false
            this.formGroup.reset()
            this.showToast(response.message.contenu,response.message.type)
          },error:(response)=>{
            this.isLoading = false
            try {
              this.showToast(response.error.message.contenu,response.error.message.type,()=>{
                if(response.error.message.codeError === 1){
                  this.formGroup.reset()
                  this.router.navigate(["/login"])
                  
                }
              })
            } catch (e) {
              this.showToast("Verifye koneksyon entenet ou an","error")
            }
          }})
        )
    }
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
