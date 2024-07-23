import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUpDetails } from '../../interfaces/sign-up-details.interface';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../../../../core/interfaces/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('authData')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    console.log(password === confirmPassword);
    return password === confirmPassword ? null : { mismatch: true };
  };

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    authData: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    confirmPassword: new FormControl('', [Validators.required])},
    { validators: this.passwordMatchValidator }
  );

  user?: User;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const signUpDetails = this.registerForm.value as SignUpDetails;
      this.authService.signUp(signUpDetails).subscribe(response => this.user = response);
    }
  }
}

