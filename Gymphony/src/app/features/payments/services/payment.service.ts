import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getBillingPortalUrl(returnUrl: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/payments/customer-portal`, { returnUrl }, { responseType: 'text' as 'json' });
  }
}
