import { Component } from '@angular/core';
import { catchError, EMPTY, filter, finalize, tap } from 'rxjs';

import { StaffService } from '../../services/staff.service';
import { MessageService } from '../../../../shared/services/message.service';
import { ModalService } from '../../../auth/services/modal.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { Staff } from '../../../courses/interfaces/staff';


@Component({
  selector: 'app-staff-management-page',
  templateUrl: './staff-management-page.component.html',
  styleUrl: './staff-management-page.component.css'
})
export class StaffManagementPageComponent {
  public staff: Staff[] = [];

  constructor(
    private staffService: StaffService,
    private messageService: MessageService,
    private modalService: ModalService,
    private loaderService: LoaderService) { }
  
  public ngOnInit(): void {
    this.loaderService.show();

    this.staffService.getAllStaff().pipe(
        tap((staff: Staff[]) => this.staff = staff),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public onAddStaff(): void {
    this.modalService.showAddStaffModal()
      .afterClosed().pipe(
        filter((staff: Staff | null) => staff !== null && typeof(staff) === 'object'),
        tap((staff: Staff) => this.staff.push(staff))
      )
      .subscribe();
  }

  public userRemoved(userId: string): void {
    this.staff = this.staff.filter(staff => staff.id !== userId);
  }
}
