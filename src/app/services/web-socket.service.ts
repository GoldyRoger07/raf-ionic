import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: CompatClient
  private token = ""

  constructor(private urlService: UrlService) { 
    this.token = localStorage.getItem("token") as string
  }


  connect(callbacks:any){
    // SockJS
    const socket = SockJS( `${this.urlService.serverUrl}/websocket?access_token=${this.token}`)

    this.stompClient = Stomp.over(socket)

    this.stompClient.connect({}, ()=>{
      console.log("Connected to WebSocket")


      this.stompClient.subscribe("/user/queue/reply",(message)=>{
        console.log("Message prive recu: ",message.body)
      })

      this.stompClient.subscribe("/user/queue/reply/question",callbacks.onGetQuestion)

      this.stompClient.subscribe("/user/queue/reply/end-partie",callbacks.onEndPartie)

      this.stompClient.subscribe("/user/queue/reply/score",callbacks.onUpdateScore)

      this.stompClient.subscribe("/user/queue/reply/reponse-statut",callbacks.onGetReponseStatut)
      
      this.firstQuestion()
      
    })
  }

  sendMessageToServer(message: string){
    this.stompClient.send("/app/send-to-server",{},message)
  }

  firstQuestion(){
    this.stompClient.send("/app/first-question",{},"Im ready")
  }

  sendReponseToServer(response:any){
    this.stompClient.send("/app/send-reponse-to-server",{},JSON.stringify(response))
  }
  
}
