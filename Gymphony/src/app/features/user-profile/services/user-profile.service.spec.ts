import { TestBed } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';

describe('UserProfileResolverService', () => {
  let service: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
