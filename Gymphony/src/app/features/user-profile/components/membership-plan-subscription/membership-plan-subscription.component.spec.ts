import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPlanSubscriptionComponent } from './membership-plan-subscription.component';

describe('MembershipPlanSubscriptionComponent', () => {
  let component: MembershipPlanSubscriptionComponent;
  let fixture: ComponentFixture<MembershipPlanSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipPlanSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipPlanSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
