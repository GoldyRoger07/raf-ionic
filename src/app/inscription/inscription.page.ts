import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonToast,IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonImg, IonText, IonInput, IonSpinner, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Compte } from '../models/Compte';
import { CompteService } from '../services/compte.service';
import { addIcons } from 'ionicons';
import { call, closeSharp } from 'ionicons/icons';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.page.html',
    styleUrls: ['./inscription.page.scss'],
    standalone:true,
    imports: [
        IonToast,
        IonButton,
        IonSpinner, 
        IonInput,
        IonText,
        IonImg,
        IonRow,
        IonCol,
        IonGrid,
        IonContent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ]
})
export class InscriptionPage implements OnInit {

  @ViewChildren("ionInput")
  ionInputs! : QueryList<IonInput>

  isToastOpen = false

  toastMessage = ""

  formGroup = new FormGroup({
    nom: new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z\\s]+$")]),
    prenom: new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z\\s]+$")]),
    telephone: new FormControl("",[Validators.required,Validators.pattern("^[0-9]{8}$")]),
    email: new FormControl("",[Validators.required,Validators.email]),
    username: new FormControl("",[Validators.required,Validators.minLength(4),Validators.pattern("^[a-zA-Z0-9\\s]+$")])
  })

  prenomErrorText = "Non an paka rete vid"
  nomErrorText = "Sinyati an paka rete vid"
  telephoneErrorText = "Nimewo Telefon nan paka rete vid"
  emailErrorText = "Imel lan paka rete vid"
  usernameErrorText = "Non itilizate a paka rete vid"

 

  isLoading = false

  constructor(private compteService:CompteService,private router:Router) { 
    addIcons({closeSharp})
    this.formGroup.valueChanges.subscribe(()=>{
      this.showErrorsWhenFormIsInvalid(this.formGroup.controls)
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
      this.isLoading = true
      const formGroupValue = this.formGroup.value
      const compte = new Compte()
      formGroupValue.email = formGroupValue.email?.trim()
      formGroupValue.nom = formGroupValue.nom?.trim()
      formGroupValue.prenom = formGroupValue.prenom?.trim()
      formGroupValue.username = formGroupValue.username?.trim()
      
      compte.nom = formGroupValue.nom as string
      compte.prenom = formGroupValue.prenom as string
      compte.email = formGroupValue.email as string 
      compte.telephone = formGroupValue.telephone as string
      compte.username = formGroupValue.username as string

      
      this.compteService.inscriptionPartie1(compte).subscribe({next:(response:any)=>{
        this.isLoading = false
        this.resetInputInForm()
        this.router.navigate(["/inscription/verification-email"])
        localStorage.setItem("email",compte.email)
      },error:(response)=>{
        this.isLoading = false
        try {
         
            this.showToast(response.error.messages[0].contenu,response.error.messages[0].type)
        
        } catch (e) {
          this.showToast("Verifye koneksyon entenet ou an","error")
        }
      }})
    }
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

      if(controls.email.hasError("email"))
        this.emailErrorText = "Imel sa pa valid"

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
      case "email":
            this.emailErrorText = "Imel lan paka rete vid"
      break
      case "username":
            this.usernameErrorText = "Non itilizate an paka rete vid"
      break
    }
  }

  resetInputInForm(){

    this.formGroup.setValue({
      nom: "",
      prenom: "",
      username: "",
      telephone: "",
      email: ""
    })

    // this.formGroup.markAsUntouched()
    this.formGroup.reset()
    
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
