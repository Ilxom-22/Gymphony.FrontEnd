import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, filter, switchMap, tap } from 'rxjs';

import { User } from '../../../../core/interfaces/user';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalService } from '../../../auth/services/modal.service';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css'
})
export class UserInformationComponent {
  @Input() user!: User;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private modalService: ModalService,
    private messageService: MessageService) { }

  public logOut(): void {

    const dialogRef = this.modalService.showConfirmationModal('Are you sure you want to log out?', 'Logout Confirmation');

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => this.authService.logout()),
      tap(() => {
        this.router.navigate(['/home']);
        this.messageService.triggerSuccess('Log Out successful.');
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured. Please try again later.');
        return EMPTY;
      })
    )
    .subscribe();
  }

  public openChangePasswordDialog(): void {
    this.modalService.showChangePasswordModal(this.user);
  }
}
