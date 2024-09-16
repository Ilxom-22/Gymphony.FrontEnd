import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginModalComponent,
    RegisterModalComponent,
    AccountVerificationComponent,
    ForgotPasswordModalComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
