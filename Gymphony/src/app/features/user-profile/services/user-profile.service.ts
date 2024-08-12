import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CourseSubscription } from '../interfaces/course-subscription.interface';
import { MembershipPlanSubscription } from '../interfaces/membership-plan-subscription.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private courseSubscriptionsSubject: BehaviorSubject<CourseSubscription[] | null> = new BehaviorSubject<CourseSubscription[] | null>(null);
  private membershipPlanSubscriptionSubject: BehaviorSubject<MembershipPlanSubscription | null> = new BehaviorSubject<MembershipPlanSubscription | null>(null);

  public courseSubscriptions$: Observable<CourseSubscription[] | null> = this.courseSubscriptionsSubject.asObservable();
  public membershipPlanSubscription$: Observable<MembershipPlanSubscription | null> = this.membershipPlanSubscriptionSubject.asObservable();

  public setCourseSubscriptions(courseSubscriptions: CourseSubscription[] | null): void {
    this.courseSubscriptionsSubject.next(courseSubscriptions);
  }

  public setMembershipPlanSubscription(membershipPlanSubscription: MembershipPlanSubscription | null): void {
    this.membershipPlanSubscriptionSubject.next(membershipPlanSubscription);
  }
}
