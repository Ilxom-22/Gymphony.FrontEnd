import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.css'
})
export class ForgotPasswordModalComponent {
  public emailForm: FormGroup = new FormGroup({
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  constructor(private modalService: ModalService, private authService: AuthService) { }

  public onSubmit() {
    this.authService.forgotPassword(this.emailForm.controls['emailAddress'].value)
      .pipe(tap(() => this.modalService.closeAllModals()))
      .subscribe();
  }

  public onClose() {
    this.modalService.closeAllModals();
  }
}
