import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MessageState } from '../interfaces/message-state';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<MessageState>({ message: '', type: 'success', duration: 5000 });
  messageState = this.messageSubject.asObservable();

  public triggerSuccess(message: string, duration: number = 5000): void {
    this.messageSubject.next({ message, type: 'success', duration });
  }

  public triggerError(message: string, duration: number = 5000): void {
    this.messageSubject.next({ message, type: 'error', duration });
  }
}
