import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipPlansRoutingModule } from './membership-plans-routing.module';
import { MembershipPlansContainerComponent } from './pages/membership-plans-container/membership-plans-container.component';
import { MembershipPlanComponent } from './components/membership-plan/membership-plan.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminMembershipPlansContainerComponent } from './pages/admin-membership-plans-container/admin-membership-plans-container.component';
import { AdminMembershipPlanComponent } from './components/admin-membership-plan/admin-membership-plan.component';
import { MembershipPlanDetailsModalComponent } from './components/membership-plan-details-modal/membership-plan-details-modal.component';
import { PublishDateModalComponent } from './components/publish-date-modal/publish-date-modal.component';
import { DraftMembershipPlanComponent } from './components/draft-membership-plan/draft-membership-plan.component';
import { PriceModalComponent } from './components/price-modal/price-modal.component';


@NgModule({
  declarations: [
    MembershipPlansContainerComponent,
    MembershipPlanComponent,
    AdminMembershipPlansContainerComponent,
    AdminMembershipPlanComponent,
    MembershipPlanDetailsModalComponent,
    PublishDateModalComponent,
    DraftMembershipPlanComponent,
    PriceModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MembershipPlansRoutingModule
  ]
})
export class MembershipPlansModule { }
