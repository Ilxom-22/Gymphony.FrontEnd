import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SignInDetails } from '../../interfaces/sign-in-details.interface';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  loginForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    authData: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)])
  });

  constructor(
    private modalService: ModalService,
    private authService: AuthService) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const signInDetails = this.loginForm.value as SignInDetails;
      this.authService.signIn(signInDetails).pipe(
        tap(() => this.modalService.closeAllModals()),
      )
      .subscribe(response => response);
    }
  }

  public openRegisterModal(): void {
    this.modalService.showRegisterModal();
  }
}
