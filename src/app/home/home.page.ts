import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonIcon, IonButton, IonButtons, IonModal, IonInput, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/angular/standalone';
import { AxiosError } from 'axios';
import { addIcons } from 'ionicons';
import { add, pencil, trash, close } from 'ionicons/icons';
import { TimerService } from 'src/services/timer.service';
import { ErrorResponse, Timer } from 'src/types';

const defaultFormGroup = () => {
  return new FormGroup({
    name: new FormControl(''),
    exerciseDuration: new FormControl(1),
    restDuration: new FormControl(1),
    rounds: new FormControl(1),
  })
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonSpinner, IonRow, IonGrid, RouterLink, IonModal, IonButtons, IonIcon, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonCol, ReactiveFormsModule],
})
export class HomePage {
  formData = defaultFormGroup();

  timersData: Timer[] = [];

  @ViewChild(IonModal) addTimerModal!: IonModal;

  modalType: "create" | "edit" = "create";
  timerTitle: string = "";
  timerToEditId: number = 0;

  isLoading = true;
  isFormLoading = false;

  errorMessage = "";


  openAddTimerModal() {
    this.timerTitle = "Add timer"
    this.modalType = "create";
    this.formData = defaultFormGroup();

    this.addTimerModal.present();
  }

  openEditTimerModal(timer: Timer) {
    this.timerTitle = "Edit timer";
    this.modalType = "edit";
    this.timerToEditId = timer.id;

    this.formData = new FormGroup({
      name: new FormControl(timer.name),
      exerciseDuration: new FormControl(timer.exerciseDuration),
      restDuration: new FormControl(timer.restDuration),
      rounds: new FormControl(timer.rounds),
    })

    this.addTimerModal.present();
  }

  closeModal() {
    this.addTimerModal.dismiss();
  }

  async onSubmit() {
    try {
      this.isFormLoading = true;
      if (this.modalType === "create")
        await this.timerService.createTimer(this.formData.value as Timer);
      else if (this.modalType === "edit")
        await this.timerService.updateTimer(this.timerToEditId, this.formData.value as Timer);
      this.timersData = await this.timerService.getTimers();
      this.closeModal();
      this.errorMessage = "";
    } catch (error) {
      this.errorMessage = (error as AxiosError<ErrorResponse>).response?.data?.error || 'Unknown error';
      console.error('Error creating timer:', error);
    } finally {
      this.isFormLoading = false;
    }
  }

  async deleteTimer(id: number) {
    try {
      await this.timerService.deleteTimer(id);
      this.timersData = await this.timerService.getTimers();
    } catch (error) {
      console.error('Error deleting timer:', error);
    }
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  async ngOnInit() {
    try {
      this.timersData = await this.timerService.getTimers();
      this.isLoading = false;
    } catch (error) {
      console.error('Failed to fetch timers:', error);
    }
  }

  constructor(private router: Router, private timerService: TimerService) {
    addIcons({ pencil, add, trash, close });
  }
}
