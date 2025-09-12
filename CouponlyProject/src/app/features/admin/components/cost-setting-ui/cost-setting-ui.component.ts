import { Component, inject, OnInit } from '@angular/core';
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
import { CostSettingService } from '../../../../commons/services/Promotion/cost-setting.service';
import { CostSetting } from '../../../../commons/models/CostSetting.model';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

@Component({
  selector: 'app-cost-setting-ui',
  // imports array should be here for standalone component
  standalone: true, // Assuming this is a standalone component based on the imports array
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
export class CostSettingUIComponent implements OnInit { // Implemented OnInit
  // Array to hold the current state of costs
  costSettings: CostSetting[] = [];
  // NEW: Array to hold the original state of costs for comparison
  originalCostSettings: CostSetting[] = [];

  // State management for UI feedback
  isLoading: boolean = true;
  updatingService: number = 0;
  // This property seems unused, can be removed: updatingServices: number[] = [];

  ngOnInit(): void {
    this.fetchCosts();
  }

  constructor(private costSettingService: CostSettingService) { }
  private toast = inject(ToastService);

  // NEW: Function to check if a specific setting has changed
  hasChanges(currentSetting: CostSetting): boolean {
    const originalSetting = this.originalCostSettings.find(s => s.id === currentSetting.id);

    if (!originalSetting) {
      return false; // Should not happen if data is loaded correctly
    }

    // Return true if any of the editable fields are different
    return currentSetting.charge !== originalSetting.charge ||
           currentSetting.profit !== originalSetting.profit ||
           currentSetting.handling !== originalSetting.handling;
  }

  updateService(setting: CostSetting): void {
    this.updatingService = setting.id;
    this.costSettingService.updateService(setting).subscribe({
      next: (res) => {
        this.toast.show({ type: 'success', message: 'Service updated successfully' });
        // Update the current state
        this.costSettings = this.costSettings.map(s =>
          s.id === res.data.id ? { ...s, ...res.data } : s
        );
        // NEW: Update the original state to match the newly saved state
        this.originalCostSettings = this.originalCostSettings.map(s =>
          s.id === res.data.id ? { ...s, ...res.data } : s
        );
      },
      error: (error) => {
        console.error('Error updating service:', error.errors);
        this.toast.show({ type: 'error', message: 'Error updating service: ' + error.errors });
      },
      complete: () => {
        this.updatingService = 0; // Reset spinner state
      }
    });
  }

  fetchCosts(): void {
    this.isLoading = true;
    this.costSettingService.getAllServices().subscribe({
      next: (res) => {
        this.costSettings = res.data;
        // NEW: Create a deep copy of the initial data for change tracking
        this.originalCostSettings = JSON.parse(JSON.stringify(res.data));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching cost settings:', error.errors);
        this.toast.show({ type: 'error', message: 'Error fetching cost settings: ' + error.errors });
        this.isLoading = false;
      }
    });
  }
}