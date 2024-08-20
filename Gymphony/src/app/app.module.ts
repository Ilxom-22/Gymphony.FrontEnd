import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ProfileIconComponent } from './core/components/profile-icon/profile-icon.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthResponseInterceptor } from './core/interceptors/auth-response.interceptor';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { AppInitializerService } from './core/services/app-initializer.service';

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileIconComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    HomeModule,
    NgxSpinnerModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
