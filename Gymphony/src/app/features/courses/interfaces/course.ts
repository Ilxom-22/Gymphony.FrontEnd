import { CourseImage } from "../../user-profile/interfaces/course-image.interface";

export interface Course {
    id: string;
    name: string;
    description: string;
    durationUnit: string;
    durationCount: number;
    capacity: number;
    sessionDurationInMinutes: number;
    enrollmentsCountPerWeek: number;
    status: string;
    activationDate: Date;
    deactivationDate: Date;
    price: number;
    image: CourseImage;
}