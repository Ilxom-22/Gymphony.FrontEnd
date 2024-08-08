import { Course } from "./user-course.interface";

export interface CourseSubscription {
    id: string;
    course: Course;
    startDate: Date;
    expiryDate: Date;
}