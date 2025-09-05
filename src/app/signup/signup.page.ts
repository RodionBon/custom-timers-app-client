import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, IonInput, IonList } from '@ionic/angular/standalone';
import { AuthService } from 'src/services/auth.service';
import { Credentials } from 'src/types';

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

  async onSubmit() {
    try {
      const responseData = await this.authService.signUp(this.formData.value as Credentials);
      localStorage.setItem('token', responseData.token);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  constructor(private router: Router, private authService: AuthService) {
  }
}
