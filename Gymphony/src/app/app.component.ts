import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.autoLogIn().subscribe();
  }
}
