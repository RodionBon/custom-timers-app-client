import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { Timer } from 'src/types';

@Component({
  selector: 'timer-page',
  templateUrl: 'timer.page.html',
  styleUrls: ['timer.page.scss'],
  imports: [IonList, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class TimerPage {
  timer: Timer = { id: 0, name: "", exerciseDuration: 0, restDuration: 0, rounds: 0 };
  roundsLeft: number = this.timer.rounds;
  currentPhase: "notStarted" | "exercise" | "rest" | "completed" = "notStarted";

  startTimer() {
    this.currentPhase = "exercise";
  }

  navigateBack(){
    this.router.navigate(['..']);
  }

  constructor(private router: Router) {
    addIcons({ arrowBack });
  }
}
