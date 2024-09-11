import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { PublicCourses } from '../interfaces/public-courses';
import { ApiError } from '../../../core/interfaces/api-error';
import { CourseSchedule } from '../interfaces/course-schedule';
import { Courses } from '../interfaces/courses';
import { CourseDetails } from '../interfaces/course-details';
import { Course } from '../interfaces/course';
import { DraftCourse } from '../interfaces/draft-course';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public getPublicCourses(): Observable<PublicCourses> {
    return this.http.get<PublicCourses>(`${this.apiUrl}/courses/public`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getAllCourses(): Observable<Courses> {
    return this.http.get<Courses>(`${this.apiUrl}/courses/all`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getActiveCourseSchedules(courseId: string): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.apiUrl}/courseschedules/active/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getCourseDetails(courseId: string): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`${this.apiUrl}/courses/course-details/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public createCourse(draftCourse: DraftCourse): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, draftCourse)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public updateCourse(draftCourse: DraftCourse): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses`, draftCourse)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public publishCourse(courseId: string, activationDate: string): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/publish`, { courseId, activationDate })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deactivateCourse(courseId: string): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/deactivate/${courseId}`, null)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deleteCourse(courseId: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/courses/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
