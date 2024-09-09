import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { CourseComponent } from './components/course/course.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminCoursesContainerComponent } from './pages/admin-courses-container/admin-courses-container.component';
import { AdminCourseComponent } from './components/admin-course/admin-course.component';
import { CourseDetailsModalComponent } from './components/course-details-modal/course-details-modal.component';
import { DraftCourseComponent } from './components/draft-course/draft-course.component';
import { CourseScheduleModalComponent } from './components/course-schedule-modal/course-schedule-modal.component';
import { CourseSchedulesCalendarComponent } from './components/course-schedules-calendar/course-schedules-calendar.component';
import { CourseSchedulesComponent } from './pages/course-schedules/course-schedules.component';
import { CourseSchedulesManagementCalendarComponent } from './components/course-schedules-management-calendar/course-schedules-management-calendar.component';
import { CourseSchedulesManagementComponent } from './pages/course-schedules-management/course-schedules-management.component';
import { AddCourseScheduleModalComponent } from './components/add-course-schedule-modal/add-course-schedule-modal.component';


@NgModule({
  declarations: [
    CourseContainerComponent,
    CourseComponent,
    AdminCoursesContainerComponent,
    AdminCourseComponent,
    CourseDetailsModalComponent,
    DraftCourseComponent,
    CourseSchedulesCalendarComponent,
    CourseScheduleModalComponent,
    CourseSchedulesComponent,
    CourseSchedulesManagementCalendarComponent,
    CourseSchedulesManagementComponent,
    AddCourseScheduleModalComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
