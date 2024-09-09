import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchedulesManagementComponent } from './course-schedules-management.component';

describe('CourseSchedulesManagementComponent', () => {
  let component: CourseSchedulesManagementComponent;
  let fixture: ComponentFixture<CourseSchedulesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSchedulesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSchedulesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
