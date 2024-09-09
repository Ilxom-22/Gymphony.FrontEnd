import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchedulesManagementCalendarComponent } from './course-schedules-management-calendar.component';

describe('CourseSchedulesManagementCalendarComponent', () => {
  let component: CourseSchedulesManagementCalendarComponent;
  let fixture: ComponentFixture<CourseSchedulesManagementCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSchedulesManagementCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSchedulesManagementCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
