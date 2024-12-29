import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent,IonToast, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonInput, IonButton, IonSpinner, IonText } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';
import { Compte } from 'src/app/models/Compte';

@Component({
    selector: 'app-update-infos',
    templateUrl: './update-infos.page.html',
    styleUrls: ['./update-infos.page.scss'],
    imports: [IonToast,IonText, IonSpinner, IonButton, ReactiveFormsModule, IonInput, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule]
})
export class UpdateInfosPage implements OnInit,OnDestroy {

  formGroup = new FormGroup({
      nom: new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z\\s]+$")]),
      prenom: new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z\\s]+$")]),
      telephone: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{8}$")]),
      username: new FormControl("",[Validators.required,Validators.minLength(4),Validators.pattern("^[a-zA-Z0-9\\s]+$")])
  })


  isLoading = false
  
  toastColor = ""
  isToastOpen = false
  toastMessage = ""
  toastIcon = ""

  compte = new Compte()

  prenomErrorText = "Non an paka rete vid"
  nomErrorText = "Sinyati an paka rete vid"
  telephoneErrorText = "Nimewo Telefon nan paka rete vid"
  usernameErrorText = "Non itilizate a paka rete vid"
  
  subscription = new Subscription()
  constructor(private compteService:CompteService,private router:Router) {
    addIcons({checkmarkSharp,closeSharp})
    this.subscription.add( 
      this.formGroup.valueChanges.subscribe(()=>{
        this.showErrorsWhenFormIsInvalid(this.formGroup.controls)
      }) 
      
    )


  }

  initCompte(){
    this.subscription.add(this.compteService.getCompteAuthenticated().subscribe({next:(compte)=>{
      this.initFormGroup(compte as Compte)
      this.compte = compte as Compte
    },error:()=>{}}))
  }

  initFormGroup(compte:Compte){
    this.formGroup.setValue({
      nom: compte.nom,
      prenom: compte.prenom,
      telephone: compte.telephone,
      username: compte.username
    })
  }

  showErrorsWhenFormIsInvalid(controls:any){
   
    Object.keys(controls).forEach(key => {
     if(controls[key].invalid && (controls[key].touched || controls[key].dirty)){
       if(controls[key].hasError("required"))
           this.requiredErrorText(key)
           
       if(controls.prenom.hasError("minlength"))
         this.prenomErrorText = "Non an dwe gen pou pi piti 3 karakte"
 
       if(controls.prenom.hasError("pattern"))
         this.prenomErrorText = "Non sa pa valid"
 
       if(controls.nom.hasError("minlength"))
         this.nomErrorText = "Sinyati an dwe gen pou pi piti 3 karakte"
 
       if(controls.nom.hasError("pattern"))
         this.nomErrorText = "Sinyati sa pa valid"
 
       if(controls.username.hasError("minlength"))
         this.usernameErrorText = "Non itilizate an dwe gen pou pi piti 4 karakte"
 
       if(controls.username.hasError("pattern"))
         this.usernameErrorText = "Non itilizate sa pa valid"
 
       if(controls.telephone.hasError("pattern"))
         this.telephoneErrorText = "Nimewo telefon nan sipoze gen 8 chif"
 
     }
    });
   }
 
 
   requiredErrorText(key:string){
     switch(key){
       case "prenom":
             this.prenomErrorText = "Non an paka rete vid"
       break
       case "nom":
             this.nomErrorText = "Sinyati an paka rete vid"
       break
       case "telephone":
             this.telephoneErrorText = "Nimewo telefon nan paka rete vid"
       break
       case "username":
             this.usernameErrorText = "Non itilizate an paka rete vid"
       break
     }
   }

   onSubmit(){
       this.formGroup.markAllAsTouched()
       if(!this.formGroup.invalid){
        this.isLoading = true
        const formGroupValue = this.formGroup.value
        const compte = new Compte()
        formGroupValue.nom = formGroupValue.nom?.trim()
        formGroupValue.prenom = formGroupValue.prenom?.trim()
        formGroupValue.username = formGroupValue.username?.trim()
         
        compte.nom = formGroupValue.nom as string
        compte.prenom = formGroupValue.prenom as string
        compte.telephone = formGroupValue.telephone as string
        compte.username = formGroupValue.username as string
   
         
        this.compteService.updateInfo(compte).subscribe({next:(response:any)=>{
            this.isLoading = false
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
 

  ngOnInit() {
    this.initCompte()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
