import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, filter, finalize, tap } from 'rxjs';

import { StaffService } from '../../services/staff.service';
import { User } from '../../../../core/interfaces/user';
import { MessageService } from '../../../../shared/services/message.service';
import { AccountStatus } from '../../../../core/enums/accountStatus';
import { ModalService } from '../../../auth/services/modal.service';
import { LoaderService } from '../../../../core/services/loader.service';


@Component({
  selector: 'app-admins-management-page',
  templateUrl: './admins-management-page.component.html',
  styleUrl: './admins-management-page.component.css'
})
export class AdminsManagementPageComponent implements OnInit {
  public admins: User[] = [];

  constructor(
    private staffService: StaffService,
    private messageService: MessageService,
    private modalService: ModalService,
    private loaderService: LoaderService) { }
  
  public ngOnInit(): void {
    this.loaderService.show();

    this.staffService.getAllAdmins().pipe(
        tap((admins: User[]) => this.admins = admins),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public userBlocked(userId: string): void {
    this.admins = this.admins.map(admin => 
      admin.id === userId ? { ...admin, status: AccountStatus.Blocked } : admin
    );
  }

  public userUnblocked(userId: string): void {
    this.admins = this.admins.map(admin => 
      admin.id === userId ? { ...admin, status: AccountStatus.Active } : admin
    );
  }

  public userRemoved(userId: string): void {
    this.admins = this.admins.filter(admin => admin.id !== userId);
  }

  public onAddAdmin(): void {
    this.modalService.showAddAdminModal()
      .afterClosed().pipe(
        filter((admin: User | null) => admin !== null && typeof(admin) === 'object'),
        tap((admin: User) => this.admins.push(admin))
      )
      .subscribe();
  }
}
