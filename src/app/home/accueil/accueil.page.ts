import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonMenu,IonMenuButton,IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButtons, IonImg, IonSegment, IonSegmentButton, IonSegmentView,IonSegmentContent,IonLabel, IonList, IonItem, IonAvatar, IonIcon, IonRouterOutlet, IonListHeader, IonNote, IonSplitPane } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    IonIcon, 
    IonAvatar, 
    IonItem, 
    IonList, 
    IonLabel, 
    IonSegmentButton, 
    IonSegment, 
    IonSegmentView,
    IonImg, 
    IonButtons, 
    IonToolbar, 
    IonTitle, 
    IonHeader, 
    IonContent,
    IonMenu,
    IonMenuToggle,
    IonMenuButton,
    IonSegmentContent,
    RouterLink,
    CommonModule
  ]
})
export class AccueilPage implements OnInit {

    appPages = [
      { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
      { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
      { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
      { title: 'Archived', url: '/folder/archived', icon: 'archive' },
      { title: 'Trash', url: '/folder/trash', icon: 'trash' },
      { title: 'Spam', url: '/folder/spam', icon: 'warning' }
    ]

    menuItems = [
      {title: "Akey", url:"/", icon: "home"},
      {title: "Depoze lajan", url:"/transactions/depot", icon: "add-circle"},
      {title: "Akey", url:"/transactions/retrait", icon: "remove-circle"},
    ]

    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor() {
      addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
    }

  ngOnInit() {
  }

}
