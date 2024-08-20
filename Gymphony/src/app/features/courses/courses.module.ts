import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { CourseComponent } from './components/course/course.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseSchedulesCalendarComponent } from './components/course-schedules-calendar/course-schedules-calendar.component';
import { CourseSchedulesComponent } from './pages/course-schedules/course-schedules.component';
import { AdminCoursesContainerComponent } from './pages/admin-courses-container/admin-courses-container.component';
import { AdminCourseComponent } from './components/admin-course/admin-course.component';
import { CourseDetailsModalComponent } from './components/course-details-modal/course-details-modal.component';
import { DraftCourseComponent } from './components/draft-course/draft-course.component';


@NgModule({
  declarations: [
    CourseContainerComponent,
    CourseComponent,
    CourseSchedulesCalendarComponent,
    CourseSchedulesComponent,
    AdminCoursesContainerComponent,
    AdminCourseComponent,
    CourseDetailsModalComponent,
    DraftCourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class CoursesModule { }
