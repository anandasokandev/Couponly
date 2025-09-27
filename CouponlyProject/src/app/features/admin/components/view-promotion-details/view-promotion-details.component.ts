import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent, ButtonDirective, CardComponent, CardModule, CardTitleDirective, ColComponent, FormModule, SpinnerComponent } from '@coreui/angular';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-promotion-details',
  imports: [
    SpinnerComponent,
    CommonModule,
    CardModule,
    CardComponent,
    ColComponent,
    ButtonDirective,
    BadgeComponent 
  ],
  templateUrl: './view-promotion-details.component.html',
  styleUrl: './view-promotion-details.component.scss'
})
export class ViewPromotionDetailsComponent {
  promotion: any;
  today: Date = new Date();
  constructor(private promotionService: PromotionService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const promotionId = this.route.snapshot.paramMap.get('id');
    if (promotionId) {
      const id = parseInt(promotionId, 10);
      this.promotionService.getPromotionById(id).subscribe(promotion => {
        this.promotion = promotion.data;
        console.log(this.promotion);
      });
    }
  }

  goBack() {
    this.location.back();
  }

  getPaymentStatusInfo(): { text: string; color: string } {
    if (this.promotion.paymentStatus) {
      return { text: 'Paid', color: 'success' };
    }
    if (!this.promotion.paymentStatus && new Date(this.promotion.date) > this.today) {
      return { text: 'Pending', color: 'warning' };
    }
    if (!this.promotion.paymentStatus && new Date(this.promotion.date) <= this.today) {
      return { text: 'Failed', color: 'danger' };
    }
    return { text: 'Unknown', color: 'secondary' }; // Fallback
  }

  getPromotionStatusInfo(): { text: string; color: string } {
    const status = this.promotion.status;
    let color = 'secondary';
    if (status === 'Sent' || status === 'Completed') color = 'success';
    if (status === 'Scheduled' || status === 'Pending') color = 'info';
    if (status === 'Created' || status=== 'TokenRecreated') color = 'primary';
    if (status === 'Failed' || status === 'PaymentFailed' || status === 'Cancelled') color = 'danger';
    
    return { text: status, color: color };
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
}
