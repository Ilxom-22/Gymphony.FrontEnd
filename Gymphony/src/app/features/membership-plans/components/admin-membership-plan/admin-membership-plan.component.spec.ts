import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembershipPlanComponent } from './admin-membership-plan.component';

describe('AdminMembershipPlanComponent', () => {
  let component: AdminMembershipPlanComponent;
  let fixture: ComponentFixture<AdminMembershipPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMembershipPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMembershipPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
