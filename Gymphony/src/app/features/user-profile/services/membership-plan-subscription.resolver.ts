import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SubscriptionsService } from './subscriptions.service';
import { MembershipPlanSubscription } from '../interfaces/membership-plan-subscription.interface';
import { Observable } from 'rxjs';

export const membershipPlanSubscriptionResolver: ResolveFn<Observable<MembershipPlanSubscription | null>> = (route, state) => {
  const subscriptionsService = inject(SubscriptionsService);

  return subscriptionsService.getMyMembershipPlanSubscription();
};
