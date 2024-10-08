import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { MembershipPlanSubscription } from '../interfaces/membership-plan-subscription.interface';
import { CourseSubscription } from '../interfaces/course-subscription.interface';
import { SubscribeForMembershipPlan } from '../../membership-plans/interfaces/subscribe-for-membership-plan';
import { CheckoutSession } from '../../membership-plans/interfaces/checkout-session';
import { ApiError } from '../../../core/interfaces/api-error';
import { SubscribeForCourse } from '../../courses/interfaces/subscribe-for-course';
import { MySchedule } from '../interfaces/my-schedule';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getMyMembershipPlanSubscription() : Observable<MembershipPlanSubscription | null> {
    return this.http.get<MembershipPlanSubscription | null>(`${this.apiUrl}/subscriptions/my-membership-subscription`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getMyCourseSubscriptions(): Observable<CourseSubscription[] | null> {
    return this.http.get<CourseSubscription[] | null>(`${this.apiUrl}/subscriptions/my-course-subscriptions`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getMySchedules(): Observable<MySchedule[]> {
    return this.http.get<MySchedule[]>(`${this.apiUrl}/subscriptions/my-schedules`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public subscribeForMembershipPlan(subscribeForMembershipPlan: SubscribeForMembershipPlan): Observable<CheckoutSession> {
    return this.http.post<CheckoutSession>(`${this.apiUrl}/subscriptions/subscribe-for-membershipPlan`, subscribeForMembershipPlan)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handlerError(error))
      );
  }

  public subscribeForCourse(subscribeForCourse: SubscribeForCourse): Observable<CheckoutSession> {
    return this.http.post<CheckoutSession>(`${this.apiUrl}/subscriptions/subscribe-for-course`, subscribeForCourse)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handlerError(error))
      );
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
