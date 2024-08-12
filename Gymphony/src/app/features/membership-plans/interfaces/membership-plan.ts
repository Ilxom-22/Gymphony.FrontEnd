export interface MembershipPlan {
    id: string;
    name: string;
    description: string;
    durationUnit: string;
    durationCount: number;
    status: string;
    activationDate: Date;
    price: number;
}
