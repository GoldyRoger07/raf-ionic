import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonInput,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonButton, IonSpinner, IonText, IonToast, IonLabel } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CompteService } from 'src/app/services/compte.service';
import { addIcons } from 'ionicons';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';
import { RadioButtonImgComponent } from 'src/app/radio-button-img/radio-button-img.component';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonLabel,
    IonToast,
    IonText, 
    IonSpinner, 
    IonButton, 
    IonCol, 
    IonRow, 
    IonGrid, 
    ReactiveFormsModule,
    IonBackButton, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule,
    RadioButtonImgComponent]
})
export class DepotPage implements OnInit ,OnDestroy{

  isLoading = false
  
  toastColor = ""
  isToastOpen = false
  toastMessage = ""
  toastIcon = ""
  
  subscription = new Subscription()

  formGroup = new FormGroup({
      montant: new FormControl(""),
      paiement: new FormControl('moncash')
  })

  constructor(private compteService:CompteService,private router:Router,private urlService:UrlService) { 
    addIcons({checkmarkSharp,closeSharp})
  }

  ngOnInit() {
  }

  onSubmit(){
      this.formGroup.markAllAsTouched()
      if(!this.formGroup.invalid){
        this.isLoading = true

        const formValue = this.formGroup.value

        this.subscription.add(
          this.compteService.depot(formValue).subscribe({next:(response:any)=>{
            this.isLoading = false
            this.formGroup.reset()
            this.urlService.redirectTo(response.urlRedirection)

          },error:(response)=>{
            this.isLoading = false
            try {
              this.showToast(response.error.message.contenu,response.error.message.type,()=>{
                if(response.error.codeError === "1"){
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
