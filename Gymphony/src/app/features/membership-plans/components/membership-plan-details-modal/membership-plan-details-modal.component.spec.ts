import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPlanDetailsModalComponent } from './membership-plan-details-modal.component';

describe('MembershipPlanDetailsModalComponent', () => {
  let component: MembershipPlanDetailsModalComponent;
  let fixture: ComponentFixture<MembershipPlanDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipPlanDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipPlanDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
