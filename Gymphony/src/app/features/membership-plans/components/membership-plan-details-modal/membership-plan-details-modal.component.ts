import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MembershipPlanDetails } from '../../interfaces/membership-plan-details';

@Component({
  selector: 'app-membership-plan-details-modal',
  templateUrl: './membership-plan-details-modal.component.html',
  styleUrl: './membership-plan-details-modal.component.css'
})
export class MembershipPlanDetailsModalComponent {
  public plan: MembershipPlanDetails;

  constructor(
    public dialogRef: MatDialogRef<MembershipPlanDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MembershipPlanDetails)
  {
      this.plan = data;
  }
}
