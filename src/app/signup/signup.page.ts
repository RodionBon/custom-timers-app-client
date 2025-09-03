import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, IonInput, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
  imports: [IonList, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReactiveFormsModule],
})
export class SignupPage {
  formData = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
  }

  constructor(private router: Router) {
  }
}
