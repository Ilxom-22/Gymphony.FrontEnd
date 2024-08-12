import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';

import { SubscriptionsService } from './subscriptions.service';
import { UserProfileService } from './user-profile.service';
import { UserService } from '../../../core/services/user.service';

export const userProfileResolver: ResolveFn<boolean> = (route, state) => {
  const userProfileService = inject(UserProfileService);
  const subscriptionsService = inject(SubscriptionsService);
  const userService = inject(UserService);

  return userService.user$.pipe(
    switchMap(user => user && user.role === 'Member' ? of(user) : of(null)),
    switchMap(user => {
      if (!user) return of(true);

      return forkJoin({
        courseSubscriptions: subscriptionsService.getMyCourseSubscriptions(),
        membershipPlanSubscription: subscriptionsService.getMyMembershipPlanSubscription()
      }).pipe(
        tap(({ courseSubscriptions, membershipPlanSubscription }) => {
          userProfileService.setCourseSubscriptions(courseSubscriptions);
          userProfileService.setMembershipPlanSubscription(membershipPlanSubscription);
        }),
        map(() => true),
        catchError(() => of(false))
      );
    })
  );
};
