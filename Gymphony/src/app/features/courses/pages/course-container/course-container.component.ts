import { Component } from '@angular/core';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { Course } from '../../interfaces/course';
import { MessageService } from '../../../../shared/services/message.service';
import { PublicCourses } from '../../interfaces/public-courses';
import { CoursesService } from '../../services/courses.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrl: './course-container.component.css'
})
export class CourseContainerComponent {
  public activatedCourses: Course[] = [];
  public publishedCourses: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    private messageService: MessageService,
    private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.loaderService.show();

    this.coursesService.getPublicCourses()
      .pipe(
        tap((courses: PublicCourses) => {
          this.activatedCourses = courses.activatedCourses;
          this.publishedCourses = courses.publishedCourses;
        }),
        catchError(() => {
          this.messageService.triggerError('An unexpected error occured.');
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      ).subscribe();
  }
}
