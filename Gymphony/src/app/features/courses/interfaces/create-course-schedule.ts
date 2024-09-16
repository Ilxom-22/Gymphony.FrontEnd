export interface CreateCourseSchedule {
    courseId: string;
    day: string;
    startTime: string;
    endTime: string;
    instructorsIds: string[];
}