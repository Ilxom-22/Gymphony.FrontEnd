import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SignInDetails } from '../../interfaces/sign-in-details.interface';
import { ModalService } from '../../services/modal.service';
import { MessageService } from '../../../../shared/services/message.service';
import { ApiError } from '../../../../core/interfaces/api-error';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  public loginForm: FormGroup = new FormGroup({
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email]),
    authData: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)])
  });

  constructor(
    private modalService: ModalService, 
    private authService: AuthService,
    private messageService: MessageService) { }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const signInDetails: SignInDetails = this.loginForm.value as SignInDetails;
      this.authService.signIn(signInDetails).pipe(
        tap(() => {
          this.modalService.closeAllModals();
          this.messageService.triggerSuccess('Login successful.');
        }),
        catchError((error: ApiError) => {
          if (error.status === 400 || 401) {
            this.messageService.triggerError(error.detail);
          } else {
            this.messageService.triggerError('An unexpected error occured. Please try again later.')
          }

          return EMPTY;
        })
      )
      .subscribe();
  }

  public openRegisterModal(): void {
    this.modalService.showRegisterModal();
  }

  public openForgotPasswordModal(): void {
    this.modalService.showForgotPasswordModal();
  }
}
