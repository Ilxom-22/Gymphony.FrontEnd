import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSchedulesComponent } from './personal-schedules.component';

describe('PersonalSchedulesComponent', () => {
  let component: PersonalSchedulesComponent;
  let fixture: ComponentFixture<PersonalSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
