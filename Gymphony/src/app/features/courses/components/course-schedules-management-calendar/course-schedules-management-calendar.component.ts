import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { ModalService } from '../../../auth/services/modal.service';
import { CourseSchedule } from '../../interfaces/course-schedule';
import { filter, tap } from 'rxjs';
import { Course } from '../../interfaces/course';


@Component({
  selector: 'app-course-schedules-management-calendar',
  templateUrl: './course-schedules-management-calendar.component.html',
  styleUrl: './course-schedules-management-calendar.component.css'
})
export class CourseSchedulesManagementCalendarComponent {
  @Input() course!: Course;
  @Input() courseSchedules!: CourseSchedule[];
  @Output() scheduleDeleted = new EventEmitter<string>();
  public calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: '',
        center: '',
        right: ''
      },
      height: 620,
      slotDuration: '00:20:00',
      weekends: true,
      dayHeaderFormat: { weekday: 'long' },
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      },
      allDaySlot: false,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: true
      },
      eventDidMount: this.renderEventContent.bind(this),
      eventClick: this.handleEventClick.bind(this)
  }

  constructor(
    private modalService: ModalService,
    private cdr: ChangeDetectorRef) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseSchedules'] && changes['courseSchedules'].currentValue) {
      this.updateEvents(changes['courseSchedules'].currentValue);
    }
  }

  private updateEvents(courseSchedules: CourseSchedule[]): void {
    if (courseSchedules.length > 0) {
      // Set the start time of the calendar.
      const startTimes = courseSchedules.map(schedule => schedule.startTime);
      const startDateTimes = startTimes.map(time => new Date(`1970-01-01T${time}`));
      const minStartTime = new Date(Math.min(...startDateTimes.map(date => date.getTime())));
      minStartTime.setHours(minStartTime.getHours() - 1);
      const slotMinTime = minStartTime.toTimeString().slice(0, 8);
      this.calendarOptions.slotMinTime = slotMinTime.toString();
    }

    // Display course schedules on the calendar.
    this.calendarOptions.events = courseSchedules.map(schedule => ({
      title: `${schedule.instructors[0].firstName} ${schedule.instructors[0].lastName} ...`,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      daysOfWeek: [schedule.day],
      id: schedule.id,
      color: '#7E7CF7'
    }));

    this.cdr.detectChanges();
  }

  private renderEventContent(eventInfo: any): void {
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'hover:text-dangerColor fa fa-trash text-[18px] absolute z-10 cursor-pointer top-1 right-1';
  
    deleteIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleDeleteClick(eventInfo.event);
    });

    eventInfo.el.style.cursor = 'pointer';
    eventInfo.el.appendChild(deleteIcon);
  }

  private handleDeleteClick(calendarEvent: any): void {
    const dialogRef = this.modalService.showConfirmationModal('Are you sure to delete the chosen schedule?', 'Deletion Confirmation');

    dialogRef.afterClosed().pipe(
      filter((response: boolean) => response),
      tap(() => this.scheduleDeleted.emit(calendarEvent.id))
    )
    .subscribe();
  }

  private handleEventClick(eventInfo: any): void {
    const scheduleData = this.courseSchedules.find(schedule => schedule.id === eventInfo.event.id);

    this.modalService.showCourseScheduleModal(scheduleData!, this.course.capacity);
  }
}
