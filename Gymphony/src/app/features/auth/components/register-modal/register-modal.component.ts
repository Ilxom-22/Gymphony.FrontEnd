import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUpDetails } from '../../interfaces/sign-up-details.interface';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { alphabeticValidator } from '../../../../shared/validators/alphabetic-validator';
import { passwordValidator } from '../../../../shared/validators/password-validator';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const formGroup = control as FormGroup;
    const password = formGroup.get('authData')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    authData: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required])},
    { validators: this.passwordMatchValidator }
  );

  constructor(private modalService: ModalService, private authService: AuthService) { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const signUpDetails = this.registerForm.value as SignUpDetails;
      this.authService.signUp(signUpDetails).subscribe(response => response);
    }
  }

  openLoginModal() {
    this.modalService.showLoginModal();
  }

}
