import { Course } from "./course";

export interface PublicCourses {
    activatedCourses: Course[];
    publishedCourses: Course[];
}