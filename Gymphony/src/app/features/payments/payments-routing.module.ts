import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentSuccessPageComponent } from './pages/payment-success-page/payment-success-page.component';
import { PaymentFailedPageComponent } from './pages/payment-failed-page/payment-failed-page.component';

const routes: Routes = [
  { path: 'payment-successful', component: PaymentSuccessPageComponent },
  { path: 'payment-failed', component: PaymentFailedPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
