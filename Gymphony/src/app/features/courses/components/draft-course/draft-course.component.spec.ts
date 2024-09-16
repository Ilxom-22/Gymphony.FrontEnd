import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCourseComponent } from './draft-course.component';

describe('DraftCourseComponent', () => {
  let component: DraftCourseComponent;
  let fixture: ComponentFixture<DraftCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DraftCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
