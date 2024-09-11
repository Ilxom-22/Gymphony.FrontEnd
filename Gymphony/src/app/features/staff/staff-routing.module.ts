import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsManagementPageComponent } from './pages/admins-management-page/admins-management-page.component';

const routes: Routes = [
  { path: 'admins', component: AdminsManagementPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
