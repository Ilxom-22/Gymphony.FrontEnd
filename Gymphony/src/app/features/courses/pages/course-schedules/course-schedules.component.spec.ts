import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSchedulesComponent } from './course-schedules.component';

describe('CourseSchedulesComponent', () => {
  let component: CourseSchedulesComponent;
  let fixture: ComponentFixture<CourseSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
