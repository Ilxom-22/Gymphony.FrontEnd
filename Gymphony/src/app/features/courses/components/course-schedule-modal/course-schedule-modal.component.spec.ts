import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScheduleModalComponent } from './course-schedule-modal.component';

describe('CourseScheduleModalComponent', () => {
  let component: CourseScheduleModalComponent;
  let fixture: ComponentFixture<CourseScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseScheduleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
