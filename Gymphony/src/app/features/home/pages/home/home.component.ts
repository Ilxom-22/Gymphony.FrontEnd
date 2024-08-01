import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { ModalService } from '../../../auth/services/modal.service';
import { User } from '../../../../core/interfaces/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private modalService: ModalService) { }

  public ngOnInit(): void {
    this.authService.autoLogIn()
      .pipe(tap((response: User | null) => {
        if (response === null) {
          this.modalService.showLoginModal();
        }
      }))
      .subscribe();
  }
}
