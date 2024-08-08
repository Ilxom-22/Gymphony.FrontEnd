import { Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { PaymentService } from '../../../payments/services/payment.service';
import { CourseSubscription } from '../../interfaces/course-subscription.interface';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-course-subscriptions-container',
  templateUrl: './course-subscriptions-container.component.html',
  styleUrl: './course-subscriptions-container.component.css'
})
export class CourseSubscriptionsContainerComponent {
  private userProfileService = inject(UserProfileService);
  public subscriptions$: Observable<CourseSubscription[] | null> = this.userProfileService.courseSubscriptions$;

  constructor(private paymentService: PaymentService) { }

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
