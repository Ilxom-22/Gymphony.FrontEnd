import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public user?: User;

  constructor(private userService: UserService) {
    this.userService.$user.subscribe(user => this.user = user);
  }
}
