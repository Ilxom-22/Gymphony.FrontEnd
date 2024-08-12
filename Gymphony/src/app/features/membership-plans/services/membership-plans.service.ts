import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicMembershipPlans } from '../interfaces/public-membership-plans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipPlansService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getPublicMembershipPlans(): Observable<PublicMembershipPlans> {
    return this.http.get<PublicMembershipPlans>(`${this.apiUrl}/membershipplans/public`);
  }
}
