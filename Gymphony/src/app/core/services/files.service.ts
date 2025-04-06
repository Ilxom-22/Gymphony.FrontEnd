import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { UserProfileImage } from '../interfaces/user-profile-image';
import { ApiError } from '../interfaces/api-error';
import { CourseImage } from '../../features/user-profile/interfaces/course-image.interface';
import { ConfigService } from '../../config.service';


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public uploadProfileImage(formData: FormData): Observable<UserProfileImage> {
    return this.http.post<UserProfileImage>(`${this.config.apiUrl}/files/profileImages`, formData).pipe(
      catchError((error: HttpErrorResponse) => this.handlerError(error))
    );
  }

  public uploadCourseImage(courseId: string, formData: FormData): Observable<CourseImage> {
    return this.http.post<CourseImage>(`${this.config.apiUrl}/files/courses/${courseId}`, formData)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
