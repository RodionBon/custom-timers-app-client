import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, IonInput, IonList, IonLabel } from '@ionic/angular/standalone';
import { AxiosError } from 'axios';
import { AuthService } from 'src/services/auth.service';
import { Credentials, ErrorResponse } from 'src/types';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
  imports: [IonLabel, IonList, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, ReactiveFormsModule, RouterLink],
})
export class SignupPage {
  formData = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
  })
  errorMessage = "";


  async onSubmit() {
    try {
      const responseData = await this.authService.signUp(this.formData.value as Credentials);
      localStorage.setItem('token', responseData.token);
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = (error as AxiosError<ErrorResponse>).response?.data?.error || 'Unknown error';
      console.error('Signup failed:', error);
    }
  }

  constructor(private router: Router, private authService: AuthService) {
  }
}
