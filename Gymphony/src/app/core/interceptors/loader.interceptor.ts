import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, delay, finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { Injectable } from '@angular/core';

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


