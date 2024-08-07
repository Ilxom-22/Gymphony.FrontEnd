import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  header: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.header = data.header;
    this.message = data.message;
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onOk(): void {
    this.dialogRef.close(true);
  }
}
