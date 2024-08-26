import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { CourseScheduleModalComponent } from './components/course-schedule-modal/course-schedule-modal.component';


@NgModule({
  declarations: [
    CourseContainerComponent,
    CourseComponent,
    CourseSchedulesCalendarComponent,
    CourseSchedulesComponent,
    AdminCoursesContainerComponent,
    AdminCourseComponent,
    CourseDetailsModalComponent,
    DraftCourseComponent,
    CourseScheduleModalComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
