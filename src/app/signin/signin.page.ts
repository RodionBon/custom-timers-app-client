import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, IonInput, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'signin-page',
  templateUrl: 'signin.page.html',
  styleUrls: ['signin.page.scss'],
  imports: [IonList, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReactiveFormsModule],
})
export class SigninPage {
  formData = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
  }

  constructor(private router: Router) {
  }
}
