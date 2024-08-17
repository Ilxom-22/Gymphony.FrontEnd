import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, EMPTY, filter, switchMap, tap } from 'rxjs';
import { format } from 'date-fns';

import { MembershipPlan } from '../../interfaces/membership-plan';
import { MessageService } from '../../../../shared/services/message.service';
import { ModalService } from '../../../auth/services/modal.service';
import { MembershipPlansService } from '../../services/membership-plans.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { MembershipPlanDetails } from '../../interfaces/membership-plan-details';
import { MembershipPlanMapper } from '../../services/membership-plan-mapper';

@Component({
  selector: 'app-admin-membership-plan',
  templateUrl: './admin-membership-plan.component.html',
  styleUrl: './admin-membership-plan.component.css'
})
export class AdminMembershipPlanComponent {
  @Input() plan!: MembershipPlan;
  @Output() planPublished = new EventEmitter<MembershipPlan>();
  @Output() planUpdated = new EventEmitter<MembershipPlan>();
  @Output() planDeleted = new EventEmitter<string>();
  @Output() planDeactivated = new EventEmitter<MembershipPlan>();

  constructor(
    private membershipPlansService: MembershipPlansService,
    private messageService: MessageService,
    private modalService: ModalService,
    private membershipPlanMapper: MembershipPlanMapper) { }

  public onDetailsClicked(): void {
    this.membershipPlansService.getMembershipPlanDetails(this.plan.id)
      .pipe(
        tap((planDetails: MembershipPlanDetails) => 
          this.modalService.showMembershipPlanDetailsModal(planDetails)),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured.');
          return EMPTY;
        })
      )
      .subscribe();
  }  

  public onEditClicked(): void { 
    const dialogRef = this.modalService.showDraftMembershipPlan(this.membershipPlanMapper.membershipPlanToDraft(this.plan));

    dialogRef.afterClosed().pipe(
      filter((membershipPlan: MembershipPlan | null) => membershipPlan !== null && typeof(membershipPlan) === 'object'),
      tap((membershipPlan: MembershipPlan) =>{
        console.log('updated');
        console.log(membershipPlan);
        this.planUpdated.emit(membershipPlan);
      })
    )
    .subscribe();
  }

  public onPriceChangeClicked(): void {
    const dialogRef = this.modalService.showPriceModal(this.plan.id, this.plan.price);

      dialogRef.afterClosed().pipe(
        filter((newPrice: number | null) => newPrice !== null && typeof(newPrice) === 'number'),
        tap((newPrice: number) => {
          const membershiPlan = { ...this.plan, price: newPrice };
          this.planUpdated.emit(membershiPlan);
        })
      )
      .subscribe();
  }

  public onPublishClicked(): void {
    const dialogRef = this.modalService.showPublishDateModal(this.plan.name);

    dialogRef.afterClosed().pipe(
      filter((selectedDate: Date | null) => selectedDate !== null && selectedDate instanceof Date),
      switchMap((selectedDate: Date) => this.membershipPlansService.publishMembershipPlan(this.plan.id, format(selectedDate, 'yyyy-MM-dd'))),
      tap((membershipPlan: MembershipPlan) => {
        this.planPublished.emit(membershipPlan);
        this.messageService.triggerSuccess(`Membership plan - "${this.plan.name}" is published successfully.`)
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured.');
        return EMPTY;
      })
    )
    .subscribe();
  }

  public onDeleteClicked(): void {
    const dialogRef = this.modalService.showConfirmationModal(`Are you sure to delete "${this.plan.name}" ?`, 'Deletion Confirmation');

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => this.membershipPlansService.deleteMembershipPlan(this.plan.id)),
      tap(() => {
        this.planDeleted.emit(this.plan.id);
        this.messageService.triggerSuccess(`Membership plan named "${this.plan.name}" is deleted.`);
      }),
      catchError((error: ApiError) => {
        if (error.status === 422) {
          this.messageService.triggerError(error.detail)
        } else if (error.status === 400 || 500) {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
        }

        return EMPTY;
      })
    )
    .subscribe();
  }

  public onDeactivateClicked(): void {
    const dialogref = this.modalService.showConfirmationModal(`You are about to deactivate the membership plan - "${this.plan.name}". Once performed this action can't be undone.`, 'Deactivation Confirmation');

    dialogref.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => this.membershipPlansService.deactivateMembershipPlan(this.plan.id)),
      tap((deactivatedPlan: MembershipPlan) => {
        this.planDeactivated.emit(deactivatedPlan);
        this.messageService.triggerSuccess(`${this.plan.name} plan is deactivated.`);
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured. Please try again later.');
        return EMPTY;
      })
    )
    .subscribe();
  }
}
