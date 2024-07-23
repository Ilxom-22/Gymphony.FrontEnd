import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignInDetails } from '../../interfaces/sign-in-details.interface';
import { IdentityToken } from '../../interfaces/identity-token.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    authData: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)])
  });

  identityToken?: IdentityToken;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const signInDetails = this.loginForm.value as SignInDetails;
      this.authService.signIn(signInDetails).subscribe(response => this.identityToken = response);
    }
  }
}
