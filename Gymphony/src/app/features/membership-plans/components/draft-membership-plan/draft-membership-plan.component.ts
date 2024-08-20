import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';

import { DraftMembershipPlan } from '../../interfaces/draft-membership-plan';
import { MembershipPlansService } from '../../services/membership-plans.service';
import { MembershipPlan } from '../../interfaces/membership-plan';
import { ApiError } from '../../../../core/interfaces/api-error';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-draft-membership-plan',
  templateUrl: './draft-membership-plan.component.html',
  styleUrl: './draft-membership-plan.component.css'
})
export class DraftMembershipPlanComponent {
  public membershipPlan: DraftMembershipPlan;
  public isNewPlan: boolean;
  public membershipPlanForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DraftMembershipPlanComponent>,
    private membershipPlansService: MembershipPlansService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DraftMembershipPlan | null) { 
      this.isNewPlan = data === null;
      this.membershipPlan = data !== null 
        ? data 
        : {
            membershipPlanId: '',
            name: '',
            description: '',
            durationUnit: '',
            durationCount: 0,
            price: 0,
          };
  }

  public ngOnInit() {
    this.membershipPlanForm = new FormGroup({
      name: new FormControl<string>(this.membershipPlan?.name, Validators.required),
      description: new FormControl<string>(this.membershipPlan.description, Validators.required),
      durationUnit: new FormControl<string>(this.membershipPlan.durationUnit, Validators.required),
      durationCount: new FormControl<string>(this.membershipPlan.durationCount.toString(), Validators.required),
      price: new FormControl<string>(this.membershipPlan.price.toString(), Validators.required),
    });
  }

  public submit(): void {
    if (this.membershipPlanForm.invalid) {
      return;
    }

    const newMembershipPlan = this.membershipPlanForm.value as DraftMembershipPlan;
    newMembershipPlan.membershipPlanId = this.membershipPlan.membershipPlanId;

    if (this.isNewPlan) {
      this.membershipPlansService.createDraftMembershipPlan(newMembershipPlan).pipe(
        tap((membershipPlan: MembershipPlan) => {
          this.dialogRef.close(membershipPlan);
          this.messageService.triggerSuccess(`Membership plan - "${newMembershipPlan.name}" is created successfully in draft status.`);
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
    else {
      this.membershipPlansService.updateMembershipPlan(newMembershipPlan).pipe(
        tap((membershipPlan: MembershipPlan) => {
          this.dialogRef.close(membershipPlan);
          this.messageService.triggerSuccess(`Membership plan updated successfully.`);
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
}
