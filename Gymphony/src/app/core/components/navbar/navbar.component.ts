import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public $user?: Observable<User | null>;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.$user = this.userService.$user;
  }
}
