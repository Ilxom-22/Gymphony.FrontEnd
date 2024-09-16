import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { MessageService } from '../../../../shared/services/message.service';
import { LoaderService } from '../../../../core/services/loader.service';


@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.css'
})
export class ForgotPasswordModalComponent {
  public emailForm: FormGroup = new FormGroup({
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  public onSubmit(): void {
    if (this.emailForm.invalid) {
      return;
    }

    this.loaderService.show();
    this.authService.forgotPassword(this.emailForm.controls['emailAddress'].value)
      .pipe(
        tap(() => {
          this.modalService.closeAllModals();
          this.messageService.triggerSuccess('Email meassage was sent to your inbox.');
        }),
        catchError((error: ApiError) => {
          if (error.status == 400) {
            this.messageService.triggerError(error.detail);
          }
          
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public onClose(): void {
    this.modalService.closeAllModals();
  }
}
