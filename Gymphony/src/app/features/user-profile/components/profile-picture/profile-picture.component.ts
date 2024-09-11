import { Component, Input } from '@angular/core';
import { catchError, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';

import { User } from '../../../../core/interfaces/user';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { ModalService } from '../../../auth/services/modal.service';
import { UserProfileImage } from '../../../../core/interfaces/user-profile-image';
import { FilesService } from '../../../../core/services/files.service';
import { MessageService } from '../../../../shared/services/message.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {
  @Input() user!: User;

  constructor(
    private authService: AuthService,
    private filesService: FilesService, 
    private userService: UserService,
    private modalService: ModalService,
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  public onResendVerificationEmail(): void {
    const dialogRef = this.modalService.showConfirmationModal(`We are going to send a message to the ${this.user.emailAddress} email address with a link for verifiying your account!`, 'Account Verification');

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => {
        return this.authService.resendAccountVerificationEmail(this.user.emailAddress).pipe(
          tap(() => this.messageService.triggerSuccess('Email message is sent to your inbox.')),
          catchError(() => {
            this.messageService.triggerError('An unexpected error occured. Please try again later.');
            return EMPTY;
          })
        )
      })
    )
    .subscribe();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('profileImage', file);

      this.loaderService.show();
      this.filesService.uploadProfileImage(formData)
        .pipe(
          filter((profileImage: UserProfileImage) => profileImage !== null),
          tap((profileImage: UserProfileImage) => {
            const updatedUser = { ...this.user, profileImage: profileImage };
            this.userService.setUser(updatedUser);
          }),
          catchError((error: ApiError) => {
            if (error.status === 400) {
              this.messageService.triggerError(error.detail);
            } else if (error. status === 500) {
              this.messageService.triggerError('An unexpected error occured. Please try again later.')
            }

            return EMPTY;
          }),
          finalize(() => this.loaderService.hide())
        )
        .subscribe();
    }
  }
}
