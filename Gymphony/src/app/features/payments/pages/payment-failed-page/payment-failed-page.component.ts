import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed-page',
  templateUrl: './payment-failed-page.component.html',
  styleUrl: './payment-failed-page.component.css'
})
export class PaymentFailedPageComponent {
  constructor(private router: Router) { }

  public onMembershipPlansClicked(): void {
    this.router.navigate(['/plans']);
  }

  public onCoursesClicked(): void {
    this.router.navigate(['/courses']);
  }
}
