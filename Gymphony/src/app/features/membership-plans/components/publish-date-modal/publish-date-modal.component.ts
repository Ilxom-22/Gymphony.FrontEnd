import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-publish-date-modal',
  templateUrl: './publish-date-modal.component.html',
  styleUrl: './publish-date-modal.component.css'
})
export class PublishDateModalComponent {
  public selectedDate: Date | null = null;
  public productName: string | null;

  public dateForm: FormGroup = new FormGroup({
    selectedDate: new FormControl<Date>(new Date(), [Validators.required, this.dateValidator])
  });

  public dateValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDateOnly = new Date(control.value);
      selectedDateOnly.setHours(0, 0, 0, 0);

      return selectedDateOnly < today ? { invalidDate: true } : null;
    }
    return null;
  }


  constructor(
    private dialogRef: MatDialogRef<PublishDateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
      this.productName = data;
  }

  public submitDate(): void {
    if (this.dateForm.invalid) {
      return;
    }

    this.dialogRef.close(this.dateForm.value.selectedDate);
  }
}
