import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-course-schedules',
  templateUrl: './course-schedules.component.html',
  styleUrl: './course-schedules.component.css'
})
export class CourseSchedulesComponent {
  public courseId!: string;
  public sessionsCount!: number;
  public selectedScheduleIds: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.sessionsCount = params['sessions'];

      if (!this.courseId) {
        this.messageService.triggerError('An unexpected error occured. Please try again later.');
        this.router.navigate(['/courses']);
      }
    });
  }

  public onScheduleSelected(scheduleId: string): void {
    this.selectedScheduleIds.push(scheduleId);
  }

  public onScheduleDelselected(scheduleId: string): void {
    this.selectedScheduleIds = this.selectedScheduleIds.filter(schedule => schedule !== scheduleId);
  }
}
