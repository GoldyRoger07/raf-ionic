import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: CompatClient 
  private token = ""

  subscription: string[] = []

  constructor(private urlService: UrlService) { 
    this.token = localStorage.getItem("token") as string
  }


  connect(callbacks:any){
    // SockJS
    const socket = SockJS( `${this.urlService.serverUrl}/websocket?access_token=${this.token}`)

    this.stompClient = Stomp.over(socket)

    this.stompClient.connect({}, ()=>{
      console.log("Connected to WebSocket")


      this.stompClient.subscribe("/user/queue/reply",(message:any)=>{
        console.log("Message prive recu: ",message.body)
      })

      this.subscription.push(this.stompClient.subscribe("/user/queue/reply/question",callbacks.onGetQuestion).id)

      this.subscription.push(this.stompClient.subscribe("/user/queue/reply/end-partie",callbacks.onEndPartie).id)

      this.subscription.push(this.stompClient.subscribe("/user/queue/reply/score",callbacks.onUpdateScore).id)

      this.subscription.push(this.stompClient.subscribe("/user/queue/reply/reponse-statut",callbacks.onGetReponseStatut).id)
      
      this.firstQuestion()
      
    })
  }

  connectForNotification(callback:any){
    // /queue/reply/client/notification

    const socket = SockJS( `${this.urlService.serverUrl}/websocket?access_token=${this.token}`)

    this.stompClient = Stomp.over(socket)

    this.stompClient.connect({},()=>{
      this.stompClient.subscribe("/user/queue/reply/client/notification",callback)
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

  disconnect(){
    if(this.stompClient){

      this.subscription.forEach(id=>{
        this.stompClient.unsubscribe(id)
      })
      
      this.stompClient.disconnect(()=>{
        console.log("Client websocket deconnecter")
       
      })
    } 
  }
  
}
