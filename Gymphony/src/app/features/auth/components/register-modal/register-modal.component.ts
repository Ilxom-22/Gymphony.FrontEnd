import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, EMPTY, finalize, switchMap, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SignUpDetails } from '../../interfaces/sign-up-details.interface';
import { alphabeticValidator } from '../../../../shared/validators/alphabetic-validator';
import { passwordValidator } from '../../../../shared/validators/password-validator';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { SignInDetails } from '../../interfaces/sign-in-details.interface';
import { MessageService } from '../../../../shared/services/message.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { LoaderService } from '../../../../core/services/loader.service';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  public passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup: FormGroup = control as FormGroup;
    const password: any = formGroup.get('authData')?.value;
    const confirmPassword: any = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    lastName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email]),
    authData: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), passwordValidator()]),
    confirmPassword: new FormControl<string>('', [Validators.required])},
    { validators: this.passwordMatchValidator }
  );

  constructor(
    private modalService: ModalService, 
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loaderService.show();
    const signUpDetails: SignUpDetails = this.registerForm.value as SignUpDetails;
    this.authService.signUp(signUpDetails).pipe(
      switchMap(() => {
        const signInDetails: SignInDetails = signUpDetails as SignInDetails;
        return this.authService.signIn(signInDetails).pipe(
          tap(() => {
            this.modalService.closeAllModals();
            this.router.navigate(['/home']);
          }),
          catchError(() => {
            this.modalService.closeAllModals();
            this.router.navigate(['/home']).then(() => this.modalService.showLoginModal());
            this.messageService.triggerSuccess('Registration successful. You can login using the credentials you provided while registering.')

            return EMPTY;
          }),
          finalize(() => this.loaderService.hide())
        )
      }),
      tap(() => this.messageService.triggerSuccess('Registration successful.')),
      catchError((error: ApiError) => {
        if (error.status === 400) {
          this.messageService.triggerError(error.detail);
        }

        return EMPTY;
      }),
      finalize(() => this.loaderService.hide())
    ).subscribe();
  }

  public openLoginModal(): void {
    this.modalService.showLoginModal();
  }
}
