import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonRow, IonGrid, IonCol, IonButton } from '@ionic/angular/standalone';
import { Quiz } from 'src/app/models/Quiz';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs';
import { CustomCurrencyPipe } from "../../custom-currency.pipe";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
    imports: [IonButton, IonCol, IonGrid, IonRow, IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomCurrencyPipe],
    providers: [DecimalPipe]
})
export class QuizPage implements OnInit,OnDestroy {

  quiz = new Quiz()

  subscription = new Subscription()

  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService) { }

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
   this.subscription.add(this.quizService.askForStartPartie(this.quiz.id.toString()).subscribe({next:()=>{
    
   },error:()=>{}}))
  }

}
