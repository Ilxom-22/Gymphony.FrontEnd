import { Course } from "./course";

export interface Courses {
    draftCourses: Array<Course>;
    activatedCourses: Array<Course>;
    publishedCourses: Array<Course>;
    deactivationRequestedCourses: Array<Course>;
    deactivatedCourses: Array<Course>;
}