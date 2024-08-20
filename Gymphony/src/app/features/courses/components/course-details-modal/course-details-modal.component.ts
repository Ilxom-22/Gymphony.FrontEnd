import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CourseDetails } from '../../interfaces/course-details';


@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  styleUrl: './course-details-modal.component.css'
})
export class CourseDetailsModalComponent {
  public course: CourseDetails;

  constructor(
    public dialogRef: MatDialogRef<CourseDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDetails)
  {
      this.course = data;
      console.log(data);
  }
}
