import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'verify-account', component: AccountVerificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
