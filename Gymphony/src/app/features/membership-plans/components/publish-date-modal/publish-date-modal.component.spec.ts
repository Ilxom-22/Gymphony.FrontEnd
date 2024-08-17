import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishDateModalComponent } from './publish-date-modal.component';

describe('PublishDateModalComponent', () => {
  let component: PublishDateModalComponent;
  let fixture: ComponentFixture<PublishDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishDateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
