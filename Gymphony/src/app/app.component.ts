import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { ModalService } from './features/auth/services/modal.service';
import { tap } from 'rxjs';
import { User } from './core/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  public ngOnInit() {
    
  }
}
