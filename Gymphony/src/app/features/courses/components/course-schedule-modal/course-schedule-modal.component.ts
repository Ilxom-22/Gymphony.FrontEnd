import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseSchedule } from '../../interfaces/course-schedule';

@Component({
  selector: 'app-course-schedule-modal',
  templateUrl: './course-schedule-modal.component.html',
  styleUrl: './course-schedule-modal.component.css'
})
export class CourseScheduleModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { schedule: CourseSchedule, enrollments: number}) 
  { }

  getWeekday(day: number): string {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[day];
  }

  formatTime(timeString: string): string {
    const time = new Date(`1970-01-01T${timeString}`); 
  
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}
