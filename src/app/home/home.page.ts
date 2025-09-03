import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonIcon, IonButton, IonButtons, IonModal, IonInput, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencil, trash, close } from 'ionicons/icons';
import { Timer } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonRow, IonGrid, RouterLink, IonModal, IonButtons, IonIcon, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonCol],
})
export class HomePage {
  timersData: Timer[] = [];

  @ViewChild(IonModal) addTimerModal!: IonModal;

  timerTitle: string = "";

  openAddTimerModal() {
    this.timerTitle = "Add timer"
    this.addTimerModal.present();
  }

  openEditTimerModal() {
    this.timerTitle = "Edit timer";
    this.addTimerModal.present();
  }

  closeModal() {
    this.addTimerModal.dismiss();
  }

  constructor() {
    addIcons({ pencil, add, trash, close });
  }
}
