import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsManagementPageComponent } from './admins-management-page.component';

describe('AdminsManagementPageComponent', () => {
  let component: AdminsManagementPageComponent;
  let fixture: ComponentFixture<AdminsManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminsManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
