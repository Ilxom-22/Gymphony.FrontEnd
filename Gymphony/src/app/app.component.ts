import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gymphony';

  constructor(private authService: AuthService) { }

  public ngOnInit() {
    this.authService.getCurrentLoggedInUser().subscribe(response => response);
  }
}
