import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { PublicMembershipPlans } from '../interfaces/public-membership-plans';
import { ApiError } from '../../../core/interfaces/api-error';

@Injectable({
  providedIn: 'root'
})
export class MembershipPlansService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getPublicMembershipPlans(): Observable<PublicMembershipPlans> {
    return this.http.get<PublicMembershipPlans>(`${this.apiUrl}/membershipplans/public`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
