import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailedPageComponent } from './payment-failed-page.component';

describe('PaymentFailedPageComponent', () => {
  let component: PaymentFailedPageComponent;
  let fixture: ComponentFixture<PaymentFailedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentFailedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
