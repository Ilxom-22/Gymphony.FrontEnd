export interface MembershipPlan {
    id: string;
    name: string;
    description: string;
    durationUnit: string;
    durationCount: number;
    status: string;
    activationDate: Date;
    deactivationDate: Date;
    price: number;
}
