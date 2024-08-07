import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { membershipPlanSubscriptionResolver } from './membership-plan-subscription.resolver';

describe('membershipPlanSubscriptionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => membershipPlanSubscriptionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
