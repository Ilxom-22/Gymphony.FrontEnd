import { TestBed } from '@angular/core/testing';

import { MembershipPlanMapper } from './membership-plan-mapper';

describe('MembershipPlanMapperService', () => {
  let service: MembershipPlanMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipPlanMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
