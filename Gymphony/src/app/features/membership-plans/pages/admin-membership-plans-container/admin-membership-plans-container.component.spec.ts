import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembershipPlansContainerComponent } from './admin-membership-plans-container.component';

describe('AdminMembershipPlansContainerComponent', () => {
  let component: AdminMembershipPlansContainerComponent;
  let fixture: ComponentFixture<AdminMembershipPlansContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMembershipPlansContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMembershipPlansContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
