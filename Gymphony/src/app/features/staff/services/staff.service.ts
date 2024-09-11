import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Staff } from '../../courses/interfaces/staff';
import { ApiError } from '../../../core/interfaces/api-error';
import { User } from '../../../core/interfaces/user';
import { SignUpDetails } from '../../auth/interfaces/sign-up-details.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admins`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.apiUrl}/staff`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public addAdmin(admin: SignUpDetails): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/admins/sign-up`, admin)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public blockAdmin(adminId: string): Observable<object> {
    return this.http.put(`${this.apiUrl}/admins/block/${adminId}`, null)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public unblockAdmin(adminId: string): Observable<object> {
    return this.http.put(`${this.apiUrl}/admins/unblock/${adminId}`, null)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public removeAdmin(adminId: string): Observable<object> {
    return this.http.delete(`${this.apiUrl}/admins/${adminId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
