import { Staff } from "./staff";

export interface CourseSchedule {
    id: string;
    courseId: string;
    day: string;
    startTime: Date;
    endTime: Date;
    instructors: Staff;
    isAvailable: boolean;
}