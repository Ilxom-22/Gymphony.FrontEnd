import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../../core/interfaces/user';
import { UserService } from '../../../../core/services/user.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  private userService = inject(UserService);

  public user$: Observable<User | null> = this.userService.$user;
}
