import { Injectable } from '@angular/core';

import { DraftMembershipPlan } from '../interfaces/draft-membership-plan';
import { MembershipPlan } from '../interfaces/membership-plan';

@Injectable({
  providedIn: 'root'
})
export class MembershipPlanMapper {

  public membershipPlanToDraft(membershipPlan: MembershipPlan): DraftMembershipPlan {
    return {
      membershipPlanId: membershipPlan.id,
      name: membershipPlan.name,
      description: membershipPlan.description,
      durationUnit: membershipPlan.durationUnit,
      durationCount: membershipPlan.durationCount,
      price: membershipPlan.price,
    };
  }
}
