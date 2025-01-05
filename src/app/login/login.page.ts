import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonCol, IonText, IonImg, IonRow, IonInput, IonButton, IonSpinner, IonToast, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import {closeCircleOutline, closeSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Compte } from '../models/Compte';
import { Subscription } from 'rxjs';
import { CompteService } from '../services/compte.service';
import { WebSocketService } from '../services/web-socket.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [
        IonToast,
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
export class LoginPage implements OnInit,OnDestroy {

  formGroup = new FormGroup({
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required) 
  })

  isLoading = false
  isToastOpen = false
  toastMessage = ""

  

  subscription = new Subscription()


  constructor(private compteService:CompteService,private router:Router) {
    addIcons({closeSharp,closeCircleOutline});
  }

  ngOnInit() {
  }


  onSubmit(){
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
      this.isLoading = true
      const formValue = this.formGroup.value

      const compte = new Compte()

      compte.email = formValue.email as string
      compte.password = formValue.password as string

     this.subscription.add( this.compteService.login(compte).subscribe({next:(response:any)=>{
        this.isLoading = false
        localStorage.setItem("token",response.token)
        this.formGroup.reset()
        this.router.navigate(["/accueil"])
        
     },error:(response)=>{
        this.isLoading = false
        try {
            const message = response.error.message
            this.showToast(message.contenu,message.type)
        } catch (e) {
          this.showToast("Verifye koneksyon entenet ou an","error")
        }
     }}))
    }
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

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
