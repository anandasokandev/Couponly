import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalModule, ModalToggleDirective, SpinnerModule } from '@coreui/angular';
import { CostSettingService } from '../../../../../commons/services/Promotion/cost-setting.service';
import { CostSetting } from '../../../../../commons/models/CostSetting.model';
import { PromotionService } from '../../../../../commons/services/Promotion/promotion.service';
import { IconModule } from '@coreui/icons-angular';
import { Title } from '@angular/platform-browser';
import { ToastService } from '../../../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-promotion-calculator-model',
  imports: [
    ModalComponent,
    ModalModule,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    CommonModule,
    SpinnerModule,
    IconModule
  ],
  templateUrl: './promotion-calculator-model.component.html',
  styleUrls: ['./promotion-calculator-model.component.scss']
})
export class PromotionCalculatorModelComponent {

  @Input() campaign: any;
  isSaving: boolean = false;
  private toast = inject(ToastService);

  ngOnInit() {
    
  }

  constructor(private promotionService: PromotionService) {
    
  }

  saveChanges() {
    this.isSaving = true;
    const channels: number[] = [];
    for (const [key, value] of Object.entries(this.campaign.channels)) {
      if (value) {
        if(key === 'whatsapp') {
          channels.push(2);
        } else if(key === 'email') {
          channels.push(4);
        } else if(key === 'sms') {
          channels.push(5);
        }
      }
    }
    const schedule = this.campaign.sendType === 'immediate' ? 1 : 2;
    const promotionData = {
      Title: this.campaign.promotionName,
      Store: this.campaign.storeId,
      Coupon: {
        Id: this.campaign.couponId,
        Code: this.campaign.couponCode
      },
      TotalContacts: this.campaign.contactCount,
      PublicContacts: this.campaign.publicContacts,
      Schedule: {
        Type: schedule,
        ScheduledAt: schedule === 1 ? null : this.campaign.scheduleDate
      },
      Channels: channels,
      TotalAmount: this.campaign.costs.whatsapp + this.campaign.costs.email + this.campaign.costs.sms,
      
    };

    this.promotionService.createPromotion(promotionData).subscribe(
      (response) => {
        console.log('Promotion created successfully:', response);
        this.toast.show({message: 'Promotion created successfully!', type: 'success'});
        this.isSaving = false;
      },
      (error) => {
        console.error('Error creating promotion:', error);
        this.toast.show({message: 'Error creating promotion!', type: 'error'});
        this.isSaving = false;
      }
    );
  }

    
}
