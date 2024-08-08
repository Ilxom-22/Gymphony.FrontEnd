import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPlansContainerComponent } from './membership-plans-container.component';

describe('MembershipPlansContainerComponent', () => {
  let component: MembershipPlansContainerComponent;
  let fixture: ComponentFixture<MembershipPlansContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershipPlansContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipPlansContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
