import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { UserProfileImage } from '../interfaces/user-profile-image';
import { ApiError } from '../interfaces/api-error';


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public uploadProfileImage(formData: FormData): Observable<UserProfileImage> {
    return this.http.post<UserProfileImage>(`${this.apiUrl}/files/profileImages`, formData).pipe(
      catchError((error: HttpErrorResponse) => this.handlerError(error))
    );
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
