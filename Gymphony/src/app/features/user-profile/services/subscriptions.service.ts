import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MembershipPlanSubscription } from '../interfaces/membership-plan-subscription.interface';
import { CourseSubscription } from '../interfaces/course-subscription.interface';
import { Course } from '../interfaces/course.interface';

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
}
