import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipPlansRoutingModule } from './membership-plans-routing.module';
import { MembershipPlansContainerComponent } from './pages/membership-plans-container/membership-plans-container.component';
import { MembershipPlanComponent } from './components/membership-plan/membership-plan.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MembershipPlansContainerComponent,
    MembershipPlanComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MembershipPlansRoutingModule
  ]
})
export class MembershipPlansModule { }
