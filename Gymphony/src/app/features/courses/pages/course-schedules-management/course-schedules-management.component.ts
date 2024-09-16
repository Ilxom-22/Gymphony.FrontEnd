import { Component } from '@angular/core';
import { catchError, concatMap, EMPTY, filter, finalize, from, Observable, switchMap, tap } from 'rxjs';

import { Course } from '../../interfaces/course';
import { CourseSchedule } from '../../interfaces/course-schedule';
import { MessageService } from '../../../../shared/services/message.service';
import { CoursesService } from '../../services/courses.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { Courses } from '../../interfaces/courses';
import { ApiError } from '../../../../core/interfaces/api-error';
import { ModalService } from '../../../auth/services/modal.service';
import { CreateCourseSchedule } from '../../interfaces/create-course-schedule';

@Component({
  selector: 'app-course-schedules-management',
  templateUrl: './course-schedules-management.component.html',
  styleUrl: './course-schedules-management.component.css'
})
export class CourseSchedulesManagementComponent {
  public selectedCourse!: Course;
  public courseSchedules: CourseSchedule[] = [];
  public courses!: Course[];

  constructor(
    private messageService: MessageService,
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private modalService: ModalService) { }

  public ngOnInit(): void {
    this.loaderService.show();

    this.loadCourses().pipe(
      switchMap(() => this.loadCourseSchedules(this.selectedCourse.id)),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occurred. Please try again later.');
        return EMPTY;
      }),
      finalize(() => this.loaderService.hide())
    )
    .subscribe();
  }

  public selectCourse(course: Course): void {
    this.selectedCourse = course;
    this.loadCourseSchedules(this.selectedCourse.id).pipe(
      switchMap(() => this.loadCourses(this.selectedCourse))
    )
    .subscribe();
  }

  public onAdd(): void {
    const dialogRef = this.modalService.showCreateCourseScheduleModal(this.selectedCourse.id, this.selectedCourse.sessionDurationInMinutes);

    dialogRef.afterClosed().pipe(
      filter((courseSchedules: CreateCourseSchedule[]) => courseSchedules.length > 0),
      concatMap((courseSchedules: CreateCourseSchedule[]) => 
        courseSchedules.length === 1 
          ? this.handleSingleSchedule(courseSchedules[0])
          : this.handleMultipleSchedules(courseSchedules)
      )
    ).subscribe();
  }

  public onScheduleDeleted(scheduleId: string): void {
    this.coursesService.deleteSchedule(scheduleId).pipe(
      tap(() => {
        this.courseSchedules = this.courseSchedules.filter(schedule => schedule.id !== scheduleId);
        this.messageService.triggerSuccess('Course schedule deleted successfully.');
      }),
      catchError((error: ApiError) => {
        if (error.status === 400) {
          this.messageService.triggerError(error.detail);
        }
        return EMPTY;
      })
    ).subscribe();
  }

  private loadCourseSchedules(courseId: string): Observable<CourseSchedule[]> {
    return this.coursesService.getCourseSchedules(courseId).pipe(
      tap((courseSchedules: CourseSchedule[]) => {
        this.courseSchedules = courseSchedules;
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occurred. Please try again later.');
        return EMPTY;
      }));
  }

  private loadCourses(selectedCourse: Course | null = null): Observable<Courses> {
    return this.coursesService.getAllCourses().pipe(
      tap((courses: Courses) => {
        this.courses = courses.draftCourses.concat(courses.publishedCourses, courses.activatedCourses, courses.deactivationRequestedCourses);
        if (selectedCourse) {
          this.selectedCourse = selectedCourse; 
        } else {
          this.selectedCourse = this.courses[0];
        }
        
        this.courses = this.courses.filter(course => course.id !== this.selectedCourse.id);
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured.');
        return EMPTY;
      })
    );
  }

  private handleSingleSchedule(courseSchedule: CreateCourseSchedule): Observable<CourseSchedule> {
    return this.coursesService.createCourseSchedule(courseSchedule).pipe(
      tap((createdSchedule: CourseSchedule) => {
        this.courseSchedules.push(createdSchedule);
        this.courseSchedules = [...this.courseSchedules];
        this.messageService.triggerSuccess('Course Schedule created successfully!');
      }),
      catchError((error: ApiError) => {
        this.messageService.triggerError(`Failed to create course schedule: ${error.detail}`);
        return EMPTY;
      })
    );
  }
  
  private handleMultipleSchedules(courseSchedules: CreateCourseSchedule[]): Observable<CourseSchedule> {
    const errorMessages: string[] = [];
  
    return from(courseSchedules).pipe(
      concatMap((courseSchedule: CreateCourseSchedule) => 
        this.coursesService.createCourseSchedule(courseSchedule).pipe(
          tap((createdSchedule: CourseSchedule) => this.courseSchedules.push(createdSchedule)),
          catchError((error: ApiError) => {
            errorMessages.push(error.detail);
            return EMPTY;
          })
        )
      ),
      finalize(() => {
        this.courseSchedules = [...this.courseSchedules];
        if (errorMessages.length > 0) {
          this.messageService.triggerError(this.formatErrorMessages(errorMessages), 10000);
        } else {
          this.messageService.triggerSuccess('All course schedules created successfully!');
        }
      })
    );
  }
  
  private formatErrorMessages(errorMessages: string[]): string {
    return errorMessages.map(message => `• ${message}`).join('\n');
  }
}
