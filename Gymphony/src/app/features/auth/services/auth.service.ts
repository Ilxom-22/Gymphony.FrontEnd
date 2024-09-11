import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap, switchMap, throwError, empty, EMPTY } from 'rxjs';

import { SignUpDetails } from '../interfaces/sign-up-details.interface';
import { User } from '../../../core/interfaces/user';
import { SignInDetails } from '../interfaces/sign-in-details.interface';
import { IdentityToken } from '../interfaces/identity-token.interface';
import { UserService } from '../../../core/services/user.service';
import { JwtService } from '../../../core/services/jwt.service';
import { PasswordReset } from '../interfaces/password-reset.interface';
import { ChangePassword } from '../interfaces/change-password.interface';
import { ApiError } from '../../../core/interfaces/api-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient, private userService: UserService, private jwtService: JwtService) { }

  public signUp(signUpDetails: SignUpDetails): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/sign-up-by-email`, signUpDetails)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public signIn(signInDetails: SignInDetails): Observable<User> {
    return this.http.post<IdentityToken>(`${this.apiUrl}/auth/sign-in-by-email`, signInDetails)
      .pipe(
        tap((identityToken: IdentityToken) => this.jwtService.setTokens(identityToken)),
        switchMap(() => this.getCurrentLoggedInUser()),
        catchError((error: HttpErrorResponse) => this.handlerError(error))
      );
  }

  public refreshToken(): Observable<User | null> {
    if (!this.jwtService.refreshTokenExists()) {
      return of(null);
    }
    
    const refreshToken = this.jwtService.getRefreshToken();
    return this.http.post<IdentityToken>(`${this.apiUrl}/auth/refresh-token`, { refreshToken })
      .pipe(
        tap((identityToken: IdentityToken) => this.jwtService.setTokens(identityToken)),
        switchMap(() => this.getCurrentLoggedInUser()),
        catchError((error: HttpErrorResponse) => {
          this.jwtService.clearTokens();
          this.handlerError(error);

          return EMPTY;
        })
      );
  }

  public getCurrentLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`)
      .pipe(
        tap((user: User) => this.userService.setUser(user)),
        catchError((error: HttpErrorResponse) => this.handlerError(error))
      );
  }

  public autoLogIn(): Observable<User | null> {
    if (this.jwtService.accessTokenExists()) {
      return this.getCurrentLoggedInUser().pipe(
        catchError(() => this.refreshToken())
      );
    }

    return of(null);
  }

  public logout(): Observable<object> {
    return this.http.post(`${this.apiUrl}/auth/log-out`, null)
      .pipe(
        tap(() => {
          this.jwtService.clearTokens();
          this.userService.setUser(null);
      }),
      catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public verifyAccount(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/verify-email`, { token } )
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public forgotPassword(emailAddress: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/auth/forgot-password/${emailAddress}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public resetPassword(passwordReset: PasswordReset): Observable<object> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, passwordReset)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public changePassword(changePassword: ChangePassword): Observable<object> {
    return this.http.post(`${this.apiUrl}/auth/change-password`, changePassword)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public resendAccountVerificationEmail(emailAddress: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/auth/resend-email-verification-message/${emailAddress}`)
      .pipe(catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  public blockMyself(adminId: string): Observable<object> {
    return this.http.put(`${this.apiUrl}/admins/block/${adminId}`, null)
      .pipe(
        tap(() => {
          this.jwtService.clearTokens();
          this.userService.setUser(null);
        }),
        catchError((error: HttpErrorResponse) => this.handlerError(error)));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => error.error as ApiError);
  }
}
