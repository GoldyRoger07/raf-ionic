import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAlert,IonText,IonSpinner,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonRow, IonGrid, IonCol, IonButton } from '@ionic/angular/standalone';
import { Quiz } from 'src/app/models/Quiz';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { CustomCurrencyPipe } from "../../custom-currency.pipe";
import { UrlService } from 'src/app/services/url.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
    imports: [IonAlert,IonText,IonSpinner,IonButton, IonCol, IonGrid, IonRow, IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomCurrencyPipe],
    providers: [DecimalPipe]
})
export class QuizPage implements OnInit,OnDestroy {

  isAlertOpen = false

  quiz = new Quiz()

  subscription = new Subscription()

  isLoading = false

  message = ""

  alertButtons = [
    {
      text: "Anile",
      role: "cancel",
      handler: ()=>{
        // this.router.navigate(["/accueil"])
      }
    },{
      text: "Rechaje kont Mwen",
      role: "confirm",
      handler: ()=>{    
        this.router.navigate(["/transactions/depot"])
      }
    }
  ]

  constructor(private urlService:UrlService,private activatedRoute:ActivatedRoute,private quizService:QuizService,private router:Router) { }

  ngOnInit() {
    this.initQuiz()
  }

  initQuiz(){
    const idQuiz = this.activatedRoute.snapshot.params["id"]

    this.subscription.add(
        this.quizService.getQuiz(idQuiz).subscribe({next:(quiz:Quiz)=>{
              this.quiz = quiz
        }})
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  onPlay(){
    this.isLoading = true
   this.subscription.add(this.quizService.askForStartPartie(this.quiz.id.toString()).subscribe({next:()=>{
      this.isLoading = false
      this.router.navigate(["/partie"])
   },error:(response)=>{
      this.isLoading = false
      this.message = response.error.message.contenu
      this.setOpen(true)
   }}))
  }

  setOpen(value: boolean){
    this.isAlertOpen = value
  }

}
