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
  updatingService: string = '';
  showSuccessMessage: boolean = false;

  ngOnInit(): void {
    this.fetchCosts();
  }

  updateService(setting: CostSetting): void {
    this.updatingService = setting.id;

    // Simulate an API call with a timeout
    setTimeout(() => {
      this.costSettings = this.costSettings.map(s =>
        s.id === setting.id ? { ...s, charge: setting.charge, profitMargin: setting.profitMargin, handlingCharge: setting.handlingCharge } : s
      );
      this.updatingService = '';
      console.log('Service updated:', setting);
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
                        charge: 0.75,
                        profitMargin: 0.25,
                        handlingCharge: 20
                      },
                      {
                        id: 'email',
                        name: 'Email Costs',
                        icon: 'fa-solid fa-envelope text-primary',
                        charge: 0.5,
                        profitMargin: 0.1,
                        handlingCharge: 5
                      },
                      {
                        id: 'sms',
                        name: 'SMS Costs',
                        icon: 'fa-solid fa-comment-sms text-success',
                        charge: 0.6,
                        profitMargin: 0.15,
                        handlingCharge: 10
                      }
      ];
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
