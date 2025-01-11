import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonApp,  IonRouterOutlet, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { WebSocketService } from './services/web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonAlert,  CommonModule, IonApp,  IonRouterOutlet]
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  message = '';
  alertButtons = [
    {
      text: "Ok",
      role: "cancel",
      handler: ()=>{
        this.setOpen(false)
      }
    }
  ]
  isAlertOpen = false

  constructor(private webSocketService:WebSocketService) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {
    this.webSocketService.connectForNotification((response:any)=>{
        const descriptionClient = JSON.parse(response.body).descriptionClient
        this.message = descriptionClient
        this.setOpen(true)
    })
  }

  setOpen(value:boolean){
    this.isAlertOpen = value
  }

}
