import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, delay, EMPTY, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { passwordValidator } from '../../../../shared/validators/password-validator';
import { PasswordReset } from '../../interfaces/password-reset.interface';
import { ModalService } from '../../services/modal.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  public token?: string;

  public passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup: FormGroup = control as FormGroup;
    const password: any = formGroup.get('newPassword')?.value;
    const confirmPassword: any = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  public resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), passwordValidator()]),
    confirmPassword: new FormControl<string>('', [Validators.required])},
    { validators: this.passwordMatchValidator }
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthService,
    private modalService: ModalService,
    private messageService: MessageService) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = decodeURIComponent(params['Token']);
    });
  }

  public onSubmit(): void {
    if (!this.token || this.resetPasswordForm.invalid) {
      return;
    }

    const passwordReset: PasswordReset = this.resetPasswordForm.value as PasswordReset;
    passwordReset.token = this.token;

    this.authService.resetPassword(passwordReset)
      .pipe(
        tap(() => this.messageService.triggerSuccess('Password reset successful.')),
        delay(1000),
        tap(() => this.router.navigate(['/home'])),
        tap(() => this.modalService.showLoginModal()),
        catchError((error: ApiError) => {
          if (error.status === 400) {
            this.messageService.triggerError(error.detail);
          } else {
            this.messageService.triggerError('An unexpected error occured');
          }

          return EMPTY;
        })
      )
      .subscribe();
  }
}
