import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { CourseSchedule } from '../../interfaces/course-schedule';
import { ModalService } from '../../../auth/services/modal.service';

@Component({
  selector: 'app-course-schedules-calendar',
  templateUrl: './course-schedules-calendar.component.html',
  styleUrls: ['./course-schedules-calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSchedulesCalendarComponent {
  @Input() courseSchedules!: CourseSchedule[];
  @Output() scheduleSelected = new EventEmitter<string>();
  @Output() scheduleUnselected = new EventEmitter<string>();
  public calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: '',
        center: '',
        right: ''
      },
      height: 550,
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
    if (courseSchedules.length <= 0) {
      return;
    }

    // Set the start time of the calendar.
    const startTimes = courseSchedules.map(schedule => schedule.startTime);
    const startDateTimes = startTimes.map(time => new Date(`1970-01-01T${time}`));
    const minStartTime = new Date(Math.min(...startDateTimes.map(date => date.getTime())));
    minStartTime.setHours(minStartTime.getHours() - 1);
    const slotMinTime = minStartTime.toTimeString().slice(0, 8);
    this.calendarOptions.slotMinTime = slotMinTime.toString();
   
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
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.position = 'absolute';
    checkbox.style.top = '5px';
    checkbox.style.right = '5px';
    checkbox.style.zIndex = '10';
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';
    checkbox.style.cursor = 'pointer';
    checkbox.style.accentColor = '#28a745';
    checkbox.style.border = '2px solid #007bff';
    checkbox.style.borderRadius = '4px';
    checkbox.style.backgroundColor = '#f8f9fa';

    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    eventInfo.el.style.cursor = 'pointer';

    checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e, eventInfo.event));
    eventInfo.el.appendChild(checkbox);
  }

  private handleCheckboxChange(event: Event, calendarEvent: any): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.scheduleSelected.emit(calendarEvent.id);
    } else {
      this.scheduleUnselected.emit(calendarEvent.id);
    }
  }

  private handleEventClick(eventInfo: any): void {
    const scheduleData = this.courseSchedules.find(schedule => schedule.id === eventInfo.event.id);

    this.modalService.showCourseScheduleModal(scheduleData!);
  }
}
