import { Component, Input } from '@angular/core';

import { Course } from '../../interfaces/course';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() course!: Course;
}
