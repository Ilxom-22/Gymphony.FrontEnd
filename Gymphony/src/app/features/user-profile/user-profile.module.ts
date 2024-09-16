import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { MembershipPlanSubscriptionComponent } from './components/membership-plan-subscription/membership-plan-subscription.component';
import { CourseSubscriptionsContainerComponent } from './components/course-subscriptions-container/course-subscriptions-container.component';
import { CourseSubscriptionComponent } from './components/course-subscription/course-subscription.component';
import { PersonalCalendarComponent } from './pages/personal-calendar/personal-calendar.component';
import { PersonalSchedulesComponent } from './components/personal-schedules/personal-schedules.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ProfilePictureComponent,
    UserInformationComponent,
    ChangePasswordModalComponent,
    MembershipPlanSubscriptionComponent,
    CourseSubscriptionsContainerComponent,
    CourseSubscriptionComponent,
    PersonalCalendarComponent,
    PersonalSchedulesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
