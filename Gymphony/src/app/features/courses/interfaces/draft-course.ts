export interface DraftCourse {
    courseId: string;
    name: string;
    description: string;
    durationUnit: string;
    durationCount: number;
    capacity: number;
    sessionDurationInMinutes: number;
    enrollmentsCountPerWeek: number;
    price: number;
}