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
import { CreateCourseSchedule } from '../interfaces/create-course-schedule';
import { ConfigService } from '../../../config.service';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public getPublicCourses(): Observable<PublicCourses> {
    return this.http.get<PublicCourses>(`${this.config.apiUrl}/courses/public`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.config.apiUrl}/courses/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getAllCourses(): Observable<Courses> {
    return this.http.get<Courses>(`${this.config.apiUrl}/courses/all`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getActiveCourseSchedules(courseId: string): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.config.apiUrl}/courseschedules/active/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public getCourseSchedules(courseId: string): Observable<CourseSchedule[]> {
    return this.http.get<CourseSchedule[]>(`${this.config.apiUrl}/courseschedules/${courseId}`);
  }

  public getCourseDetails(courseId: string): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`${this.config.apiUrl}/courses/course-details/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public createCourse(draftCourse: FormData): Observable<Course> {
    return this.http.post<Course>(`${this.config.apiUrl}/courses`, draftCourse)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public createCourseSchedule(courseSchedule: CreateCourseSchedule): Observable<CourseSchedule> {
    return this.http.post<CourseSchedule>(`${this.config.apiUrl}/courseschedules`, courseSchedule)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public updateCourse(draftCourse: DraftCourse): Observable<Course> {
    return this.http.put<Course>(`${this.config.apiUrl}/courses`, draftCourse)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public publishCourse(courseId: string, activationDate: string): Observable<Course> {
    return this.http.put<Course>(`${this.config.apiUrl}/courses/publish`, { courseId, activationDate })
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deactivateCourse(courseId: string): Observable<Course> {
    return this.http.put<Course>(`${this.config.apiUrl}/courses/deactivate/${courseId}`, null)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deleteCourse(courseId: string): Observable<unknown> {
    return this.http.delete(`${this.config.apiUrl}/courses/${courseId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public deleteSchedule(scheduleId: string) {
    return this.http.delete(`${this.config.apiUrl}/courseschedules/${scheduleId}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
