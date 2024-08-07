import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SignUpDetails } from '../../interfaces/sign-up-details.interface';
import { alphabeticValidator } from '../../../../shared/validators/alphabetic-validator';
import { passwordValidator } from '../../../../shared/validators/password-validator';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { SignInDetails } from '../../interfaces/sign-in-details.interface';


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
    private router: Router) { }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const signUpDetails: SignUpDetails = this.registerForm.value as SignUpDetails;
      this.authService.signUp(signUpDetails).pipe(
        tap(() => {
          const signInDetails: SignInDetails = signUpDetails as SignInDetails;
          
          this.authService.signIn(signInDetails).subscribe()
          this.modalService.closeAllModals();
          this.router.navigate(['/home']);
        }),
      )
      .subscribe();
  }

  public openLoginModal(): void {
    this.modalService.showLoginModal();
  }
}
