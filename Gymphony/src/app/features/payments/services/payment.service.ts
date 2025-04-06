import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { ApiError } from '../../../core/interfaces/api-error';
import { BillingPortal } from '../interfaces/billingPortal.interface';
import { ConfigService } from '../../../config.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public getBillingPortalUrl(returnUrl: string): Observable<BillingPortal> {
    return this.http.post<BillingPortal>(`${this.config.apiUrl}/payments/customer-portal`, { returnUrl })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
