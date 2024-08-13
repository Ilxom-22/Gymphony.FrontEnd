import { Component, inject } from '@angular/core';
import { catchError, EMPTY, filter, Observable, tap } from 'rxjs';

import { PaymentService } from '../../../payments/services/payment.service';
import { MembershipPlanSubscription } from '../../interfaces/membership-plan-subscription.interface';
import { UserProfileService } from '../../services/user-profile.service';
import { ApiError } from '../../../../core/interfaces/api-error';
import { MessageService } from '../../../../shared/services/message.service';
import { BillingPortal } from '../../../payments/interfaces/billingPortal.interface';


@Component({
  selector: 'app-membership-plan-subscription',
  templateUrl: './membership-plan-subscription.component.html',
  styleUrl: './membership-plan-subscription.component.css'
})
export class MembershipPlanSubscriptionComponent {
  private userProfileService: UserProfileService = inject(UserProfileService);
  public subscription$: Observable<MembershipPlanSubscription | null> = this.userProfileService.membershipPlanSubscription$;

  constructor(private paymentService: PaymentService, private messageService: MessageService) {}

  public openBillingPortal(): void {
    this.paymentService.getBillingPortalUrl(window.location.href).pipe(
      filter((billingPortalUrl: BillingPortal) => 
        billingPortalUrl && 
        billingPortalUrl.sessionUrl !== null && 
        billingPortalUrl.sessionUrl.length > 0
      ),
      tap((billingPortalUrl: BillingPortal) => window.location.href = billingPortalUrl.sessionUrl),
      catchError((error: ApiError) => {
        if (error.status === 400) {
          this.messageService.triggerError('You do not have any subscriptions yet.');
        } else if (error.status === 500) {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
        }
        return EMPTY;
      })
    )
    .subscribe();
  }
}
