import { MembershipPlan } from "./membership-plan";

export interface MembershipPlans {
    draftPlans: Array<MembershipPlan>;
    activatedPlans: Array<MembershipPlan>;
    publishedPlans: Array<MembershipPlan>;
    deactivationRequestedPlans: Array<MembershipPlan>;
    deactivatedPlans: Array<MembershipPlan>;
}