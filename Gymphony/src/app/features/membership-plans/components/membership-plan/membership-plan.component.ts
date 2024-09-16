import { Component, Input } from '@angular/core';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

import { MembershipPlan } from '../../interfaces/membership-plan';
import { CheckoutSession } from '../../interfaces/checkout-session';
import { SubscriptionsService } from '../../../user-profile/services/subscriptions.service';
import { SubscribeForMembershipPlan } from '../../interfaces/subscribe-for-membership-plan';
import { MessageService } from '../../../../shared/services/message.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-membership-plan',
  templateUrl: './membership-plan.component.html',
  styleUrl: './membership-plan.component.css'
})
export class MembershipPlanComponent {
  @Input() plan!: MembershipPlan;
  @Input() isActive!: boolean;
  
  constructor(
    private subscriptionsService: SubscriptionsService, 
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  public onSubscribeClicked(): void {
    const checkoutSession: CheckoutSession = {} as CheckoutSession;
    const subscribeForMembershipPlan: SubscribeForMembershipPlan = {
      membershipPlanId: this.plan.id,
      successUrl: `http://localhost:4200/payments/payment-successful?product=${this.plan.name}&productType=plan`,
      cancelUrl: `http://localhost:4200/payments/payment-failed`
    };

    this.loaderService.show();
    this.subscriptionsService.subscribeForMembershipPlan(subscribeForMembershipPlan)
      .pipe(
        tap((session: CheckoutSession) => {
          checkoutSession.publicKey = session.publicKey;
          checkoutSession.sessionId = session.sessionId;
          this.redirectToStripeCheckout(checkoutSession);
        }),
        catchError((error: ApiError) => {
          if (error.status === 400) {
            this.messageService.triggerError('You already have an active membership plan subscription.');
          }
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      ).subscribe();
  }

  private async redirectToStripeCheckout(checkoutSession: CheckoutSession) {
    const stripe = await loadStripe(checkoutSession.publicKey);

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: checkoutSession.sessionId });
    }
  }
}
