import { Component, Input } from '@angular/core';
import { tap } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

import { MembershipPlan } from '../../interfaces/membership-plan';
import { CheckoutSession } from '../../interfaces/checkout-session';
import { SubscriptionsService } from '../../../user-profile/services/subscriptions.service';
import { SubscribeForMembershipPlan } from '../../interfaces/subscribe-for-membership-plan';

@Component({
  selector: 'app-membership-plan',
  templateUrl: './membership-plan.component.html',
  styleUrl: './membership-plan.component.css'
})
export class MembershipPlanComponent {
  @Input() plan!: MembershipPlan;
  @Input() isActive!: boolean;

  constructor(private subscriptionsService: SubscriptionsService) { }

  public onSubscribeClicked(): void {
    const checkoutSession: CheckoutSession = {} as CheckoutSession;
    const subscribeForMembershipPlan: SubscribeForMembershipPlan = {
      membershipPlanId: this.plan.id,
      successUrl: 'http://localhost:4200/plans',
      cancelUrl: 'http://localhost:4200/home'
    };

    this.subscriptionsService.subscribeForMembershipPlan(subscribeForMembershipPlan)
      .pipe(
        tap((session: CheckoutSession) => {
          checkoutSession.publicKey = session.publicKey;
          checkoutSession.sessionId = session.sessionId;
          this.redirectToStripeCheckout(checkoutSession);
        })
      ).subscribe();
  }

  private async redirectToStripeCheckout(checkoutSession: CheckoutSession) {
    const stripe = await loadStripe(checkoutSession.publicKey);

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: checkoutSession.sessionId });
    }
  }
}
