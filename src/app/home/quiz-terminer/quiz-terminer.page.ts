import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonButton, IonImg, IonGrid, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Quiz } from 'src/app/models/Quiz';
import { Partie } from 'src/app/models/Partie';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { CustomCurrencyPipe } from "../../custom-currency.pipe";

@Component({
  selector: 'app-quiz-terminer',
  templateUrl: './quiz-terminer.page.html',
  styleUrls: ['./quiz-terminer.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonGrid, IonImg, IonButton, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomCurrencyPipe],
  providers:[DecimalPipe]
})
export class QuizTerminerPage implements OnInit,OnDestroy {

  quiz = new Quiz()
  
  bestPartie:Partie | null = null

  subscription = new Subscription()
  
  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService) { }

  ngOnInit() {
    const idQuiz = this.activatedRoute.snapshot.params["id"]
    this.initQuiz(idQuiz)
    this.initBestPartie(idQuiz)
  }

  initQuiz(idQuiz:string){
    this.subscription.add(
        this.quizService.getQuiz(idQuiz).subscribe({next:(quiz:Quiz)=>{
              this.quiz = quiz   
        }})
    )
  }

  initBestPartie(idQuiz:string){
    
    this.subscription.add(
        this.quizService.getBestPartieByQuiz(idQuiz).subscribe({next:(partie:Partie)=>{
              this.bestPartie = partie
        }})
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
