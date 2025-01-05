import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonMenu,IonMenuButton,IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonSegment, IonSegmentButton, IonSegmentView,IonSegmentContent,IonLabel, IonList, IonItem, IonAvatar, IonIcon, IonRouterOutlet, IonListHeader, IonNote, IonSplitPane, IonGrid, IonCol, IonRow, IonModal, IonButton, IonInput } from '@ionic/angular/standalone';
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
        IonInput,
        IonButton,
        IonModal,
        IonRow,
        IonCol,
        IonGrid,
        IonTitle,
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
        ReactiveFormsModule,
        RadioButtonImgComponent
    ]
})
export class AccueilPage implements OnInit,OnDestroy,AfterViewInit {

  @ViewChild(IonModal) modal!: IonModal;
  titreTransaction = "Depoze Lajan"
  placeholderTransaction = "Antre kantite lajan depo a"
  typeTransaction = "depot"
  isModalOpen  = false
  isConnected = true
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  compte = new Compte()
  quizs!:Quiz[] 

  subscription = new Subscription()

  formGroup = new FormGroup({
    montant: new FormControl(),
    paiement: new FormControl()
  })


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private websocketService:WebSocketService,private compteService:CompteService,private quizService:QuizService) {
      addIcons({addCircleOutline,addCircleSharp,homeOutline,homeSharp,removeCircleOutline,removeCircleSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    console.log("akey")
    this.websocketService.connect()
    
    this.subscription.add(
          this.compteService.ping().subscribe({next:()=>{
              this.isConnected = true
              this.initCompte()
              this.initQuizs()
              
          },error:(res)=>{
            this.isConnected = false
            console.log(res)
          }})
    )
  }

  initQuizs(){
    this.subscription.add(
      this.quizService.getQuizs().subscribe({next:(quizs:Quiz[])=>{
          this.quizs = quizs
      }})
    )
  }


  initCompte(){
    this.subscription.add(this.compteService.getCompteAuthenticated().subscribe({next:(compte)=>{
      this.compte = compte as Compte
    },error:()=>{}}))
  }

  onClickSendMessage(){
    this.websocketService.sendMessageToUser("Hello WorldSocket")
  }

  

  cancel() {
    // this.modal.dismiss(null, 'cancel');
    this.setOpen(false)
  }

  confirm() {
    // this.modal.dismiss(this.name, 'confirm');
    this.setOpen(false)
  }

  onWillDismiss(event: Event) {
    const ev = event as any;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  changeTitreTransaction(value:string){
    this.titreTransaction = value
  }

  setOpen(value1:boolean,value2?:string){
    this.isModalOpen = value1
    this.setModalState(value2)
  }

  setModalState(value?:string){
    if(value){
      this.changeTitreTransaction(value)
      if(value.toLocaleLowerCase().includes("depoze")){
        this.placeholderTransaction = "Antre kantite lajan depo a"
        this.typeTransaction = "depot"
      }if(value.toLocaleLowerCase().includes("retire")){
        this.placeholderTransaction = "Antre kantite lajan retre a"
        this.typeTransaction = "retrait"
      }
    }
  }

  onSubmit(){
    console.log(this.formGroup.value)
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
