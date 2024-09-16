import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, map, of } from 'rxjs';
import { ModalService } from '../../features/auth/services/modal.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const modalService = inject(ModalService);

  return authService.autoLogIn().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        modalService.showLoginModal();
        return false;
      }
    }),
    catchError(() => {
      modalService.showLoginModal();
      return of(false);
    })
  )
};
