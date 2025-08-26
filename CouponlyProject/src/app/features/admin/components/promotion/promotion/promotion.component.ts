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
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cibWhatsapp, cilEnvelopeClosed, cilCommentSquare, cilDollar, cilRuble } from '@coreui/icons';


export interface ServiceCost {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

@Component({
  selector: 'app-promotion',
  imports: [CommonModule, FormsModule, CardModule, GridModule, FormModule, ButtonModule, SpinnerModule, AlertModule, NavModule, IconModule],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {
   // Array to hold costs for different services
    serviceCosts: ServiceCost[] = [];
    platformFee: number = 0;
  
    // State management for UI feedback
    isLoading: boolean = true;
    isSaving: boolean = false;
    showSuccessMessage: boolean = false;
  
    constructor(public iconSet: IconSetService) {
      // Make CoreUI icons available to the component
      iconSet.icons = { cibWhatsapp, cilEnvelopeClosed, cilCommentSquare, cilRuble };
    }
  
    ngOnInit(): void {
      this.fetchCosts();
    }
  
    /**
     * Simulates fetching cost data from a backend API.
     */
    fetchCosts(): void {
      this.isLoading = true;
      // Simulate an API call with a timeout
      setTimeout(() => {
        this.serviceCosts = [
          { id: 'whatsapp', name: 'WhatsApp Message', cost: 0.015, icon: 'fa-brands fa-whatsapp' },
          { id: 'sms', name: 'SMS', cost: 0.008, icon: 'fa-regular fa-message' },
          { id: 'email', name: 'Email', cost: 0.001, icon: 'fa-regular fa-envelope' }
        ];
        this.platformFee = 49.99; // Example platform fee
        this.isLoading = false;
      }, 1000);
    }
  
    /**
     * Simulates saving the updated cost data to a backend API.
     */
    updateCosts(): void {
      this.isSaving = true;
      this.showSuccessMessage = false;
  
      // The data payload to be sent to the API
      const payload = {
        services: this.serviceCosts,
        platformFee: this.platformFee
      };
  
      console.log('Saving data...', payload);
  
      // Simulate an API call with a timeout
      setTimeout(() => {
        this.isSaving = false;
        this.showSuccessMessage = true;
        // Hide the success message after 3 seconds
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }, 1500);
    }
}
