import { Component, inject, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UserService);

  public user$: Observable<User | null> = this.userService.$user;
}
