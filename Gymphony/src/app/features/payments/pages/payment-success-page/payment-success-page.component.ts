import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success-page',
  templateUrl: './payment-success-page.component.html',
  styleUrl: './payment-success-page.component.css'
})
export class PaymentSuccessPageComponent implements OnInit {
  public product!: string;
  public productType!: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = params['product'];
      this.productType = params['productType'];
    });
  }

  public onProfileClicked(): void {
    this.router.navigate(['/profile']);
  }
}
