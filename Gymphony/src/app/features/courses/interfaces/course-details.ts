import { User } from "../../../core/interfaces/user";

export interface CourseDetails {
    id: string;
    name: string;
    description: string;
    durationUnit: string;
    durationCount: number;
    capacity: number;
    sessionDurationInMinutes: number;
    enrollmentsCountPerWeek: number;
    status: string;
    activationDate: Date | null;
    deactivationDate: Date | null;
    price: number;
    createdTime: Date;
    modifiedTime: Date | null;
    createdBy: User
    modifiedBy: User | null;
}