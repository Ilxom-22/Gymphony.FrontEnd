import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { ApiError } from '../../../core/interfaces/api-error';
import { BillingPortal } from '../interfaces/billingPortal.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getBillingPortalUrl(returnUrl: string): Observable<BillingPortal> {
    return this.http.post<BillingPortal>(`${this.apiUrl}/payments/customer-portal`, { returnUrl })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
