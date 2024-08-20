import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesContainerComponent } from './admin-courses-container.component';

describe('AdminCoursesContainerComponent', () => {
  let component: AdminCoursesContainerComponent;
  let fixture: ComponentFixture<AdminCoursesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCoursesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoursesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
