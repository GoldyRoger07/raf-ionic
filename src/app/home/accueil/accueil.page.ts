import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonMenu,IonMenuButton,IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonSegment, IonSegmentButton, IonSegmentView,IonSegmentContent,IonLabel, IonList, IonItem, IonAvatar, IonIcon, IonRouterOutlet, IonListHeader, IonNote, IonSplitPane, IonGrid, IonCol, IonRow, IonModal, IonButton, IonInput, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, addCircleSharp, archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, homeOutline, homeSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, removeCircleOutline, removeCircleSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
// import { OverlayEventDetail } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonImgComponent } from 'src/app/radio-button-img/radio-button-img.component';
import { CompteService } from 'src/app/services/compte.service';
import { Subscription } from 'rxjs';
import { Compte } from 'src/app/models/Compte';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/Quiz';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.page.html',
    styleUrls: ['./accueil.page.scss'],
    standalone: true,
    imports: [
        IonAlert,
        IonButton,
        IonIcon,
        IonItem,
        IonList,
        IonLabel,
        IonImg,
        IonContent,
        RouterLink,
        CommonModule,
        IonSegment,
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonButtons,
        IonSegmentButton,
        IonSegmentView,
        IonSegmentContent,
        IonAvatar,
        ReactiveFormsModule
    ]
})
export class AccueilPage implements OnInit,OnDestroy,AfterViewInit {

  isConnected = true
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
  name!: string;
  compte = new Compte()
  quizsEncours!:Quiz[] 
  quizsTerminer!:Quiz[]
  isAlertOpen = false


  subscription = new Subscription()

  formGroup = new FormGroup({
    montant: new FormControl(),
    paiement: new FormControl()
  })


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private webSocketService:WebSocketService,private compteService:CompteService,private quizService:QuizService) {
      addIcons({addCircleOutline,addCircleSharp,homeOutline,homeSharp,removeCircleOutline,removeCircleSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {
    // this.webSocketService.connectForNotification((response:any)=>{
    //     const descriptionClient = JSON.parse(response.body).descriptionClient
    //     this.message = descriptionClient
    //     this.setOpen(true)
    // })
  }

 

  ngAfterViewInit() {
    console.log("akey")
    
    this.subscription.add(
          this.compteService.ping().subscribe({next:()=>{
              this.isConnected = true
              this.initCompte()
              this.initQuizs()
              this.initQuizsTerminer()
              
          },error:(res)=>{
            this.isConnected = false
            console.log(res)
          }})
    )
  }

  initQuizs(){
    this.subscription.add(
      this.quizService.getQuizs().subscribe({next:(quizs:Quiz[])=>{
          this.quizsEncours = quizs
      }})
    )
  }

  initQuizsTerminer(){
    this.subscription.add(
      this.quizService.getQuizs("TERMINER").subscribe({next:(quizs:Quiz[])=>{
          this.quizsTerminer = quizs
      }})
    )
  }


  initCompte(){
    this.subscription.add(this.compteService.getCompteAuthenticated().subscribe({next:(compte)=>{
      this.compte = compte as Compte
    },error:()=>{}}))
  }

  // onClickSendMessage(){
  //   this.websocketService.sendMessageToUser("Hello WorldSocket")
  // }

  

  cancel() {
    // this.modal.dismiss(null, 'cancel');
    this.setOpen(false)
  }

  confirm() {
    // this.modal.dismiss(this.name, 'confirm');
    this.setOpen(false)
  }

 
  setOpen(value:boolean){
    this.isAlertOpen = value
  }

  
  onSubmit(){
    console.log(this.formGroup.value)
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
