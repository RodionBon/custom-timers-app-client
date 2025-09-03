import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonIcon, IonButton, IonButtons, IonModal, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencil, trash, close } from 'ionicons/icons';
import { Timer } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonModal, IonButtons, IonIcon, IonLabel, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput],
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
