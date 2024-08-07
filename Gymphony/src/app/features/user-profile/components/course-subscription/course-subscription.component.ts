import { Component, Input } from '@angular/core';

import { CourseSubscription } from '../../interfaces/course-subscription.interface';

@Component({
  selector: 'app-course-subscription',
  templateUrl: './course-subscription.component.html',
  styleUrl: './course-subscription.component.css'
})
export class CourseSubscriptionComponent {
  @Input() subscription!: CourseSubscription;

  public dropdownOpen = false;

  public toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
