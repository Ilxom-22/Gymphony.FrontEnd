import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { MessageService } from '../../../../shared/services/message.service';
import { SignUpDetails } from '../../../auth/interfaces/sign-up-details.interface';
import { ApiError } from '../../../../core/interfaces/api-error';
import { alphabeticValidator } from '../../../../shared/validators/alphabetic-validator';
import { StaffService } from '../../services/staff.service';
import { User } from '../../../../core/interfaces/user';
import { LoaderService } from '../../../../core/services/loader.service';


@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrl: './add-admin-modal.component.css'
})
export class AddAdminModalComponent {
  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    lastName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email])
  });

  constructor(
    private staffService: StaffService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<AddAdminModalComponent>) { }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loaderService.show();

    const signUpDetails: SignUpDetails = this.registerForm.value as SignUpDetails;
    signUpDetails.authData = '';
    this.staffService.addAdmin(signUpDetails).pipe(
      tap((admin: User) => {
        this.dialogRef.close(admin);
        this.messageService.triggerSuccess('A new admin has been registered successfully!\nThe admin will receive an email with temporary credentials.\nThe account of the admin will be activated once he/she logs in to the admin console.', 10000);
      }),
      catchError((error: ApiError) => {
        if (error.status === 400) {
          this.messageService.triggerError(error.detail);
        }

        return EMPTY;
      }),
      finalize(() => this.loaderService.hide())
    )
    .subscribe();
  }
}
