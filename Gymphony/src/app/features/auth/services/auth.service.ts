import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, tap, switchMap } from 'rxjs';
import { SignUpDetails } from '../interfaces/sign-up-details.interface';
import { User } from '../../../core/interfaces/user';
import { SignInDetails } from '../interfaces/sign-in-details.interface';
import { IdentityToken } from '../interfaces/identity-token.interface';
import { UserService } from '../../../core/services/user.service';
import { JwtService } from '../../../core/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient, private userService: UserService, private jwtService: JwtService) { }

  public signUp(signUpDetails: SignUpDetails): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/sign-up-by-email`, signUpDetails)
      .pipe(
        tap((user: User) => this.userService.setUser(user)),
        catchError(this.handleError<User>('sign up'))
      );
  }

  public signIn(signInDetails: SignInDetails): Observable<User> {
    return this.http.post<IdentityToken>(`${this.apiUrl}/auth/sign-in-by-email`, signInDetails)
      .pipe(tap((identityToken: IdentityToken) => this.jwtService.setTokens(identityToken)),
        switchMap(() => this.getCurrentLoggedInUser()),
        catchError(this.handleError<User>('sign in')));
  }

  public getCurrentLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/me`)
      .pipe(tap((user: User) => this.userService.setUser(user)),
        catchError(this.handleError<User>('getCurrentLoggedInUser')));
  }

  public autoLogIn(): Observable<User> | null {
    if (this.jwtService.accessTokenExists()) {
      return this.getCurrentLoggedInUser();
    }

    return null;
  }

  public logout() {
    return this.http.post(`${this.apiUrl}/auth/log-out`, null)
      .pipe(tap(() => {
        this.jwtService.clearTokens();
        this.userService.removeUser();
      }));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
