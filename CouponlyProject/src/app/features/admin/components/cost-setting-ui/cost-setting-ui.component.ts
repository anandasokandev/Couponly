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
  NavModule,
} from '@coreui/angular';

export interface CostSetting {
  id: 'whatsapp' | 'email' | 'sms';
  name: string;
  icon: string;
  charge: number;
  profitMargin: number;
  handlingCharge: number;
}

@Component({
  selector: 'app-cost-setting-ui',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    GridModule,
    FormModule,
    ButtonModule,
    SpinnerModule,
    AlertModule,
    NavModule
  ],
  templateUrl: './cost-setting-ui.component.html',
  styleUrls: ['./cost-setting-ui.component.scss']
})
export class CostSettingUIComponent {
  // Array to hold costs for different services
  costSettings: CostSetting[] = [];
  platformFee: number = 0;

  // State management for UI feedback
  isLoading: boolean = true;
  updatingCharge: string = '';
  updatingProfit: string = '';
  updatingHandling: string = '';
  showSuccessMessage: boolean = false;

  ngOnInit(): void {
    this.fetchCosts();
  }

  updateCharge(setting: CostSetting): void {
    this.updatingCharge = setting.id;

    // Simulate an API call with a timeout
    setTimeout(() => {
      this.costSettings = this.costSettings.map(s =>
        s.id === setting.id ? { ...s, charge: setting.charge } : s
      );
      this.updatingCharge = '';
      console.log('Charge updated:', setting.charge);
    }, 1000);
  }

  updateProfit(setting: CostSetting): void {
    this.updatingProfit = setting.id;

    // Simulate an API call with a timeout
    setTimeout(() => {
      this.costSettings = this.costSettings.map(s =>
        s.id === setting.id ? { ...s, profitMargin: setting.profitMargin } : s
      );
      this.updatingProfit = '';
      console.log('Profit margin updated:', setting.profitMargin);
    }, 1000);
  }

  updateHandling(setting: CostSetting): void {
    this.updatingHandling = setting.id;

    // Simulate an API call with a timeout
    setTimeout(() => {
      this.costSettings = this.costSettings.map(s =>
        s.id === setting.id ? { ...s, handlingCharge: setting.handlingCharge } : s
      );
      this.updatingHandling = '';
      console.log('Handling charge updated:', setting.handlingCharge);
    }, 1000);
  }

  /**
   * Simulates fetching cost data from a backend API.
   */
  fetchCosts(): void {
    this.isLoading = true;
    // Simulate an API call with a timeout
    setTimeout(() => {
      this.costSettings = [
                          {
                        id: 'whatsapp',
                        name: 'WhatsApp Costs',
                        icon: 'fa-brands fa-whatsapp text-success',
                        charge: 5,
                        profitMargin: 2,
                        handlingCharge: 5
                      },
                      {
                        id: 'email',
                        name: 'Email Costs',
                        icon: 'fa-solid fa-envelope text-primary',
                        charge: 0.5,
                        profitMargin: 0.1,
                        handlingCharge: 1
                      },
                      {
                        id: 'sms',
                        name: 'SMS Costs',
                        icon: 'fa-solid fa-comment-sms text-success',
                        charge: 1,
                        profitMargin: 0.5,
                        handlingCharge: 2
                      }                 
      ];
      this.platformFee = 49.99; // Example platform fee
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Simulates saving the updated cost data to a backend API.
   */


  updateServiceCost(service: CostSetting): void {
    console.log('Updating service cost...', service);
    
    // service.isUpdating = true;
    // Simulate an API call with a timeout
    setTimeout(() => {
      // service.isUpdating = false;
      console.log('Service cost updated:', service);
    }, 1000);
  }

  calculateTotal(setting: CostSetting): void {
    // setting.totalCharge = (setting.charge || 0) + (setting.profitMargin || 0);
  }
}
