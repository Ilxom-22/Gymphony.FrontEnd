import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', loadChildren: () => import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'plans', loadChildren: () => import('./features/membership-plans/membership-plans.module').then(m => m.MembershipPlansModule) },
  { path: 'courses', loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule) },
  { path: 'payments', loadChildren: () => import('./features/payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'staff', loadChildren: () => import('./features/staff/staff.module').then(m => m.StaffModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
