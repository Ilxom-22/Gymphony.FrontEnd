import { Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { PaymentService } from '../../../../core/services/payment.service';
import { MembershipPlanSubscription } from '../../interfaces/membership-plan-subscription.interface';
import { UserProfileService } from '../../services/user-profile.service';


@Component({
  selector: 'app-membership-plan-subscription',
  templateUrl: './membership-plan-subscription.component.html',
  styleUrl: './membership-plan-subscription.component.css'
})
export class MembershipPlanSubscriptionComponent {
  private userProfileService: UserProfileService = inject(UserProfileService);
  public subscription$: Observable<MembershipPlanSubscription | null> = this.userProfileService.membershipPlanSubscription$;

  constructor(private paymentService: PaymentService) {}

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
