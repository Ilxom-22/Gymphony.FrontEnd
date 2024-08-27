import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { AdminCoursesContainerComponent } from './pages/admin-courses-container/admin-courses-container.component';
import { CourseSchedulesComponent } from './pages/course-schedules/course-schedules.component';

const routes: Routes = [
  { path: '', component: CourseContainerComponent },
  { path: 'schedules', component: CourseSchedulesComponent},
  { path: 'management', component: AdminCoursesContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
