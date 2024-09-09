import { TestBed } from '@angular/core/testing';

import { CourseMapperService } from './course-mapper.service';

describe('CourseMapperService', () => {
  let service: CourseMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
