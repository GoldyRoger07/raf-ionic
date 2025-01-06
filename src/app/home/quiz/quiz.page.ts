import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonText,IonSpinner,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonRow, IonGrid, IonCol, IonButton } from '@ionic/angular/standalone';
import { Quiz } from 'src/app/models/Quiz';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { CustomCurrencyPipe } from "../../custom-currency.pipe";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
    imports: [IonText,IonSpinner,IonButton, IonCol, IonGrid, IonRow, IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomCurrencyPipe],
    providers: [DecimalPipe]
})
export class QuizPage implements OnInit,OnDestroy {

  quiz = new Quiz()

  subscription = new Subscription()

  isLoading = false

  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService,private router:Router) { }

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
      console.log(response)
   }}))
  }

}
