import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { Subscription, interval, takeWhile } from 'rxjs';
import { TimerService } from 'src/services/timer.service';
import { Timer } from 'src/types';

@Component({
  selector: 'timer-page',
  templateUrl: 'timer.page.html',
  styleUrls: ['timer.page.scss'],
  imports: [IonList, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class TimerPage {
  timer: Timer = { id: 0, name: "", exerciseDuration: 0, restDuration: 0, rounds: 0 };
  currentRound: number = 1;
  secondsLeft: number = 0;
  currentPhase: "notStarted" | "exercise" | "rest" | "completed" = "notStarted";
  private subscription?: Subscription;

  startTimer() {
    this.stopTimer();
    this.currentPhase = "exercise";

    this.subscription = interval(1000).subscribe(() => {
      if (this.currentPhase === 'exercise') {
        if (this.secondsLeft > 1) {
          this.secondsLeft--;
        } else {
          this.currentPhase = 'rest';
          this.secondsLeft = this.timer.restDuration;
        }
      } else if (this.currentPhase === 'rest') {
        if (this.secondsLeft > 1) {
          this.secondsLeft--;
        } else {
          if (this.currentRound < this.timer.rounds) {
            this.currentRound++;
            this.currentPhase = 'exercise';
            this.secondsLeft = this.timer.exerciseDuration;
          } else {
            this.currentPhase = 'completed';
            this.stopTimer();
          }
        }
      }
    });
  }

  stopTimer() {
    this.subscription?.unsubscribe();
  }

  navigateBack() {
    this.router.navigate(['..']);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const timerId = params['id'];
      this.timer = await this.timerService.getTimer(timerId);
      this.secondsLeft = this.timer.exerciseDuration;
    });
  }

  ngOnDestroy() {
    this.currentPhase = "notStarted";
    this.stopTimer();
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private timerService: TimerService) {
    addIcons({ arrowBack });
  }
}
