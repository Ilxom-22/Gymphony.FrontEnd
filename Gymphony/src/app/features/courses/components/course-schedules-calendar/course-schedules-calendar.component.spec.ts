import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchedulesCalendarComponent } from './course-schedules-calendar.component';

describe('CourseSchedulesCalendarComponent', () => {
  let component: CourseSchedulesCalendarComponent;
  let fixture: ComponentFixture<CourseSchedulesCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSchedulesCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSchedulesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
