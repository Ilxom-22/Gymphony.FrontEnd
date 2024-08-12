import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { MembershipPlansService } from '../../services/membership-plans.service';
import { MembershipPlan } from '../../interfaces/membership-plan';
import { PublicMembershipPlans } from '../../interfaces/public-membership-plans';


@Component({
  selector: 'app-membership-plans-container',
  templateUrl: './membership-plans-container.component.html',
  styleUrl: './membership-plans-container.component.css'
})
export class MembershipPlansContainerComponent implements OnInit {
  public activatedPlans: MembershipPlan[] = [];
  public publishedPlans: MembershipPlan[] = [];

  constructor(private membershipPlansService: MembershipPlansService) { }

  public ngOnInit(): void {
    this.membershipPlansService.getPublicMembershipPlans()
      .pipe(
        tap((plans: PublicMembershipPlans) => {
          this.activatedPlans = plans.activatedPlans;
          this.publishedPlans = plans.publishedPlans;
        })
      ).subscribe();
  }
}
