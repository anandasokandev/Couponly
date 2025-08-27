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

export interface ServiceCost {
  id: string;
  name: string;
  cost: number;
  icon: string;
  isUpdating: boolean;
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
  serviceCosts: ServiceCost[] = [];
  platformFee: number = 0;

  // State management for UI feedback
  isLoading: boolean = true;
  isSaving: boolean = false;
  isFeeUpdating: boolean = false;
  handlingFee: number = 50;
  showSuccessMessage: boolean = false;

  ngOnInit(): void {
    this.fetchCosts();
  }

  updateHandlingFee(): void {
    this.isFeeUpdating = true;

    // Simulate an API call with a timeout
    setTimeout(() => {
      this.isFeeUpdating = false;
      console.log('Handling fee updated:', this.handlingFee);
    }, 1000);
  }

  /**
   * Simulates fetching cost data from a backend API.
   */
  fetchCosts(): void {
    this.isLoading = true;
    // Simulate an API call with a timeout
    setTimeout(() => {
      this.serviceCosts = [
        { id: 'whatsapp', name: 'WhatsApp Message', cost: 5, icon: 'fa-brands fa-whatsapp', isUpdating: false },
        { id: 'sms', name: 'SMS', cost: 1, icon: 'fa-regular fa-message', isUpdating: false },
        { id: 'email', name: 'Email', cost: 0.5, icon: 'fa-regular fa-envelope', isUpdating: false }
      ];
      this.platformFee = 49.99; // Example platform fee
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Simulates saving the updated cost data to a backend API.
   */


  updateServiceCost(service: ServiceCost): void {
    console.log('Updating service cost...', service);
    
    service.isUpdating = true;
    // Simulate an API call with a timeout
    setTimeout(() => {
      service.isUpdating = false;
      console.log('Service cost updated:', service);
    }, 1000);
  }
}
