import { Component, Input } from '@angular/core';
import { filter, tap } from 'rxjs';

import { User } from '../../../../core/interfaces/user';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { ModalService } from '../../../auth/services/modal.service';
import { UserProfileImage } from '../../../../core/interfaces/user-profile-image';
import { FilesService } from '../../../../core/services/files.service';

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
    private modalService: ModalService) { }

  public onResendVerificationEmail(): void {
    const dialogRef = this.modalService.showConfirmationModal(`We are going to send a message to the ${this.user.emailAddress} email address with a link for verifiying your account!`, 'Account Verification');

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      tap(() => this.authService.resendAccountVerificationEmail(this.user.emailAddress).subscribe())
    )
    .subscribe();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('profileImage', file);

      this.filesService.uploadProfileImage(formData)
        .pipe(
          tap((profileImage: UserProfileImage) => {
            if (profileImage) {
              const updatedUser = { ...this.user, profileImage: profileImage };
              this.userService.setUser(updatedUser);
            }
          })
        )
        .subscribe();
    }
  }
}
