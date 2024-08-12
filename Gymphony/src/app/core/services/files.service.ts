import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserProfileImage } from '../interfaces/user-profile-image';


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl: string = "https://localhost:7182/api";

  constructor(private http: HttpClient) { }

  public uploadProfileImage(formData: FormData): Observable<UserProfileImage> {
    return this.http.post<UserProfileImage>(`${this.apiUrl}/files/profileImages`, formData)
  }
 
}
