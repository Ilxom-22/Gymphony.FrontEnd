import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { ApiError } from '../../../core/interfaces/api-error';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getBillingPortalUrl(returnUrl: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/payments/customer-portal`, { returnUrl }, { responseType: 'text' as 'json' })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
