import { Injectable } from '@angular/core';

import { DraftCourse } from '../interfaces/draft-course';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseMapperService {
  public courseToDraft(course: Course): DraftCourse {
    return {
      courseId: course.id,
      name: course.name,
      description: course.description,
      durationUnit: course.durationUnit,
      durationCount: course.durationCount,
      capacity: course.capacity,
      sessionDurationInMinutes: course.sessionDurationInMinutes,
      enrollmentsCountPerWeek: course.enrollmentsCountPerWeek,
      price: course.price,
    };
  }
}
