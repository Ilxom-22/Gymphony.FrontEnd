import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EmptyError, Observable, throwError } from 'rxjs';

import { MembershipPlanSubscription } from '../interfaces/membership-plan-subscription.interface';
import { CourseSubscription } from '../interfaces/course-subscription.interface';
import { SubscribeForMembershipPlan } from '../../membership-plans/interfaces/subscribe-for-membership-plan';
import { CheckoutSession } from '../../membership-plans/interfaces/checkout-session';
import { ApiError } from '../../../core/interfaces/api-error';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getMyMembershipPlanSubscription() : Observable<MembershipPlanSubscription | null> {
    return this.http.get<MembershipPlanSubscription | null>(`${this.apiUrl}/subscriptions/my-membership-subscription`)
  }

  public getMyCourseSubscriptions(): Observable<CourseSubscription[] | null> {
    return this.http.get<CourseSubscription[] | null>(`${this.apiUrl}/subscriptions/my-course-subscriptions`)
  }

  public subscribeForMembershipPlan(subscribeForMembershipPlan: SubscribeForMembershipPlan): Observable<CheckoutSession> {
    return this.http.post<CheckoutSession>(`${this.apiUrl}/subscriptions/subscribe-for-membershipPlan`, subscribeForMembershipPlan)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handlerError(error))
      );
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
