import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonMenu,IonMenuButton,IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonSegment, IonSegmentButton, IonSegmentView,IonSegmentContent,IonLabel, IonList, IonItem, IonAvatar, IonIcon, IonRouterOutlet, IonListHeader, IonNote, IonSplitPane, IonGrid, IonCol, IonRow, IonModal, IonButton, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, addCircleSharp, archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, homeOutline, homeSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, removeCircleOutline, removeCircleSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
// import { OverlayEventDetail } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonImgComponent } from 'src/app/radio-button-img/radio-button-img.component';
import { CompteService } from 'src/app/services/compte.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.page.html',
    styleUrls: ['./accueil.page.scss'],
    standalone: true,
    imports: [
        FormsModule,
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
export class AccueilPage implements OnInit,OnDestroy {

  @ViewChild(IonModal) modal!: IonModal;
  titreTransaction = "Depoze Lajan"
  placeholderTransaction = "Antre kantite lajan depo a"
  typeTransaction = "depot"
  isModalOpen  = false
  isConnected = true
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  subscription = new Subscription()

  formGroup = new FormGroup({
    montant: new FormControl(),
    paiement: new FormControl('')
  })


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private compteService:CompteService) {
      addIcons({addCircleOutline,addCircleSharp,homeOutline,homeSharp,removeCircleOutline,removeCircleSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {
    
      this.subscription.add(
            this.compteService.ping().subscribe({next:(response)=>{
                console.log(response)
                this.isConnected = true
            },error:(response)=>{
              this.isConnected = false
            }})
      )
      
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

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

}
