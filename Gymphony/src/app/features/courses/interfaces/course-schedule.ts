import { Staff } from "./staff";

export interface CourseSchedule {
    id: string;
    courseId: string;
    day: number;
    startTime: string;
    endTime: string;
    instructors: Staff[];
    isAvailable: boolean;
}