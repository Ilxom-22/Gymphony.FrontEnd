import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';

import { MessageService } from '../../../../shared/services/message.service';
import { MembershipPlansService } from '../../services/membership-plans.service';
import { ApiError } from '../../../../core/interfaces/api-error';

@Component({
  selector: 'app-price-modal',
  templateUrl: './price-modal.component.html',
  styleUrl: './price-modal.component.css'
})
export class PriceModalComponent {
  public productId: string;
  public price: number;
  public priceForm!: FormGroup;

  public priceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value.price === this.price) {
      return { priceNotChanged: true };
    } else if (control.value <= 1) {
      return { priceInvalid: true };
    }

    return null;
  };

  constructor(
    private dialogRef: MatDialogRef<PriceModalComponent>,
    private messageService: MessageService,
    private membershipPlansService: MembershipPlansService,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string, price: number }) {
      this.productId = data.productId;
      this.price = data.price;
  }

  public ngOnInit(): void {
    this.priceForm = new FormGroup({
      price: new FormControl<number>(this.price, [Validators.required, this.priceValidator])
    });
  }

  public submitPrice(): void {
    if (this.priceForm.invalid) {
      return;
    }
      
    this.membershipPlansService.updateProductPrice(this.productId, this.priceForm.value.price).pipe(
      tap(() => {
        this.dialogRef.close(this.priceForm.value.price);
        this.messageService.triggerSuccess('Price updated successfully.');
      }),
      catchError((error: ApiError) => {
        if (error.status === 400) {
          this.messageService.triggerError(error.detail);
        } else if (error.status === 500) {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
        }
        return EMPTY;
      })
    )
    .subscribe();
  }
}
