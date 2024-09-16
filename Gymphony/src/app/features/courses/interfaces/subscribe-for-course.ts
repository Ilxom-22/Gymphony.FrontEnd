export interface SubscribeForCourse {
    courseId: string;
    schedulesIds: string[];
    successUrl: string;
    cancelUrl: string;
}