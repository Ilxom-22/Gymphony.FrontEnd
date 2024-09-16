import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';

import { User } from '../../../../core/interfaces/user';
import { ModalService } from '../../../auth/services/modal.service';
import { StaffService } from '../../services/staff.service';
import { MessageService } from '../../../../shared/services/message.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user!: User;
  @Output() userBlocked = new EventEmitter<string>();
  @Output() userUnblocked = new EventEmitter<string>();
  @Output() userRemoved = new EventEmitter<string>();
  public dropdownOpen: boolean = false;

  constructor(
    private modalService: ModalService, 
    private staffService: StaffService,
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  public unblockAdmin(): void {
    this.modalService.showConfirmationModal(`Are you sure to unblock "${this.user.firstName} ${this.user.lastName}"?`, 'Unblock Confirmation')
      .afterClosed().pipe(
        filter((result: boolean) => result),
        tap(() => this.loaderService.show()),
        switchMap(() => this.staffService.unblockAdmin(this.user.id)),
        tap(() => {
          this.userUnblocked.emit(this.user.id);
          this.messageService.triggerSuccess('Admin account unblocked successfully!');
        }),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public blockAdmin(): void {
    this.modalService.showConfirmationModal(`Are you sure to block "${this.user.firstName} ${this.user.lastName}"?`, 'Block Confirmation')
      .afterClosed().pipe(
        filter((result: boolean) => result),
        tap(() => this.loaderService.show()),
        switchMap(() => this.staffService.blockAdmin(this.user.id)),
        tap(() => {
          this.userBlocked.emit(this.user.id);
          this.messageService.triggerSuccess('Admin account blocked successfully!');
        }),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public remove(): void {
    this.modalService.showConfirmationModal(`Are you sure to remove "${this.user.firstName} ${this.user.lastName}"?`, 'Removal Confirmation')
      .afterClosed().pipe(
        filter((result: boolean) => result),
        tap(() => this.loaderService.show()),
        switchMap(() => this.staffService.removeAdmin(this.user.id)),
        tap(() => {
          this.userRemoved.emit(this.user.id);
          this.messageService.triggerSuccess('Admin removed successfully!');
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public toggleDropDown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
