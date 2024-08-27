import { Component, OnInit } from '@angular/core';
import { MembershipPlan } from '../../interfaces/membership-plan';
import { MembershipPlansService } from '../../services/membership-plans.service';
import { catchError, EMPTY, filter, finalize, tap } from 'rxjs';
import { MembershipPlans } from '../../interfaces/membership-plans';
import { MessageService } from '../../../../shared/services/message.service';
import { ModalService } from '../../../auth/services/modal.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-admin-membership-plans-container',
  templateUrl: './admin-membership-plans-container.component.html',
  styleUrl: './admin-membership-plans-container.component.css'
})
export class AdminMembershipPlansContainerComponent implements OnInit {
  public draftPlans: MembershipPlan[] = [];
  public activatedPlans: MembershipPlan[] = [];
  public publishedPlans: MembershipPlan[] = [];
  public deactivationRequestedPlans: MembershipPlan[] = [];
  public deactivatedPlans: MembershipPlan[] = [];
  public allPlans: MembershipPlan[] = [];
  public isGridView: boolean = true;

  constructor(
    private membershipPlansService: MembershipPlansService,
    private messageService: MessageService,
    private modalService: ModalService,
    private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.loaderService.show();
    
    this.membershipPlansService.getAllMembershipPlans()
      .pipe(
        tap((membershipPlans: MembershipPlans) => {
          this.draftPlans = membershipPlans.draftPlans;
          this.activatedPlans = membershipPlans.activatedPlans;
          this.publishedPlans = membershipPlans.publishedPlans;
          this.deactivationRequestedPlans = membershipPlans.deactivationRequestedPlans;
          this.deactivatedPlans = membershipPlans.deactivatedPlans;
          this.allPlans = Object.values(membershipPlans).flatMap<MembershipPlan>(plans => plans);
        }),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured.');
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  public switchView(): void {
    this.isGridView = !this.isGridView;
  }

  public onCreateMembershipPlan(): void {
    const dialogRef = this.modalService.showDraftMembershipPlan();

    dialogRef.afterClosed().pipe(
      filter((membershipPlan: MembershipPlan | null) => membershipPlan !== null && typeof(membershipPlan) === 'object'),
      tap((membershipPlan: MembershipPlan) => {
        this.draftPlans.push(membershipPlan);
        this.allPlans = this.draftPlans.concat(this.publishedPlans, this.activatedPlans, this.deactivationRequestedPlans, this.deactivatedPlans);
      })
    )
    .subscribe();
  }
  
  public onPlanDeleted(planId: string): void {
    this.draftPlans = this.draftPlans.filter(plan => plan.id !== planId);
    this.allPlans = this.allPlans.filter(plan => plan.id !== planId);
  }

  public onPlanPublished(publishedPlan: MembershipPlan): void {
    this.draftPlans = this.draftPlans.filter(plan => plan.id !== publishedPlan.id);

    switch(publishedPlan.status) {
      case 'Published':
        this.publishedPlans.push(publishedPlan);
        break;
      case 'Activated':
        this.activatedPlans.push(publishedPlan);
        break;
    }

    this.allPlans = this.draftPlans.concat(this.publishedPlans, this.activatedPlans, this.deactivationRequestedPlans, this.deactivatedPlans);
  }

  public onPlanUpdated(updatedPlan: MembershipPlan): void {
    this.allPlans = this.allPlans.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan);

    switch (updatedPlan.status) {
      case 'Draft': 
        this.draftPlans = this.draftPlans.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan);
        break;
      case 'Activated':
        this.activatedPlans = this.activatedPlans.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan);
        break;
    }   
  }

  public onPlanDeactivated(deactivatedPlan: MembershipPlan): void {
    this.publishedPlans = this.publishedPlans.filter(plan => plan.id !== deactivatedPlan.id);
    this.activatedPlans = this.activatedPlans.filter(plan => plan.id !== deactivatedPlan.id);

    switch(deactivatedPlan.status) {
      case 'Draft':
        this.draftPlans.push(deactivatedPlan);
        break;
      case 'In-Deactivation':
        this.deactivationRequestedPlans.push(deactivatedPlan);
        break;
      case 'Deactivated':
        this.deactivatedPlans.push(deactivatedPlan);
        break;
    }

    this.allPlans = this.draftPlans.concat(this.publishedPlans, this.activatedPlans, this.deactivationRequestedPlans, this.deactivatedPlans);
  }
}
