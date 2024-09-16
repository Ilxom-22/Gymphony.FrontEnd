import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, filter, switchMap, tap } from 'rxjs';

import { User } from '../../interfaces/user';
import { ModalService } from '../../../features/auth/services/modal.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MessageService } from '../../../shared/services/message.service';


@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.css'
})
export class ProfileIconComponent {
  @Input() user?: User | null;

  constructor(
    private modalService: ModalService, 
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) { }
  
  public openLoginDialog(): void {
    this.modalService.showLoginModal();
  }

  public logout(): void {
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
}
