import { Component, inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { User } from './core/interfaces/user';
import { UserService } from './core/services/user.service';
import { LoaderService } from './core/services/loader.service';
import { AuthService } from './features/auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  private userService = inject(UserService);
  public user$: Observable<User | null> = this.userService.user$;

  private loaderService = inject(LoaderService);
  public isLoaderShown$: Observable<boolean> = this.loaderService.isLoaderShown$;

  public ngOnInit(): void {
    this.loaderService.show();

    this.authService.autoLogIn().pipe(
      finalize(() => this.loaderService.hide())
    )
    .subscribe();
  }
}
