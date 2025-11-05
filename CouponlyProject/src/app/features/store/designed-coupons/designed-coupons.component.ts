import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDashboardService } from '../../../commons/services/StoreDashboard/store-dashboard.service';
import { ToastService } from '../../../commons/services/Toaster/toast.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent } from '@coreui/angular';

@Component({
  selector: 'app-designed-coupons',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent
  ],
  templateUrl: './designed-coupons.component.html',
  styleUrl: './designed-coupons.component.scss'
})
export class DesignedCouponsComponent implements OnInit {
  coupons: any[] = [];
  couponTypes: any[] = [];
  couponCode: string = '';
  typeId?: number;
  selectedDateFilter = '1'; // default to All Coupons
  colors: string[] = [
    '#e74c3c', // red
    '#27ae60', // green
    '#2980b9', // blue
    '#8e44ad', // purple
    '#f39c12', // orange
    '#16a085'  // teal
  ];

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
  isLoading: boolean = false;

  constructor(
    private api: StoreDashboardService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.getCouponTypes();
    this.fetchCoupons();
  }

  getCouponTypes() {
    this.api.getCouponType().subscribe({
      next: (res) => {
        this.couponTypes = res.data;
      },
      error: () => {
        this.toast.show({ type: 'error', message: 'Failed to load coupon types.' });
      }
    });
  }

  fetchCoupons() {
    this.isLoading = true;

    let dateFilter: string | undefined;
    switch (this.selectedDateFilter) {
      case '2':
        dateFilter = 'valid';
        break;
      case '3':
        dateFilter = 'upcoming';
        break;
      case '4':
        dateFilter = 'expired';
        break;
      default:
        dateFilter = undefined; //All Coupons
    }

    this.api.getStoreCoupons(this.couponCode, this.typeId, dateFilter).subscribe({
      next: (response: any) => {
        this.coupons = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.toast.show({ type: 'error', message: 'Failed to fetch coupons.' });
        this.isLoading = false;
      }
    });
  }

  resetFilters() {
    this.couponCode = '';
    this.typeId = undefined;
    this.selectedDateFilter = '1';
    this.fetchCoupons();
  }
}