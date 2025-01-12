import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput,IonContent, IonHeader, IonTitle, IonToolbar, IonToast, IonAlert, IonRow, IonCol, IonButton, IonSpinner, IonText, IonList, IonGrid, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { greaterThanZeroValidator } from 'src/app/validators/GreaterThanZeroValidator';
import { CompteService } from 'src/app/services/compte.service';
import { addIcons } from 'ionicons';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';
import { combineLatest, debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { CustomCurrencyPipe } from "../../custom-currency.pipe";

@Component({
  selector: 'app-retrait-agent',
  templateUrl: './retrait-agent.page.html',
  styleUrls: ['./retrait-agent.page.scss'],
  standalone: true,
  imports: [IonInput,IonBackButton, IonButtons, ReactiveFormsModule,IonGrid, IonList, IonText, IonSpinner, IonButton, IonCol, IonRow, IonToast, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomCurrencyPipe],
  providers:[DecimalPipe]
})
export class RetraitAgentPage implements OnInit {

  formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      montant: new FormControl('',[Validators.required,greaterThanZeroValidator])
  })

  montantErrorText = "Kantite lajan an paka rete vid"

  isFocus = false

  isLoading = false

  isAlertOpen = false

  isToastOpen = false

  colorToast = ""

  iconToast = ""

  message = ""

  toastMessage = ""

  usernames$: Observable<string[]> = this.getUsernames()
  
  commissionRetrait = 1
  
  montantCalculer = 0
  
  commissionAgent = 0

  alertButtons = [
    {
      text: "Ok",
      role: "cancel",
      handler: ()=>{
        this.setOpen(false)
      }
    }
  ]

  constructor(private compteService:CompteService) {
    addIcons({closeSharp,checkmarkSharp}) 

    this.formGroup.controls.username.valueChanges.subscribe(()=> {
      if(!this.isFocus)
        this.isFocus = true
    })

    this.formGroup.controls.montant.valueChanges.subscribe((montant:string|null)=>{
      let value = parseInt(montant as string)
      if(value>=0 ){
        this.montantCalculer = value as number * this.commissionRetrait 
        this.commissionAgent = this.montantCalculer - value as number
      }else{
        this.montantCalculer = 0
        this.commissionAgent = 0
      }

      if(this.formGroup.controls.montant.hasError("greaterThanZero"))
        this.montantErrorText = "Chif sa pa valid"
    })
  }

  ngOnInit() {
    this.compteService.getAgentCommissionRetrait().subscribe({next:(value)=>{
      this.commissionRetrait = value
    }})
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
      this.isLoading = true

      const formValue = this.formGroup.value

      this.compteService.retraitAgent(formValue).subscribe({
        next:(response:any)=>{
          this.isLoading = false
          this.formGroup.reset()
          this.showToast(response.message.contenu,response.message.type)
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
    }
  }

  getUsernames():Observable<string[]>{
     
      const searchUsername$ = this.formGroup.controls.username.valueChanges.pipe(startWith(''),debounceTime(150))
  
      return combineLatest([searchUsername$])
      .pipe(
        switchMap(([username]) =>  this.compteService.getAllUsernames(username as string))
      ) 
  }

  onClickRow(value:string){
    this.formGroup.setValue({
      username: value,
      montant: this.formGroup.value.montant as string
    })
    this.isFocus = false
  }

  setOpen(value:boolean){
    this.isAlertOpen = value
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
