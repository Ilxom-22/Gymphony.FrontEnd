import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public $user: Observable<User | null> = this.userSubject.asObservable();

  constructor() { }

  public setUser(user: User | null): void {
    this.userSubject.next(user);
  }
}
