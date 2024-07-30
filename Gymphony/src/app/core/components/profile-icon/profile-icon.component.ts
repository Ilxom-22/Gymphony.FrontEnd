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

  constructor(private modalService: ModalService, private authService: AuthService) { }
  
  @Input() user?: User;

  public openLoginDialog() {
    this.modalService.showLoginModal();
  }

  public logout() {
    this.authService.logout().subscribe(response => response);
  }
}
