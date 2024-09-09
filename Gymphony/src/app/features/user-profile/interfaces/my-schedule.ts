import { Staff } from "../../courses/interfaces/staff";

export interface MySchedule {
    id: string;
    courseName: string;
    day: number;
    startTime: string;
    endTime: string;
    instructors: Staff[];
}