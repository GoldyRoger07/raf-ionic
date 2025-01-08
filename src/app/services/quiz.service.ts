import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Quiz } from '../models/Quiz';
import { Partie } from '../models/Partie';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient,private urlService:UrlService) { }

  getQuizs(){
    return this.http.get<Quiz[]>(this.urlService.baseUrl+"/quizs")
  }

  getQuiz(id:string){
    return this.http.get<Quiz>(this.urlService.baseUrl+"/quiz/"+id)
  }

  askForStartPartie(id: string){
    return this.http.get(this.urlService.baseUrl+"/start-partie/quiz/"+id)
  }

  getBestPartieByQuiz(id: string){
    return this.http.get<Partie>(this.urlService.baseUrl+"/best-partie/quiz/"+id)
  }
}
