import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { courseSubscriptionsResolver } from './course-subscriptions.resolver';

describe('courseSubscriptionsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => courseSubscriptionsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
