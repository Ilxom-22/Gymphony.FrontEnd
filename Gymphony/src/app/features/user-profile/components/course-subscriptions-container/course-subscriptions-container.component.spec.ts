import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSubscriptionsContainerComponent } from './course-subscriptions-container.component';

describe('CourseSubscriptionComponent', () => {
  let component: CourseSubscriptionsContainerComponent;
  let fixture: ComponentFixture<CourseSubscriptionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseSubscriptionsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSubscriptionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
