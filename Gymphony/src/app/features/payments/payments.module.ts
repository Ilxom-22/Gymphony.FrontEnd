import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentFailedPageComponent } from './pages/payment-failed-page/payment-failed-page.component';
import { PaymentSuccessPageComponent } from './pages/payment-success-page/payment-success-page.component';


@NgModule({
  declarations: [
    PaymentSuccessPageComponent,
    PaymentFailedPageComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule
  ]
})
export class PaymentsModule { }
