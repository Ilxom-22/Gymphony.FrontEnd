import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { PublicMembershipPlans } from '../interfaces/public-membership-plans';
import { ApiError } from '../../../core/interfaces/api-error';
import { MembershipPlans } from '../interfaces/membership-plans';
import { MembershipPlan } from '../interfaces/membership-plan';
import { MembershipPlanDetails } from '../interfaces/membership-plan-details';
import { DraftMembershipPlan } from '../interfaces/draft-membership-plan';
import { ConfigService } from '../../../config.service';


@Injectable({
  providedIn: 'root'
})
export class MembershipPlansService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public getPublicMembershipPlans(): Observable<PublicMembershipPlans> {
    return this.http.get<PublicMembershipPlans>(`${this.config.apiUrl}/membershipplans/public`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getAllMembershipPlans(): Observable<MembershipPlans> {
    return this.http.get<MembershipPlans>(`${this.config.apiUrl}/membershipplans/all`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getMembershipPlanDetails(id: string): Observable<MembershipPlanDetails> {
    return this.http.get<MembershipPlanDetails>(`${this.config.apiUrl}/membershipplans/plan-details/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public createDraftMembershipPlan(membershipPlan: DraftMembershipPlan): Observable<MembershipPlan> {
    return this.http.post<MembershipPlan>(`${this.config.apiUrl}/membershipplans`, membershipPlan)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public updateMembershipPlan(membershipPlan: DraftMembershipPlan): Observable<MembershipPlan> {
    return this.http.put<MembershipPlan>(`${this.config.apiUrl}/membershipplans/update`, membershipPlan)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public updateProductPrice(productId: string, price: number) {
    return this.http.put(`${this.config.apiUrl}/products/update-price`, { productId, price })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public publishMembershipPlan(membershipPlanId: string, activationDate: string): Observable<MembershipPlan> {
    return this.http.put<MembershipPlan>(`${this.config.apiUrl}/membershipplans/publish`, { membershipPlanId, activationDate })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deleteMembershipPlan(id: string) {
    return this.http.delete(`${this.config.apiUrl}/membershipplans/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deactivateMembershipPlan(id: string): Observable<MembershipPlan> {
    return this.http.put<MembershipPlan>(`${this.config.apiUrl}/membershipplans/deactivate/${id}`, null)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
