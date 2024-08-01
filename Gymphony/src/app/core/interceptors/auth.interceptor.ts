import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

import { JwtService } from "../services/jwt.service";


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken: string | null = this.jwtService.getAccessToken();

        if (!accessToken) {
            return next.handle(req);
        }

        const clonedReq: HttpRequest<any> = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        return next.handle(clonedReq);
    }
}