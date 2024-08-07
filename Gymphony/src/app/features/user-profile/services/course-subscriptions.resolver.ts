import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SubscriptionsService } from './subscriptions.service';
import { CourseSubscription } from '../interfaces/course-subscription.interface';
import { Observable } from 'rxjs';

export const courseSubscriptionsResolver: ResolveFn<Observable<CourseSubscription[] | null>> = (route, state) => {
  const subscriptionsService = inject(SubscriptionsService);

  return subscriptionsService.getMyCourseSubscriptions();
};
