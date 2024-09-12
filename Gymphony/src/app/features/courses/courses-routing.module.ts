import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { AdminCoursesContainerComponent } from './pages/admin-courses-container/admin-courses-container.component';
import { CourseSchedulesComponent } from './pages/course-schedules/course-schedules.component';
import { CourseSchedulesManagementCalendarComponent } from './components/course-schedules-management-calendar/course-schedules-management-calendar.component';
import { CourseSchedulesManagementComponent } from './pages/course-schedules-management/course-schedules-management.component';

const routes: Routes = [
  { path: '', component: CourseContainerComponent },
  { path: 'schedules', component: CourseSchedulesComponent},
  { path: 'management', component: AdminCoursesContainerComponent },
  { path: 'schedules-management', component: CourseSchedulesManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
