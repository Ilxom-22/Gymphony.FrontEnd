import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { catchError, EMPTY, filter, finalize, forkJoin, switchMap, tap } from 'rxjs';

import { MessageService } from '../../../../shared/services/message.service';
import { CoursesService } from '../../services/courses.service';
import { CourseSchedule } from '../../interfaces/course-schedule';
import { SubscriptionsService } from '../../../user-profile/services/subscriptions.service';
import { CheckoutSession } from '../../../membership-plans/interfaces/checkout-session';
import { SubscribeForCourse } from '../../interfaces/subscribe-for-course';
import { ApiError } from '../../../../core/interfaces/api-error';
import { Course } from '../../interfaces/course';
import { PublicCourses } from '../../interfaces/public-courses';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-course-schedules',
  templateUrl: './course-schedules.component.html',
  styleUrl: './course-schedules.component.css'
})
export class CourseSchedulesComponent implements OnInit {
  public courseId!: string;
  public course!: Course;
  public sessionsCount!: number;
  public courseSchedules: CourseSchedule[] = [];
  public selectedScheduleIds: string[] = [];
  public courses!: Course[];
  public selectedCourseName!: string;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private coursesService: CoursesService,
    private subscriptionsService: SubscriptionsService,
    private router: Router,
    private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(params => !!params['courseId']),
      tap(params => {
        this.courseId = params['courseId'];
        this.sessionsCount = params['sessions'];
      }),
      switchMap(() =>
        forkJoin({
          course: this.coursesService.getCourseById(this.courseId),
          courseSchedules: this.coursesService.getActiveCourseSchedules(this.courseId),
          publicCourses: this.coursesService.getPublicCourses()
        })
      ),
      tap(({ course, courseSchedules, publicCourses }) => {
        this.course = course;
        this.selectedCourseName = course.name;
        this.courseSchedules = courseSchedules;
        this.courses = publicCourses.activatedCourses.filter(c => c.id !== this.courseId);
      }),
      catchError(() => {
        this.messageService.triggerError('An unexpected error occurred. Please try again later.');
        this.router.navigate(['/courses']);
        return EMPTY;
      })
    ).subscribe();
  }

  public selectCourse(course: Course): void {
    this.selectedScheduleIds = [];
    this.router.navigate([`/courses/schedules`], {
      queryParams: {
        courseId: encodeURIComponent(course.id),
        sessions: encodeURIComponent(course.enrollmentsCountPerWeek)
      }
    });
  }

  public onScheduleSelected(scheduleId: string): void {
    this.selectedScheduleIds.push(scheduleId);
  }

  public onScheduleDelselected(scheduleId: string): void {
    this.selectedScheduleIds = this.selectedScheduleIds.filter(schedule => schedule !== scheduleId);
  }

  public onEnroll(): void {
    if (this.selectedScheduleIds.length != this.sessionsCount) {
      this.messageService.triggerError(`Please select exactly ${this.sessionsCount} schedules.`);
      return;
    }

    const subscribeForCourse: SubscribeForCourse = {
      courseId: this.courseId,
      schedulesIds: this.selectedScheduleIds,
      successUrl: `http://localhost:4200/payments/payment-successful?product=${this.course.name}&productType=course`,
      cancelUrl: `http://localhost:4200/payments/payment-failed`
    };

    this.loaderService.show();

    this.subscriptionsService.subscribeForCourse(subscribeForCourse).pipe(
      tap((checkoutSession: CheckoutSession) => this.redirectToStripeCheckout(checkoutSession)),
      catchError((error: ApiError) => {
        if (error.status === 400) {
          this.messageService.triggerError(error.detail);
        }
        return EMPTY;
      }),
      finalize(() => this.loaderService.hide())
    )
    .subscribe();
  }

  private async redirectToStripeCheckout(checkoutSession: CheckoutSession) {
    const stripe = await loadStripe(checkoutSession.publicKey);

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: checkoutSession.sessionId });
    }
  }
}
