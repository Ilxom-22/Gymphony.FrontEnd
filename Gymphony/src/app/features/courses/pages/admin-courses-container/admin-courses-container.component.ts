import { Component } from '@angular/core';
import { catchError, EMPTY, filter, tap } from 'rxjs';

import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';
import { MessageService } from '../../../../shared/services/message.service';
import { ModalService } from '../../../auth/services/modal.service';
import { Courses } from '../../interfaces/courses';

@Component({
  selector: 'app-admin-courses-container',
  templateUrl: './admin-courses-container.component.html',
  styleUrl: './admin-courses-container.component.css'
})
export class AdminCoursesContainerComponent {
  public draftCourses: Course[] = [];
  public activatedCourses: Course[] = [];
  public publishedCourses: Course[] = [];
  public deactivationRequestedCourses: Course[] = [];
  public deactivatedCourses: Course[] = [];
  public allCourses: Course[] = [];
  public isGridView: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private messageService: MessageService,
    private modalService: ModalService) { }

  public ngOnInit(): void {
    this.coursesService.getAllCourses()
      .pipe(
        tap((courses: Courses) => {
          this.draftCourses = courses.draftCourses;
          this.activatedCourses = courses.activatedCourses;
          this.publishedCourses = courses.publishedCourses;
          this.deactivationRequestedCourses = courses.deactivationRequestedCourses;
          this.deactivatedCourses = courses.deactivatedCourses;
          this.allCourses = Object.values(courses).flatMap<Course>(courses => courses);
        }),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured.');
          return EMPTY;
        })
      )
      .subscribe();
  }

  public switchView(): void {
    this.isGridView = !this.isGridView;
  }

  public onCreateCourse(): void {
    const dialogRef = this.modalService.showDraftCourse();

    dialogRef.afterClosed().pipe(
      filter((course: Course | null) => course !== null && typeof(course) === 'object'),
      tap((course: Course) => {
        this.draftCourses.push(course);
        this.allCourses = this.draftCourses.concat(this.publishedCourses, this.activatedCourses, this.deactivationRequestedCourses, this.deactivatedCourses);
      })
    )
    .subscribe();
  }

  public onCourseDeleted(courseId: string): void {
    this.draftCourses = this.draftCourses.filter(course => course.id !== courseId);
    this.allCourses = this.allCourses.filter(course => course.id !== courseId);
  }

  public onCourseUpdated(updatedCourse: Course): void {
    this.allCourses = this.allCourses.map(course => course.id === updatedCourse.id ? updatedCourse : course);

    switch (updatedCourse.status) {
      case 'Draft': 
        this.draftCourses = this.draftCourses.map(course => course.id === updatedCourse.id ? updatedCourse : course);
        break;
      case 'Activated':
        this.activatedCourses = this.activatedCourses.map(course => course.id === updatedCourse.id ? updatedCourse : course);
        break;
    }   
  }

  public onCoursePublished(publishedCourse: Course): void {
    this.draftCourses = this.draftCourses.filter(course => course.id !== publishedCourse.id);

    switch(publishedCourse.status) {
      case 'Published':
        this.publishedCourses.push(publishedCourse);
        break;
      case 'Activated':
        this.activatedCourses.push(publishedCourse);
        break;
    }

    this.allCourses = this.draftCourses.concat(this.publishedCourses, this.activatedCourses, this.deactivationRequestedCourses, this.deactivatedCourses);
  }

  public onCourseDeactivated(deactivatedCourse: Course): void {
    console.log('container: ', deactivatedCourse);

    this.publishedCourses = this.publishedCourses.filter(course => course.id !== deactivatedCourse.id);
    this.activatedCourses = this.activatedCourses.filter(course => course.id !== deactivatedCourse.id);

    switch(deactivatedCourse.status) {
      case 'Draft':
        this.draftCourses.push(deactivatedCourse);
        break;
      case 'In-Deactivation':
        this.deactivationRequestedCourses.push(deactivatedCourse);
        break;
      case 'Deactivated':
        this.deactivatedCourses.push(deactivatedCourse);
        break;
    }

    this.allCourses = this.draftCourses.concat(this.publishedCourses, this.activatedCourses, this.deactivationRequestedCourses, this.deactivatedCourses);
  }
}
