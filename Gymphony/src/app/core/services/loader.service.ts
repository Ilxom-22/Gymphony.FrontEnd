import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public requestsCount: number = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  public busy(): void {
    this.requestsCount++;

    this.spinnerService.show(undefined, 
    {
      type: 'square-jelly-box',
      bdColor: '#232429',
      color: '#f5f5f5',
      size: 'default'
    });
  }

  public idle(): void {
    this.requestsCount--;

    if (this.requestsCount <= 0) {
      this.requestsCount = 0;
      this.spinnerService.hide();
    }
  }
}
