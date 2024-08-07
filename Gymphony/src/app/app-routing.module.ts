import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userProfileResolver } from './features/user-profile/services/user-profile.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', loadChildren: () => import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule), resolve: { 'profile': userProfileResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
