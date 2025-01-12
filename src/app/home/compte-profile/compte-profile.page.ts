import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol, IonRow, IonGrid, IonAvatar, IonImg, IonList, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, listOutline, lockClosedOutline, power } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { Compte } from 'src/app/models/Compte';
import { Subscription } from 'rxjs';
import { CompteService } from 'src/app/services/compte.service';
import { CustomCurrencyPipe } from 'src/app/custom-currency.pipe';

@Component({
    selector: 'app-compte-profile',
    templateUrl: './compte-profile.page.html',
    styleUrls: ['./compte-profile.page.scss'],
    imports: [RouterLink, IonLabel, IonIcon, IonItem, IonList, IonImg, IonAvatar, IonGrid, IonRow, IonCol, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CustomCurrencyPipe],
    providers:[DecimalPipe]
})
export class CompteProfilePage implements OnInit,OnDestroy {

  constructor(private router:Router,private compteService:CompteService) {
    addIcons({power,createOutline,lockClosedOutline,listOutline});
  }

  compte = new Compte()

  subscription = new Subscription()

  ngOnInit() {
      this.subscription.add(
        this.compteService.getCompteAuthenticated().subscribe({next:(compte)=>{
            if(compte)
                this.compte = compte as Compte
        }})
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()  
  }

  deconnexion(){
    localStorage.setItem("token","");
    this.router.navigate(["/login"])
  }


}
