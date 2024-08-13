import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, EMPTY, switchMap, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.css'
})
export class AccountVerificationComponent implements OnInit {
  verificationStatus?: string;
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let token: string = decodeURIComponent(params['Token']);

      if (token) {
        this.verifyAccount(token);
      } else {
        this.verificationStatus = 'No token found in query parameters.';
        this.isSuccess = false;
      }
    });
  }

  public verifyAccount(token: string): void {
    this.authService.verifyAccount(token).pipe(
      tap(() => {
        this.verificationStatus = 'Verification successful!';
        this.isSuccess = true;
      }),
      switchMap(() => this.authService.autoLogIn()),
      delay(5000),
      tap(() => this.router.navigate(['/home'])),
      catchError(error => {
        if (error.status === 400) {
          this.verificationStatus = 'Verification Link is expired!';
        } else {
          this.verificationStatus = 'An unexpected error occured.'
        }
        this.isSuccess = false;
        return EMPTY;
      })
    )
    .subscribe();
  }
}
