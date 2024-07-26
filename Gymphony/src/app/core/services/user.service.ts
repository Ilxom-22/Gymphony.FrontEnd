import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | undefined>(undefined);
  $user = this.userSubject.asObservable();

  constructor() { }

  public setUser(user: User): void {
    this.userSubject.next(user);
  }

  public removeUser(): void {
    this.userSubject.next(undefined);
  }
}
