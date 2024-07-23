import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { SignUpDetails } from '../interfaces/sign-up-details.interface';
import { User } from '../../../core/interfaces/user';
import { SignInDetails } from '../interfaces/sign-in-details.interface';
import { IdentityToken } from '../interfaces/identity-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  signUp(signUpDetails: SignUpDetails): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/sign-up-by-email`, signUpDetails)
      .pipe(catchError(this.handleError<User>('sign up')));
  }

  signIn(signInDetails: SignInDetails): Observable<IdentityToken> {
    return this.http.post<IdentityToken>(`${this.apiUrl}/auth/sign-in-by-email`, signInDetails)
      .pipe(catchError(this.handleError<IdentityToken>('sign in')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
