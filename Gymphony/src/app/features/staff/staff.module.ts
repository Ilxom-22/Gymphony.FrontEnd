import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { AdminsManagementPageComponent } from './pages/admins-management-page/admins-management-page.component';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../../shared/shared.module';
import { AddAdminModalComponent } from './components/add-admin-modal/add-admin-modal.component';


@NgModule({
  declarations: [
    AdminsManagementPageComponent,
    UserComponent,
    AddAdminModalComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
