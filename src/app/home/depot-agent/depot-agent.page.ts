import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonButton, IonText, IonSpinner, IonToast, IonLabel, IonInput, IonSearchbar, IonList, IonItem, IonAlert } from '@ionic/angular/standalone';
import { combineLatest, debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { CustomCurrencyPipe } from "../../custom-currency.pipe";
import { greaterThanZeroValidator } from 'src/app/validators/GreaterThanZeroValidator';
import { addIcons } from 'ionicons';
import { closeSharp } from 'ionicons/icons';

@Component({
  selector: 'app-depot-agent',
  templateUrl: './depot-agent.page.html',
  styleUrls: ['./depot-agent.page.scss'],
  standalone: true,
  imports: [IonAlert, IonList, IonInput, ReactiveFormsModule, IonToast, IonSpinner, IonText, IonButton, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, CustomCurrencyPipe],
  providers:[DecimalPipe]
})
export class DepotAgentPage implements OnInit {


  formGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    montant: new FormControl('',[Validators.required,greaterThanZeroValidator])
  })

  montantErrorText = "Kantite lajan an paka rete vid"

  isFocus = false

  isLoading = false

  isAlertOpen = false

  isToastOpen = false

  message = ""

  toastMessage = ""

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
    addIcons({closeSharp})
    this.formGroup.controls.username.valueChanges.subscribe(()=> {
        if(!this.isFocus)
          this.isFocus = true
    })

    this.formGroup.controls.montant.valueChanges.subscribe((montant:string|null)=>{
        let value = parseInt(montant as string)
        if(value>=0 ){
          this.montantCalculer = value as number * this.commissionDepot 
          this.commissionAgent = value as number - this.montantCalculer
        }

        if(this.formGroup.controls.montant.hasError("greaterThanZero"))
          this.montantErrorText = "Chif sa pa valid"
    })
  }

  usernames$: Observable<string[]> = this.getUsernames()

  commissionDepot = 1

  montantCalculer = 0

  commissionAgent = 0

  ngOnInit() {
    this.compteService.getAgentCommissionDepot().subscribe({next:(value)=>{
        this.commissionDepot = value
    }})
  }

  

  onSubmit() {
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
      this.isLoading = true

      const formValue = this.formGroup.value

      this.compteService.depotAgent(formValue).subscribe({
        next:(response:any)=>{
          this.isLoading = false
          this.formGroup.reset()
          this.message = response.descriptionAgent
          this.setOpen(true)
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

}
