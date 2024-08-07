import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { RegisterModalComponent } from '../components/register-modal/register-modal.component';
import { ForgotPasswordModalComponent } from '../components/forgot-password-modal/forgot-password-modal.component';
import { ChangePasswordModalComponent } from '../../user-profile/components/change-password-modal/change-password-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';


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

  public showChangePasswordModal(): MatDialogRef<ChangePasswordModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(ChangePasswordModalComponent);

    return dialogRef;
  }

  public showConfirmationModal(message: string, header?: string): MatDialogRef<ConfirmationModalComponent, any> {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { header, message }
    });

    return dialogRef;
  }


  public closeAllModals(): void {
    this.dialog.closeAll();
  }
}
