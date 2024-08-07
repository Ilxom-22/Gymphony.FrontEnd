import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { RegisterModalComponent } from '../components/register-modal/register-modal.component';
import { ForgotPasswordModalComponent } from '../components/forgot-password-modal/forgot-password-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  public showLoginModal(): MatDialogRef<LoginModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(LoginModalComponent);

    return dialogRef;
  }

  public showRegisterModal(): MatDialogRef<RegisterModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(RegisterModalComponent);

    return dialogRef;
  }

  public showForgotPasswordModal(): MatDialogRef<ForgotPasswordModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(ForgotPasswordModalComponent);

    return dialogRef;
  }

  public closeAllModals(): void {
    this.dialog.closeAll();
  }
}
