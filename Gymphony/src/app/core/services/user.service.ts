import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../interfaces/user';
import { UserProfileImage } from '../interfaces/user-profile-image';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public $user: Observable<User | null> = this.userSubject.asObservable();

  public isLoggedIn(): boolean {
    if (this.userSubject.value) {
      return true;
    } else {
      return false;
    }
  }

  public setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  public setUserProfileImage(profileImage: UserProfileImage): void {
    const currentUser = this.userSubject.getValue();

    if (currentUser) {
      currentUser.profileImage = profileImage;
      this.userSubject.next(currentUser);
    }
  }
}
