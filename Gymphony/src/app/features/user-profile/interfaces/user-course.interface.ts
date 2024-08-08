import { CourseImage } from "./course-image.interface";

export interface Course {
    id: string;
    name: string;
    description: string;
    sessionDurationInMinutes: string;
    image: CourseImage;
}