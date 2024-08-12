import { MembershipPlan } from "./membership-plan";

export interface PublicMembershipPlans {
    activatedPlans: Array<MembershipPlan>;
    publishedPlans: Array<MembershipPlan>;
}
