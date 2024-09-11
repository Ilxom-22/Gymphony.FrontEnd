import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsManagementPageComponent } from './pages/admins-management-page/admins-management-page.component';
import { StaffManagementPageComponent } from './pages/staff-management-page/staff-management-page.component';

const routes: Routes = [
  { path: 'admins', component: AdminsManagementPageComponent },
  { path: 'instructors', component: StaffManagementPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
