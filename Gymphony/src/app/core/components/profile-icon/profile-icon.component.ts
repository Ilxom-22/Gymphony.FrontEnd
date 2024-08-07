import { Component, Input } from '@angular/core';

import { User } from '../../interfaces/user';
import { ModalService } from '../../../features/auth/services/modal.service';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.css'
})
export class ProfileIconComponent {
  @Input() user?: User | null;

  constructor(private modalService: ModalService, private authService: AuthService) { }
  
  public openLoginDialog(): void {
    this.modalService.showLoginModal();
  }

  public logout(): void {
    this.authService.logout().subscribe();
  }
}
