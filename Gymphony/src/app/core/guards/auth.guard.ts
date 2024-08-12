import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { ModalService } from '../../features/auth/services/modal.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const modalService = inject(ModalService);

  if (userService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/home'])
      .then(() => modalService.showLoginModal());

    return false;
  }
};
