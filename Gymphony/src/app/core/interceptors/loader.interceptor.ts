import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { delay, finalize, mergeMap, Observable, of, switchMap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { Injectable } from '@angular/core';
import { isThisHour } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.busy();

    return next.handle(req).pipe(
      delay(1000),
      finalize(() => this.loaderService.idle())
    );
  }
  
}


