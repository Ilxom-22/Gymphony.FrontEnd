import { UserMembershipPlan } from "./user-membership-plan.interface";

export interface MembershipPlanSubscription {
    id: string;
    membershipPlan: UserMembershipPlan;
    startDate: Date;
    expiryDate: Date;
}