import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { authGuard } from '../../core/guards/auth.guard';
import { userProfileResolver } from './services/user-profile.resolver';
import { PersonalCalendarComponent } from './pages/personal-calendar/personal-calendar.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [authGuard], resolve: { '': userProfileResolver } },
  { path: 'personal-calendar', component: PersonalCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
