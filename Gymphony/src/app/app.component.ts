import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './core/interfaces/user';
import { UserService } from './core/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private userService = inject(UserService);
  public user$: Observable<User | null> = this.userService.user$;
}
