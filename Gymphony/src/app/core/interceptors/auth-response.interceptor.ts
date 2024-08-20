import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

import { MessageService } from "../../shared/services/message.service";
import { ModalService } from "../../features/auth/services/modal.service";
import { ApiError } from "../interfaces/api-error";

@Injectable({
    providedIn: 'root'
})
export class AuthResponseInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService,
        private modalService: ModalService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        this.messageService.triggerError('Login or Register please.');
                        this.modalService.showLoginModal();
                        break;
                    case 403:
                        const apiError = error.error as ApiError;
                        if (apiError.detail) {
                            this.messageService.triggerError(apiError.detail);
                        }
                        break;
                }
                return throwError(() => error);
            })
        );
    }

}