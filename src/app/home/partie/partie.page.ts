import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/angular/standalone';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { TimerComponent } from "../timer/timer.component";
import { Question } from 'src/app/models/Question';
import { Reponse } from 'src/app/models/Reponse';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
    selector: 'app-partie',
    templateUrl: './partie.page.html',
    styleUrls: ['./partie.page.scss'],
    imports: [IonAlert, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TimerComponent]
})
export class PartiePage implements OnInit,AfterViewInit {


  isAlertOpen = false

  timerLeft = 0

  score = 0

  question = new Question()
  reponses:Reponse[] = [
    new Reponse(),
    new Reponse(), 
    new Reponse(), 
    new Reponse()
  ]

  reponseStatutA = ""
  reponseStatutB = ""
  reponseStatutC = ""
  reponseStatutD = ""

  reponseLetter = ""

  message = ""

  idQuiz = 0

  @ViewChild("timer")
  timer!: TimerComponent

  subscription = new Subscription()

  alertButtons = [
    {
      text: "Akey",
      role: "cancel",
      handler: ()=>{
        this.router.navigate(["/accueil"])
      }
    },{
      text: "Jwe on lot pati",
      role: "confirm",
      handler: ()=>{
        this.subscription.add(this.quizService.askForStartPartie(this.idQuiz.toString()).subscribe({next:()=>{
          this.urlService.redirectTo("/partie")
       },error:(response)=>{
          this.message = response.error.message.contenu
          
          
       }}))
      }
    }
  ]

  callbacks = {
    onGetQuestion: (message:any)=>{
      const response = JSON.parse(message.body)

      if(response.timerPartie){
          this.timerLeft = response.timerPartie 
          this.timer.startTimer()
      }

      console.log(response)
      this.resetReponseStatuts()

      setTimeout(()=>{this.question = response.question
      this.reponses = response.reponses},1000)

      
    },
    onEndPartie: (message:any)=>{
      const response = JSON.parse(message.body)

      this.message = "Ou reponn "+response.partie.score+" kesyon"
      
      this.idQuiz = response.partie.quiz.id

      if(response.canPlayAgain !== "oui"){
        this.alertButtons[1].text = "Rechaje kont mwen"
        this.alertButtons[1].handler = ()=>{
          
            this.router.navigate(["/transactions/depot"])
         
        }
      }


      this.isAlertOpen = true

      
    },
    onUpdateScore: (message:any)=>{
        const response = message.body as number
        this.score = response
    },
    onGetReponseStatut:(message:any)=>{
      const response = message.body
      this.setStatutToReponseLetter(response)
    }
  }

  resetReponseStatuts(){
    setTimeout(()=>{
      this.reponseStatutA = ""
      this.reponseStatutB = ""
      this.reponseStatutC = ""
      this.reponseStatutD = ""
    },1000)
  }
  
  constructor(private urlService:UrlService,private webSocketService:WebSocketService,private router:Router,private quizService: QuizService) { }

  ngOnInit() {
    // this.webSocketService.firstQuestion()
    // this.webSocketService.connect(this.callbacks)
  }

  ngAfterViewInit(): void {
    
    this.webSocketService.connect(this.callbacks)
    
  }

  setOpen(value: boolean){
    this.isAlertOpen = value
  }

  onTimerFinished() {
    throw new Error('Method not implemented.');
  }

  setResult(ev: any){
    console.log(`Dismissed with role: ${ev.detail.role}`)
  }

  onClickToAnswer(id: number,reponseLetter:string){
    const response = {
      idQuestion: this.question.id,
      idReponse: id
    }
    this.reponseLetter = reponseLetter
    this.webSocketService.sendReponseToServer(response);
  }

  setStatutToReponseLetter(statut:string){
    this.resetReponseStatuts()
    switch(this.reponseLetter){
      case "A":
        this.reponseStatutA = statut
      break
      case "B":
        this.reponseStatutB = statut
      break
      case "C":
        this.reponseStatutC = statut
      break
      case "D":
        this.reponseStatutD = statut
      break
      default: this.resetReponseStatuts()
    }
  }

  onClickTimer(){
    this.webSocketService.firstQuestion()
  }

}
