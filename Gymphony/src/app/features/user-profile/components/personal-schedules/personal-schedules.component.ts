import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CourseSchedule } from '../../../courses/interfaces/course-schedule';
import { ModalService } from '../../../auth/services/modal.service';
import { filter, tap } from 'rxjs';
import { MySchedule } from '../../interfaces/my-schedule';

@Component({
  selector: 'app-personal-schedules',
  templateUrl: './personal-schedules.component.html',
  styleUrl: './personal-schedules.component.css'
})
export class PersonalSchedulesComponent {
  @Input() mySchedules!: MySchedule[];
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
    if (changes['mySchedules'] && changes['mySchedules'].currentValue) {
      this.updateEvents(changes['mySchedules'].currentValue);
    }
  }

  private updateEvents(mySchedules: MySchedule[]): void {
    if (mySchedules.length <= 0) {
      return;
    }

    // Set the start time of the calendar.
    const startTimes = mySchedules.map(schedule => schedule.startTime);
    const startDateTimes = startTimes.map(time => new Date(`1970-01-01T${time}`));
    const minStartTime = new Date(Math.min(...startDateTimes.map(date => date.getTime())));
    minStartTime.setHours(minStartTime.getHours() - 1);
    const slotMinTime = minStartTime.toTimeString().slice(0, 8);
    this.calendarOptions.slotMinTime = slotMinTime.toString();
   
    // Display course schedules on the calendar.
    this.calendarOptions.events = mySchedules.map(schedule => ({
      title: schedule.courseName,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      daysOfWeek: [schedule.day],
      id: schedule.id,
      color: '#7E7CF7'
    }));

    this.cdr.detectChanges();
  }

  private renderEventContent(eventInfo: any): void {
    eventInfo.el.style.cursor = 'pointer';
  }

  private handleEventClick(eventInfo: any): void {
    const scheduleData = this.mySchedules.find(schedule => schedule.id === eventInfo.event.id);

    const courseSchedule: CourseSchedule = {
      id: scheduleData!.id,
      courseId: scheduleData!.courseName,
      day: scheduleData!.day,
      startTime: scheduleData!.startTime,
      endTime: scheduleData!.endTime,
      instructors: scheduleData!.instructors,
      isAvailable: false,
      enrollmentsCount: 0
    }
    this.modalService.showCourseScheduleModal(courseSchedule);
  }
}
