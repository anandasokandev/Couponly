import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, ButtonDirective, CardComponent, CardModule, CardTitleDirective, ColComponent, ColDirective, FormModule, PlaceholderAnimationDirective, PlaceholderDirective, SpinnerComponent } from '@coreui/angular';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-view-promotion-details',
  imports: [
    // SpinnerComponent,
    CommonModule,
    CardModule,
    CardComponent,
    ColComponent,
    ButtonDirective,
    BadgeComponent ,
    PlaceholderAnimationDirective, 
    PlaceholderDirective, 
    ColDirective
  ],
  templateUrl: './view-promotion-details.component.html',
  styleUrl: './view-promotion-details.component.scss'
})
export class ViewPromotionDetailsComponent {
  promotion: any;
  today: Date = new Date();
  PaymentStatusInfo: { text: string; color: string } = { text: '', color: '' };
  PromotionStatusInfo: { text: string; color: string } = { text: '', color: '' };
  canceling = false;
  resending = false;
  private toast = inject(ToastService);
  constructor(private promotionService: PromotionService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const promotionId = this.route.snapshot.paramMap.get('id');
    if (promotionId) {
      const id = parseInt(promotionId, 10);
      this.promotionService.getPromotionById(id).subscribe(promotion => {
        this.promotion = promotion.data;

        const promotionTime = new Date(this.promotion.date).getTime();
        const expirationTime = promotionTime + (24 * 60 * 60 * 1000);
        const expirationDate = new Date(expirationTime);
        if (this.promotion.paymentStatus) {
          this.PaymentStatusInfo = { text: 'Paid', color: 'success' };
        }
        else if (!this.promotion.paymentStatus && expirationDate >= this.today) {
          console.log('promotion date:', expirationDate, 'today:', this.today);
          this.PaymentStatusInfo = { text: 'Pending', color: 'warning' };
        }
        else if (!this.promotion.paymentStatus && expirationDate < this.today) {
          console.log('promotion date:', expirationDate, 'today:', this.today);
          this.PaymentStatusInfo = { text: 'Failed', color: 'danger' };
        }
        else this.PaymentStatusInfo = { text: 'Unknown', color: 'secondary' }; // Fallback

        const status = this.promotion.status;
        let color = 'secondary';
        if (status === 'Sent' || status === 'Completed') color = 'success';
        else if (status === 'Scheduled' || status === 'Pending') color = 'info';
        else if (status === 'Created' || status=== 'TokenRecreated') color = 'primary';
        else if (status === 'Failed' || status === 'PaymentFailed' || status === 'Cancelled') color = 'danger';
        this.PromotionStatusInfo = { text: status, color: color };
      });
    }
  }

  goBack() {
    this.location.back();
  }

  channelColor(channel: string): string {
    switch (channel) {
      case 'Email':
        return 'info';
      case 'SMS':
        return 'danger';
      case 'WhatsApp':
        return 'success';
      default:
        return 'secondary';
    }
  }

  resendPaymentLink(id: number) {
    if (id) {
      this.resending = true;
      this.promotionService.ResendPaymentLink(id).subscribe(response => {
        if (response.isSuccess) {
          this.promotion.status = 'Token Resent';
          this.PromotionStatusInfo = { text: 'Token Resent', color: 'info' };
          this.toast.show({ type: 'success', message: 'Payment link resent successfully.' });
        }
        else if (!response.isSuccess) {
          this.toast.show({ type: 'error', message: response.message || 'Failed to resend payment link.' });
          console.error('Failed to resend payment link:', response.message);
        }
        else {
          this.toast.show({ type: 'error', message: 'Unexpected response from server.' });
          console.error('Unexpected response from server:', response);
        }
      });
      this.resending = false;
    }
    else {
      this.toast.show({ type: 'error', message: 'Promotion ID is not available.' });
      console.error('Promotion ID is not available.');
    }
  }

  cancelPromotion(id: number) {
    this.canceling = true;
    if (id) {
      this.promotionService.CancelPromotion(id).subscribe(response => {
        console.log('Promotion cancelled:', response);
        this.toast.show({ type: 'success', message: 'Promotion cancelled successfully.' });
        // Optionally, update the local promotion status
        this.promotion.status = 'Cancelled';
        this.PromotionStatusInfo = { text: 'Cancelled', color: 'danger' };
      });
    }
    else {
      this.toast.show({ type: 'error', message: 'Promotion ID is not available.' });
      console.error('Promotion ID is not available.');
    }
    this.canceling = false;
  }
}
