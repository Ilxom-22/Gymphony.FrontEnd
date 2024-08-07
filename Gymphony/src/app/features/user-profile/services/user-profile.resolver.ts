import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin, tap } from 'rxjs';

import { SubscriptionsService } from './subscriptions.service';
import { UserProfileService } from './user-profile.service';


export const userProfileResolver: ResolveFn<boolean> = (route, state) => {
  const userProfileService = inject(UserProfileService);
  const subscriptionsService = inject(SubscriptionsService);

  forkJoin({
    courseSubscriptions: subscriptionsService.getMyCourseSubscriptions(),
    membershipPlanSubscription: subscriptionsService.getMyMembershipPlanSubscription()
  }).pipe(
    tap(({ courseSubscriptions, membershipPlanSubscription }) => {
      userProfileService.setCourseSubscriptions(courseSubscriptions);
      userProfileService.setMembershipPlanSubscription(membershipPlanSubscription);
    })
  ).subscribe();

  return true;
};
