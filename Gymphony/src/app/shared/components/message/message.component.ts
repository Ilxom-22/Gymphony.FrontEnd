import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  isVisible: boolean = false;
  private subscription: Subscription = new Subscription();
  private timeoutId?: number;

  constructor(private messageService: MessageService) {}

  public ngOnInit(): void {
    this.subscription = this.messageService.messageState.subscribe(({ message, type, duration }) => {
      this.message = message;
      this.messageType = type;
      this.show(duration);
    });
  }

  public show(duration: number): void {
    this.isVisible = true;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = window.setTimeout(() => {
      this.isVisible = false;
    }, duration);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
