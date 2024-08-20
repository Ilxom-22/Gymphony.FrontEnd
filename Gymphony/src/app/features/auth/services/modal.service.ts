import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginModalComponent } from '../components/login-modal/login-modal.component';
import { RegisterModalComponent } from '../components/register-modal/register-modal.component';
import { ForgotPasswordModalComponent } from '../components/forgot-password-modal/forgot-password-modal.component';
import { ChangePasswordModalComponent } from '../../user-profile/components/change-password-modal/change-password-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { User } from '../../../core/interfaces/user';
import { MembershipPlanDetails } from '../../membership-plans/interfaces/membership-plan-details';
import { MembershipPlanDetailsModalComponent } from '../../membership-plans/components/membership-plan-details-modal/membership-plan-details-modal.component';
import { PublishDateModalComponent } from '../../membership-plans/components/publish-date-modal/publish-date-modal.component';
import { DraftMembershipPlan } from '../../membership-plans/interfaces/draft-membership-plan';
import { DraftMembershipPlanComponent } from '../../membership-plans/components/draft-membership-plan/draft-membership-plan.component';
import { PriceModalComponent } from '../../membership-plans/components/price-modal/price-modal.component';
import { CourseDetails } from '../../courses/interfaces/course-details';
import { CourseDetailsModalComponent } from '../../courses/components/course-details-modal/course-details-modal.component';
import { DraftCourse } from '../../courses/interfaces/draft-course';
import { DraftCourseComponent } from '../../courses/components/draft-course/draft-course.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  public showLoginModal(): MatDialogRef<LoginModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(LoginModalComponent);

    return dialogRef;
  }

  public showRegisterModal(): MatDialogRef<RegisterModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(RegisterModalComponent);

    return dialogRef;
  }

  public showForgotPasswordModal(): MatDialogRef<ForgotPasswordModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(ForgotPasswordModalComponent);

    return dialogRef;
  }

  public showChangePasswordModal(user: User): MatDialogRef<ChangePasswordModalComponent, any> {
    this.closeAllModals();
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, { data: { user } });

    return dialogRef;
  }

  public showConfirmationModal(message: string, header?: string): MatDialogRef<ConfirmationModalComponent, any> {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { header, message }
    });

    return dialogRef;
  }

  public showMembershipPlanDetailsModal(planDetails: MembershipPlanDetails): MatDialogRef<MembershipPlanDetailsModalComponent, any> {
    const dialogRef = this.dialog.open(MembershipPlanDetailsModalComponent, {
      data: planDetails
    });

    return dialogRef;
  }

  public showCourseDetailsModal(CourseDetails: CourseDetails): MatDialogRef<CourseDetailsModalComponent, any> {
    const dialogRef = this.dialog.open(CourseDetailsModalComponent, {
      data: CourseDetails
    });

    return dialogRef;
  }

  public showPublishDateModal(productName: string): MatDialogRef<PublishDateModalComponent, any> {
    const dialogRef = this.dialog.open(PublishDateModalComponent, {
      data: productName
    });

    return dialogRef;
  }

  public showDraftMembershipPlan(membershipPlan: DraftMembershipPlan | null = null): MatDialogRef<DraftMembershipPlanComponent, any> {
    const dialogRef = this.dialog.open(DraftMembershipPlanComponent, {
      data: membershipPlan
    });

    return dialogRef
  }

  public showDraftCourse(course: DraftCourse | null = null): MatDialogRef<DraftCourseComponent, any> {
    const dialogRef = this.dialog.open(DraftCourseComponent, {
      data: course
    });

    return dialogRef
  }

  public showPriceModal(productId: string, price: number): MatDialogRef<PriceModalComponent, any> {
    const dialogRef = this.dialog.open(PriceModalComponent, {
      data: { productId, price }
    });

    return dialogRef;
  }


  public closeAllModals(): void {
    this.dialog.closeAll();
  }
}
