import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipPlansContainerComponent } from './pages/membership-plans-container/membership-plans-container.component';

const routes: Routes = [
  { path: '', component: MembershipPlansContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipPlansRoutingModule { }
