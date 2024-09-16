import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

import { Staff } from '../../interfaces/staff';
import { StaffService } from '../../../staff/services/staff.service';
import { MessageService } from '../../../../shared/services/message.service';
import { CreateCourseSchedule } from '../../interfaces/create-course-schedule';

@Component({
  selector: 'app-add-course-schedule-modal',
  templateUrl: './add-course-schedule-modal.component.html',
  styleUrl: './add-course-schedule-modal.component.css'
})
export class AddCourseScheduleModalComponent {
  public courseScheduleForm!: FormGroup;
  public weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public instructors: Staff[] = [];
  public endTime: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddCourseScheduleModalComponent>,
    private staffService: StaffService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: string, sessionDurationInMinutes: number }) {
  }

  public ngOnInit(): void {
    this.courseScheduleForm = new FormGroup({
      day: new FormControl<string>('', Validators.required),
      startTime: new FormControl<string>('', Validators.required),
      endTime: new FormControl<string>(''),
      instructorsIds: new FormControl<string>('', Validators.required)
    });

    this.staffService.getAllStaff().pipe(
      tap((staff: Staff[]) => this.instructors = staff),
      switchMap(() => this.courseScheduleForm.get('startTime')!.valueChanges.pipe(
        tap(startTime => this.calculateEndTime(startTime))
      ))
    ).subscribe();
  }

  private calculateEndTime(startTime: string): void {
    if (!startTime) return;

    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours);
    startDate.setMinutes(minutes);
    startDate.setSeconds(0);

    const endDate = new Date(startDate.getTime() + this.data.sessionDurationInMinutes * 60000);
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

    this.endTime = `${endHours}:${endMinutes}`;
  }

  public onSubmit(): void {
    if (this.courseScheduleForm.invalid) {
      return;
    }

    const schedule = this.courseScheduleForm.value;
    schedule.startTime += ':00';
    schedule.endTime = this.endTime + ':00';
    const schedules: CreateCourseSchedule[] = [];
    
    for(let day of this.courseScheduleForm.value.day) {
      schedules.push({
        courseId: this.data.courseId,
        day: day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        instructorsIds: schedule.instructorsIds
      })
    }

    this.dialogRef.close(schedules as CreateCourseSchedule[]);
  }
}
