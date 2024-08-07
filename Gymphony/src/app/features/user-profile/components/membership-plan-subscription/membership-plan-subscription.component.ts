import { Component, Input } from '@angular/core';
import { tap } from 'rxjs';

import { PaymentService } from '../../../../core/services/payment.service';
import { MembershipPlanSubscription } from '../../interfaces/membership-plan-subscription.interface';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-membership-plan-subscription',
  templateUrl: './membership-plan-subscription.component.html',
  styleUrl: './membership-plan-subscription.component.css'
})
export class MembershipPlanSubscriptionComponent {
  public subscription: MembershipPlanSubscription | null = null;

  constructor(
    private subscriptionsService: SubscriptionsService,
    private paymentService: PaymentService) {}

  public ngOnInit(): void {
    this.subscriptionsService.getMyMembershipPlanSubscription()
      .pipe(
        tap((subscription: MembershipPlanSubscription | null) => this.subscription = subscription))
      .subscribe(); 
  }

  public openBillingPortal(): void {
    this.paymentService.getBillingPortalUrl(window.location.href).pipe(
      tap((billingPortalUrl: string) => {
        if (billingPortalUrl) {
          window.location.href = billingPortalUrl;
        }
      })
    )
    .subscribe();
  }
}
