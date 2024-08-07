import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { PaymentService } from '../../../../core/services/payment.service';
import { CourseSubscription } from '../../interfaces/course-subscription.interface';
import { SubscriptionsService } from '../../services/subscriptions.service';

@Component({
  selector: 'app-course-subscriptions-container',
  templateUrl: './course-subscriptions-container.component.html',
  styleUrl: './course-subscriptions-container.component.css'
})
export class CourseSubscriptionsContainerComponent implements OnInit {
  public subscriptions: CourseSubscription[] = [];

  constructor(private paymentService: PaymentService, private subscriptionsService: SubscriptionsService) { }

  public ngOnInit(): void {
    this.subscriptionsService.getMyCourseSubscriptions()
      .pipe(tap((courseSubscriptions: CourseSubscription[] | null) => {
          if (courseSubscriptions) {
            this.subscriptions = courseSubscriptions;
          }
      }))
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
