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


  connect(){
    // SockJS
    const socket = SockJS( `${this.urlService.serverUrl}/websocket?access_token=${this.token}`)

    this.stompClient = Stomp.over(socket)

    this.stompClient.connect({}, ()=>{
      console.log("Connected to WebSocket")

      this.stompClient.subscribe("/user/queue/reply",(message)=>{
        console.log("Message prive recu: ",message.body)
      })
    })
  }

  sendMessageToUser(message: string){
    this.stompClient.send("/app/send-to-user",{},message)
  }
  
}
