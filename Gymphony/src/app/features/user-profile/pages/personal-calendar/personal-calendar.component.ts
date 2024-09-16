import { Component } from '@angular/core';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { MessageService } from '../../../../shared/services/message.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { MySchedule } from '../../interfaces/my-schedule';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-personal-calendar',
  templateUrl: './personal-calendar.component.html',
  styleUrl: './personal-calendar.component.css'
})
export class PersonalCalendarComponent {
  public mySchedules!: MySchedule[];
  constructor(
    private messageService: MessageService,
    private subscriptionsService: SubscriptionsService,
    private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.loaderService.show();

    this.subscriptionsService.getMySchedules().pipe(
      tap((mySchedules: MySchedule[]) => {
        this.mySchedules = mySchedules;
        if (this.mySchedules.length === 0) {
          this.messageService.triggerError('There are no active subscriptions yet.');
        }
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured. Please try again later.');
        return EMPTY;
      }),
      finalize(() => this.loaderService.hide())
    ).subscribe();
  }
}
