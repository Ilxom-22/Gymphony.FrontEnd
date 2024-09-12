import { Component, inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { ModalService } from '../../../auth/services/modal.service';
import { User } from '../../../../core/interfaces/user';
import { UserService } from '../../../../core/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private modalService: ModalService) { }

  private userService = inject(UserService);
  public user$: Observable<User | null> = this.userService.user$;

  public onJoinClick(): void {
    this.modalService.showRegisterModal();
  }
}
