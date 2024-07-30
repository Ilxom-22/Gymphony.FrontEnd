import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { IdentityToken } from '../../features/auth/interfaces/identity-token.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private localStorageService: LocalStorageService) { }

  public setTokens(identityToken: IdentityToken): void {
    this.localStorageService.set('accessToken', identityToken.accessToken);
    this.localStorageService.set('refreshToken', identityToken.refreshToken);
  }

  public getAccessToken(): string | null {
    return this.localStorageService.get('accessToken');
  }

  public accessTokenExists(): boolean {
    return this.localStorageService.get('accessToken') !== null;
  }

  public getRefreshToken(): string | null {
    return this.localStorageService.get('refreshToken');
  }

  public clearTokens(): void {
    this.localStorageService.remove('accessToken');
    this.localStorageService.remove('refreshToken');
  }
}
