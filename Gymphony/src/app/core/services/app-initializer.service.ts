import { Injectable } from '@angular/core';
import { catchError, delay, finalize, of } from 'rxjs';

import { AuthService } from '../../features/auth/services/auth.service';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private authService: AuthService, private loaderService: LoaderService) { }

  public initializeApp(): Promise<void> {
    this.loaderService.busy(); 
    return new Promise((resolve, reject) => {
      this.authService.autoLogIn()
        .pipe(
          finalize(() => {
            this.loaderService.idle(); 
            resolve(); 
          }),
          catchError(() => {
            this.loaderService.idle();
            resolve();
            return of(null);
          })
        )
        .subscribe();
    });
  }
}
