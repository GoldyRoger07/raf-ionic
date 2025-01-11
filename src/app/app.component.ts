import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController,IonApp,  IonRouterOutlet, IonAlert, IonModal, IonContent, IonGrid, IonRow, IonCol, IonInput, IonToast, IonSpinner, IonButton, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { WebSocketService } from './services/web-socket.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompteService } from './services/compte.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule,IonText, IonButton, IonSpinner, IonToast, IonInput, IonCol, IonRow, IonGrid, IonContent, IonModal, IonAlert,  CommonModule, IonApp,  IonRouterOutlet]
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  message = '';
  alertButtons = [
    {
      text: "Ok",
      role: "cancel",
      handler: ()=>{
        this.setOpen(false)
      }
    }
  ]
  isAlertOpen = false

  isToastOpen = false

  colorToast = ""

  iconToast = ""

  isModalOpen = false

  isLoading = false

  toastMessage = ""

  messageModal = ""

  uniqueID = ""

  constructor(private modalCtrl:ModalController,private webSocketService:WebSocketService,private compteService:CompteService) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  callbacks = {
    onGetNotification:(response:any)=>{
      const descriptionClient = JSON.parse(response.body).descriptionClient
      this.message = descriptionClient
      this.setOpen(true)
    },
    onConfirmeRetrait:(response:any)=>{
      const responseBody = JSON.parse(response.body)
      this.uniqueID = responseBody.uniqueID
      this.messageModal = responseBody.message
      this.isModalOpen = true
    },
    onGetAgentNotification:(response:any)=>{
      const descriptionAgent = JSON.parse(response.body).descriptionAgent
      this.message = descriptionAgent
      this.setOpen(true)
    }
  }



  // async openModal(){
  //   const modal = await this.modalCtrl.create({
  //     component: AppComponent
  //   })

  //   modal.present()

  //   const {data,role} = await modal.onWillDismiss()
  //   if(role === "confirm"){

  //   }
  // }

  formGroup = new FormGroup({
    password:new FormControl('',[Validators.required])
  })

  onSubmit(){
    this.formGroup.markAllAsTouched()
    if(!this.formGroup.invalid){
      this.isLoading = true
      const formValue ={
        password: this.formGroup.value.password,
        uniqueID: this.uniqueID
      }
      
      this.compteService.confirmerRetraitByClient(formValue).subscribe({
        next:(response:any)=>{
            this.isLoading = false
            this.message = response.descriptionClient
            this.formGroup.reset()
            this.isModalOpen = false
            this.setOpen(true)
        },
        error:(response)=>{
          // messageClient
          this.isLoading = false

          try {
            this.isModalOpen = false
            this.showToast(response.error.messageClient.contenu,response.error.messageClient.type)
            this.formGroup.reset()
          } catch (e) {
            this.showToast("Verifye koneksyon entenet ou an","error")
          }
        }
      })
      
    }

  }

  ngOnInit() {
    this.webSocketService.connectForNotification(this.callbacks)
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
