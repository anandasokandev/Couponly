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
    promotionName: 'Monsoon Bonanza',
    selectedCategory: '',
    selectedStore: '',
    contactCount: 0,
    channels: {
      whatsapp: true,
      email: true,
      sms: false
    },
    couponCode: '',
    couponName: '',
    sendType: 'now',
    scheduleDate: ''
  };

  availableStores: string[] = [];
  coupons: string[] = ['MONSOON25', 'FLAT500', 'BOGOJULY'];

  isSaving: boolean = false;
  showSuccessMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {
  
  }


  saveCampaign(): void {
    this.isSaving = true;
    this.showSuccessMessage = false;

    // Clear schedule date if sending now
    if (this.campaign.sendType === 'now') {
      this.campaign.scheduleDate = '';
    }

    console.log('Saving Campaign:', this.campaign);
    
    this.isSaving = false;
    // setTimeout(() => {
    //   // this.showSuccessMessage = true;
    //   // setTimeout(() => this.showSuccessMessage = false, 4000);
    // }, 1500);

    
  }

  handleContactsAdded(event: { store: any; count: number; contactsNeeded: number; coupon: any }): void {
    console.log('Contacts added:', event);
    // Update the campaign details based on the event data
    this.campaign.selectedCategory = event.store.category;
    this.campaign.selectedStore = event.store.store;
    this.campaign.contactCount = event.contactsNeeded;
    this.campaign.couponCode = event.coupon.couponCode;
    this.campaign.couponName = event.coupon.couponName;
  }
}
