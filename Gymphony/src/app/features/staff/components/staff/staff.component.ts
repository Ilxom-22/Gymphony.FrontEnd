import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Staff } from '../../../courses/interfaces/staff';
import { ModalService } from '../../../auth/services/modal.service';
import { StaffService } from '../../services/staff.service';
import { MessageService } from '../../../../shared/services/message.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { catchError, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { ApiError } from '../../../../core/interfaces/api-error';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  @Input() staff!: Staff;
  @Output() staffRemoved = new EventEmitter<string>();
  public dropdownOpen: boolean = false;

  constructor(
    private modalService: ModalService, 
    private staffService: StaffService,
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  
  public remove(): void {
    this.modalService.showConfirmationModal(`Are you sure to remove "${this.staff.firstName} ${this.staff.lastName}"?`, 'Removal Confirmation')
      .afterClosed().pipe(
        filter((result: boolean) => result),
        tap(() => this.loaderService.show()),
        switchMap(() => this.staffService.removeStaff(this.staff.id)),
        tap(() => {
          this.staffRemoved.emit(this.staff.id);
          this.messageService.triggerSuccess('Staff removed successfully!');
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

  public toggleDropDown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
