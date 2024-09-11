import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagementPageComponent } from './staff-management-page.component';

describe('StaffManagementPageComponent', () => {
  let component: StaffManagementPageComponent;
  let fixture: ComponentFixture<StaffManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
