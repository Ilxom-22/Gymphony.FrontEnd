import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { MessageService } from '../../../../shared/services/message.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { alphabeticValidator } from '../../../../shared/validators/alphabetic-validator';
import { StaffService } from '../../services/staff.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { StaffSignUpDetails } from '../../interfaces/staff-sign-up-details';
import { Staff } from '../../../courses/interfaces/staff';

@Component({
  selector: 'app-add-staff-modal',
  templateUrl: './add-staff-modal.component.html',
  styleUrl: './add-staff-modal.component.css'
})
export class AddStaffModalComponent {
  public selectedFile: File | null = null;
  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    lastName: new FormControl<string>('', [Validators.required, Validators.minLength(2), Validators.maxLength(64), alphabeticValidator()]),
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email]),
    bio: new FormControl<string>('', Validators.required)
  });

  constructor(
    private staffService: StaffService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<AddStaffModalComponent>) { }


  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    if (!this.selectedFile) {
      this.messageService.triggerError('Upload staff profile image, please.');
      return;
    }

    this.loaderService.show();

    const signUpDetails: StaffSignUpDetails = this.registerForm.value as StaffSignUpDetails;
    const formData = new FormData();
    formData.append('firstName', signUpDetails.firstName);
    formData.append('lastName', signUpDetails.lastName);
    formData.append('emailAddress', signUpDetails.emailAddress);
    formData.append('bio', signUpDetails.bio);
    formData.append('profileImage', this.selectedFile!);

    this.staffService.addStaff(formData).pipe(
      tap((admin: Staff) => {
        this.dialogRef.close(admin);
        this.messageService.triggerSuccess('New staff has been registered successfully!');
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
