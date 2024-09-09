import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseScheduleModalComponent } from './add-course-schedule-modal.component';

describe('AddCourseScheduleModalComponent', () => {
  let component: AddCourseScheduleModalComponent;
  let fixture: ComponentFixture<AddCourseScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCourseScheduleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
