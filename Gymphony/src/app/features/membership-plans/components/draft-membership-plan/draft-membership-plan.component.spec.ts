import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMembershipPlanComponent } from './draft-membership-plan.component';

describe('DraftMembershipPlanComponent', () => {
  let component: DraftMembershipPlanComponent;
  let fixture: ComponentFixture<DraftMembershipPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DraftMembershipPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftMembershipPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
