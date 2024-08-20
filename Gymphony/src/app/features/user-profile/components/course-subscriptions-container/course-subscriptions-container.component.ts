import { Component, inject } from '@angular/core';
import { catchError, EMPTY, filter, Observable, tap } from 'rxjs';

import { PaymentService } from '../../../payments/services/payment.service';
import { CourseSubscription } from '../../interfaces/course-subscription.interface';
import { UserProfileService } from '../../services/user-profile.service';
import { BillingPortal } from '../../../payments/interfaces/billingPortal.interface';
import { ApiError } from '../../../../core/interfaces/api-error';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-course-subscriptions-container',
  templateUrl: './course-subscriptions-container.component.html',
  styleUrl: './course-subscriptions-container.component.css'
})
export class CourseSubscriptionsContainerComponent {
  private userProfileService = inject(UserProfileService);
  public subscriptions$: Observable<CourseSubscription[] | null> = this.userProfileService.courseSubscriptions$;

  constructor(private paymentService: PaymentService, private messageService: MessageService) { }

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
