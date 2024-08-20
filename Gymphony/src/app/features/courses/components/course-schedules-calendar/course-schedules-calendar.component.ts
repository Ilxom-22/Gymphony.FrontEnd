import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { catchError, EMPTY, tap } from 'rxjs';

import { CourseSchedule } from '../../interfaces/course-schedule';
import { CoursesService } from '../../services/courses.service';
import { MessageService } from '../../../../shared/services/message.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-course-schedules-calendar',
  templateUrl: './course-schedules-calendar.component.html',
  styleUrl: './course-schedules-calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSchedulesCalendarComponent {
  @Input() courseId!: string;
  public courseSchedules: CourseSchedule[] = [];
  public view: CalendarView = CalendarView.Week;
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];

  constructor(
    private coursesService: CoursesService, 
    private messageService: MessageService,
    private router: Router) { }

  public ngOnInit(): void {
    this.coursesService.getActiveCourseSchedules(this.courseId).pipe(
      tap((courseSchedules: CourseSchedule[]) => {
        this.courseSchedules = courseSchedules;

        console.log(courseSchedules);

        this.events = courseSchedules.map(courseSchedules => ({
          start: new Date(courseSchedules.startTime),
          end: new Date(courseSchedules.endTime),
          title: `${courseSchedules.instructors.firstName} ${courseSchedules.instructors.lastName} - ${courseSchedules.courseId}`,
          color: { primary: '#1e90ff', secondary: '#D1E8FF' },
          allDay: false,
        }));
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occured. Please try again later.');
        this.router.navigate(['/courses']);
        return EMPTY;
      })
    )
    .subscribe();
  }
}
