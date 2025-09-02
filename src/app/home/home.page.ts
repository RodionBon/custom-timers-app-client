import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencil, trash } from 'ionicons/icons';
import { Timer } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButtons, IonIcon, IonLabel, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  timersData: Timer[] = [];
  constructor() {
    addIcons({ pencil, add, trash });
  }
}
