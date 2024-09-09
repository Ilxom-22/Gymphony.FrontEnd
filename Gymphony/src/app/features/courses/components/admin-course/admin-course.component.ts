import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, EMPTY, filter, switchMap, tap } from 'rxjs';
import { format } from 'date-fns';

import { CoursesService } from '../../services/courses.service';
import { MessageService } from '../../../../shared/services/message.service';
import { ModalService } from '../../../auth/services/modal.service';
import { Course } from '../../interfaces/course';
import { CourseDetails } from '../../interfaces/course-details';
import { CourseMapperService } from '../../services/course-mapper.service';
import { ApiError } from '../../../../core/interfaces/api-error';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrl: './admin-course.component.css'
})
export class AdminCourseComponent {
  @Input() course!: Course;
  @Output() coursePublished = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();
  @Output() courseDeleted = new EventEmitter<string>();
  @Output() courseDeactivated = new EventEmitter<Course>();

  constructor(
    private coursesService: CoursesService,
    private messageService: MessageService,
    private modalService: ModalService,
    private courseMapperService: CourseMapperService) { }

    public onEditClicked(): void { 
      const dialogRef = this.modalService.showDraftCourse(this.courseMapperService.courseToDraft(this.course));
  
      dialogRef.afterClosed().pipe(
        filter((course: Course | null) => course !== null && typeof(course) === 'object'),
        tap((course: Course) =>{
          this.courseUpdated.emit(course);
        })
      )
      .subscribe();
    }

  public onDetailsClicked(): void {
    this.coursesService.getCourseDetails(this.course.id)
      .pipe(
        tap((courseDetails: CourseDetails) => 
          this.modalService.showCourseDetailsModal(courseDetails)),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured.');
          return EMPTY;
        })
      )
      .subscribe();
  }

  public onPriceChangeClicked(): void {
    const dialogRef = this.modalService.showPriceModal(this.course.id, this.course.price);

      dialogRef.afterClosed().pipe(
        filter((newPrice: number | null) => newPrice !== null && typeof(newPrice) === 'number'),
        tap((newPrice: number) => {
          const course = { ...this.course, price: newPrice };
          this.courseUpdated.emit(course);
        })
      )
      .subscribe();
  }

  public onPublishClicked(): void {
    const dialogRef = this.modalService.showPublishDateModal(this.course.name);

    dialogRef.afterClosed().pipe(
      filter((selectedDate: Date | null) => selectedDate !== null && selectedDate instanceof Date),
      switchMap((selectedDate: Date) => this.coursesService.publishCourse(this.course.id, format(selectedDate, 'yyyy-MM-dd'))),
      tap((membershipPlan: Course) => {
        this.coursePublished.emit(membershipPlan);
        this.messageService.triggerSuccess(`Membership course - "${this.course.name}" is published successfully.`)
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured.');
        return EMPTY;
      })
    )
    .subscribe();
  }

  public onDeactivateClicked(): void {
    const dialogref = this.modalService.showConfirmationModal(`You are about to deactivate the course - "${this.course.name}". Once performed this action can't be undone.`, 'Deactivation Confirmation');

    dialogref.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => this.coursesService.deactivateCourse(this.course.id)),
      tap((deactivatedCourse: Course) => {
        console.log('course: ', deactivatedCourse);
        this.courseDeactivated.emit(deactivatedCourse);
        this.messageService.triggerSuccess(`${this.course.name} course is deactivated.`);
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured. Please try again later.');
        return EMPTY;
      })
    )
    .subscribe();
  }

  public onDeleteClicked(): void {
    const dialogRef = this.modalService.showConfirmationModal(`Are you sure to delete "${this.course.name}" ?`, 'Deletion Confirmation');

    dialogRef.afterClosed().pipe(
      filter((result: boolean) => result),
      switchMap(() => this.coursesService.deleteCourse(this.course.id)),
      tap(() => {
        this.courseDeleted.emit(this.course.id);
        this.messageService.triggerSuccess(`Course named "${this.course.name}" is deleted.`);
      }),
      catchError((error: ApiError) => {
        if (error.status === 422) {
          this.messageService.triggerError(error.detail)
        } else if (error.status === 400 || 500) {
          this.messageService.triggerError('An unexpected error occured. Please try again later.');
        }

        return EMPTY;
      })
    )
    .subscribe();
  }
}
