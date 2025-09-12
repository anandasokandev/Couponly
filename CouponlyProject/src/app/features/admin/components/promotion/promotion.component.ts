import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardModule,
  GridModule,
  FormModule,
  ButtonModule,
  SpinnerModule,
  AlertModule,
  ButtonGroupModule,
  ButtonDirective,
  AccordionModule,
  ModalComponent,
  ModalToggleDirective,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FindStoreModelComponent } from '../../pages/Promotion/find-store-model/find-store-model.component';
import { PromotionCalculatorModelComponent } from '../../pages/Promotion/promotion-calculator-model/promotion-calculator-model.component';
import { CostSettingService } from '../../../../commons/services/Promotion/cost-setting.service';
import { CostSetting } from '../../../../commons/models/CostSetting.model';

// Updated interface to hold all promotion campaign details
export interface PromotionCampaign {
  promotionName: string;
  selectedCategory: string;
  selectedStore: string;
  contactCount: number;
  channels: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
  costs: {
    whatsapp: number;
    email: number;
    sms: number;
  };
  couponCode: string;
  couponName?: string;
  sendType: 'now' | 'schedule';
  scheduleDate?: string;
}

@Component({
  selector: 'app-promotion',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    GridModule,
    FormModule,
    ButtonModule,
    IconModule,
    SpinnerModule,
    AlertModule,
    ButtonGroupModule,
    ButtonDirective,
    AccordionModule,
    FindStoreModelComponent,
    PromotionCalculatorModelComponent,
    ModalComponent,
    ModalToggleDirective
  ],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {
   campaign: PromotionCampaign = {
     promotionName: 'xcv',
     selectedCategory: '',
     selectedStore: '',
     contactCount: 100,
     channels: {
       whatsapp: false,
       email: false,
       sms: false
     },
     costs: {
       whatsapp: 0,
       email: 0,
       sms: 0
     },
     couponCode: '',
     couponName: '',
     sendType: 'now',
     scheduleDate: ''
   };
   serviceCosts: CostSetting[] = [];

  isSaving: boolean = false;

  constructor(private costService: CostSettingService) { }

  ngOnInit(): void {
    this.costService.getAllServices().subscribe(services => {
      this.serviceCosts = services.data;
      console.log('Service Costs:', services.data);
    });
  }

  updateChannel(channel: keyof PromotionCampaign['channels']): void {
    this.campaign.channels[channel] = !this.campaign.channels[channel];
    const service = this.serviceCosts.find(service => service.name.toLowerCase() === channel);
    if (service) {
      const charge = service.charge * this.campaign.contactCount;
      const profit = service.profit * this.campaign.contactCount;
      const handling = service.handling * (this.campaign.contactCount / 100);
      this.campaign.costs[channel] = charge + profit + handling;
    }
  }

  saveCampaign(): void {
    this.isSaving = true;

    // Clear schedule date if sending now
    if (this.campaign.sendType === 'now') {
      this.campaign.scheduleDate = '';
    }
    console.log('Saving Campaign:', this.campaign);
    this.isSaving = false;
    
  }

  handleContactsAdded(event: { store: any; count: number; contactsNeeded: number; coupon: any }): void {
    console.log('Contacts added:', event);
    // Update the campaign details based on the event data
    this.campaign.selectedCategory = event.store.category;
    this.campaign.selectedStore = event.store.store;
    this.campaign.contactCount = event.contactsNeeded;
    this.campaign.couponCode = event.coupon.couponCode;
    this.campaign.couponName = event.coupon.name;
  }
}
