import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoaderShownSubject = new BehaviorSubject<boolean>(false);
  public isLoaderShown$ = this.isLoaderShownSubject.asObservable();

  constructor(private spinnerService: NgxSpinnerService) { }

  public show(): void {
    this.spinnerService.show(undefined, 
      {
        type: 'square-jelly-box',
        bdColor: '#232429',
        color: '#f5f5f5',
        size: 'default'
      });

    this.isLoaderShownSubject.next(true);
  }

  public hide(): void {
    setTimeout(() => {
      this.spinnerService.hide();
      this.isLoaderShownSubject.next(false);
    }, 1000);
  }
}
