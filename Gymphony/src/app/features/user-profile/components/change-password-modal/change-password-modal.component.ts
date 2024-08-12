import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';

import { User } from '../../../../core/interfaces/user';
import { passwordValidator } from '../../../../shared/validators/password-validator';
import { ModalService } from '../../../auth/services/modal.service';
import { ChangePassword } from '../../../auth/interfaces/change-password.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../../core/services/user.service';


@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent {
  public user!: User;

  public passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup: FormGroup = control as FormGroup;
    const password: any = formGroup.get('newPassword')?.value;
    const confirmPassword: any = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  public changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl<string>(''),
    newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), passwordValidator()]),
    confirmPassword: new FormControl<string>('', [Validators.required])},
    { validators: this.passwordMatchValidator }
  );

  constructor(
    private modalService: ModalService, 
    private authService: AuthService, 
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User } ) {
      this.user = data.user;
    }

  public onSubmit(): void {
    if (this.changePasswordForm.invalid)
      return;

    const changePassword: ChangePassword = this.changePasswordForm.value as ChangePassword;
    this.authService.changePassword(changePassword)
    .pipe(
      tap(() => {
        this.modalService.closeAllModals();
        const updatedUser: User = { ...this.user, temporaryPasswordChanged: true};
        this.userService.setUser(updatedUser);
      })
    )
    .subscribe();
  }

  public onClose(): void {
    this.modalService.closeAllModals();
  }
}
