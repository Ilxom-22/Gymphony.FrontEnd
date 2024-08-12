import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { authGuard } from '../../core/guards/auth.guard';
import { userProfileResolver } from './services/user-profile.resolver';

const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [authGuard], resolve: { '': userProfileResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
