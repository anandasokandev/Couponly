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
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

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
    AccordionModule
  ],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {
   campaign: PromotionCampaign = {
    promotionName: 'Monsoon Bonanza',
    selectedCategory: '',
    selectedStore: '',
    contactCount: 1000,
    channels: {
      whatsapp: true,
      email: true,
      sms: false
    },
    couponCode: 'MONSOON25',
    sendType: 'now',
    scheduleDate: ''
  };

  // Mock data for dropdowns
  categories: string[] = ['Electronics', 'Fashion', 'Groceries', 'Home Appliances'];
  stores: { [key: string]: string[] } = {
    'Electronics': ['Chalai Electronics', 'Pattom Digital'],
    'Fashion': ['MG Road Styles', 'Lulu Fashion'],
    'Groceries': ['Kazhakootam Grocers', 'Daily Needs Mart'],
    'Home Appliances': ['Appliance World', 'Home Hub']
  };
  availableStores: string[] = [];
  coupons: string[] = ['MONSOON25', 'FLAT500', 'BOGOJULY'];

  isSaving: boolean = false;
  showSuccessMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.onCategoryChange(); // Initialize stores based on default category
  }

  onCategoryChange(): void {
    if (this.campaign.selectedCategory) {
      this.availableStores = this.stores[this.campaign.selectedCategory] || [];
      this.campaign.selectedStore = ''; // Reset store selection
    } else {
      this.availableStores = [];
    }
  }

  saveCampaign(): void {
    this.isSaving = true;
    this.showSuccessMessage = false;

    // Clear schedule date if sending now
    if (this.campaign.sendType === 'now') {
      this.campaign.scheduleDate = '';
    }

    console.log('Saving Campaign:', this.campaign);
    
    setTimeout(() => {
      this.isSaving = false;
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 4000);
    }, 1500);
  }
}
