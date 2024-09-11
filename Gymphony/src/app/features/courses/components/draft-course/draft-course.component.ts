import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

import { DraftCourse } from '../../interfaces/draft-course';
import { CoursesService } from '../../services/courses.service';
import { MessageService } from '../../../../shared/services/message.service';
import { Course } from '../../interfaces/course';
import { ApiError } from '../../../../core/interfaces/api-error';
import { LoaderService } from '../../../../core/services/loader.service';


@Component({
  selector: 'app-draft-course',
  templateUrl: './draft-course.component.html',
  styleUrl: './draft-course.component.css'
})
export class DraftCourseComponent {
  public course: DraftCourse;
  public isNewCourse: boolean;
  public courseForm!: FormGroup;
  public selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<DraftCourseComponent>,
    private coursesService: CoursesService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: DraftCourse | null) { 
      this.isNewCourse = data === null;
      this.course = data !== null 
        ? data 
        : {
            courseId: '',
            name: '',
            description: '',
            durationUnit: '',
            durationCount: 0,
            capacity: 0,
            sessionDurationInMinutes: 0,
            enrollmentsCountPerWeek: 0,
            price: 0,
          };
  }

  public ngOnInit() {
    this.courseForm = new FormGroup({
      name: new FormControl<string>(this.course?.name, Validators.required),
      description: new FormControl<string>(this.course.description, Validators.required),
      durationUnit: new FormControl<string>(this.course.durationUnit, Validators.required),
      durationCount: new FormControl<number>(this.course.durationCount, Validators.required),
      capacity: new FormControl<number>(this.course.durationCount, Validators.required),
      sessionDurationInMinutes: new FormControl<number>(this.course.sessionDurationInMinutes, Validators.required),
      enrollmentsCountPerWeek: new FormControl<number>(this.course.enrollmentsCountPerWeek, Validators.required),
      price: new FormControl<number>(this.course.price, Validators.required),
    });
  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  public submit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const newCourse = this.courseForm.value as DraftCourse;
    newCourse.courseId = this.course.courseId;
    const newCourseFormData = this.mapToFormData(newCourse);

    if (this.isNewCourse) {
      if (!this.selectedFile) {
        this.messageService.triggerError('Upload course image, please.');
        return;
      }

      this.loaderService.show();
      this.coursesService.createCourse(newCourseFormData).pipe(
        tap((course: Course) => {
          this.dialogRef.close(course);
          this.messageService.triggerSuccess(`Course - "${course.name}" is created successfully in draft status.`);
        }),
        catchError((error: ApiError) => {
          if (error.status === 400) {
            this.messageService.triggerError(error.detail);
          } else if (error.status === 500) {
            this.messageService.triggerError('An unexpected error occured. Please try again later.');
          }
          
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
    }
    else {
      this.loaderService.show();
      this.coursesService.updateCourse(newCourse).pipe(
        tap((course: Course) => {
          this.dialogRef.close(course);
          this.messageService.triggerSuccess(`Course updated successfully.`);
        }),
        catchError((error: ApiError) => {
          if (error.status === 400) {
            this.messageService.triggerError(error.detail);
          } else if (error.status === 500) {
            this.messageService.triggerError('An unexpected error occured. Please try again later.');
          }
          
          return EMPTY;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
    }
  }

  private mapToFormData(course: DraftCourse): FormData {
    const formData = new FormData();
    formData.append('courseId', course.courseId);
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('durationUnit', course.durationUnit);
    formData.append('durationCount', course.durationCount.toString());
    formData.append('capacity', course.capacity.toString());
    formData.append('sessionDurationInMinutes', course.sessionDurationInMinutes.toString());
    formData.append('enrollmentsCountPerWeek', course.enrollmentsCountPerWeek.toString());
    formData.append('price', course.price.toString());
    formData.append('courseImage', this.selectedFile!);

    return formData;
  }
}
