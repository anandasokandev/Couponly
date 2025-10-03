import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pages/pagination/pagination.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalComponent, ModalModule } from '@coreui/angular';
import { CouponService } from '../../../../commons/services/Coupon/coupon.service';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { StoreWiseCouponComponent } from '../store-wise-coupon/store-wise-coupon.component';
import { AddCouponModalComponentComponent } from '../../pages/add-coupon-modal-component/add-coupon-modal-component.component';

@Component({
  selector: 'app-couponlist',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    StoreWiseCouponComponent,
    ColComponent,
    
  ],
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponlistComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  coupons: any[] = [];
  isLoading = false;

  // 🔍 Filter inputs
  couponCode = '';
  storeNameSearch = '';
  selectedStore?: number;
  selectedType?: number; 
  activeTab: 'coupons' | 'storeWise' = 'coupons';  // default


  stores: any[] = [];
  types: any[] = []; 
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

  constructor(
    private couponService: CouponService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loadStoresAndTypes();
    this.loadCoupons();
  }

  loadStoresAndTypes() {
    this.storeService.FetchStores(0, 0).subscribe({
      next: (res) => (this.stores = res || []),
      error: () => (this.stores = [])
    });

    this.couponService.getCouponType().subscribe({
      next: (res) => (this.types = res.data || []), 
      error: () => (this.types = [])
    });
  }

  loadCoupons() {
    this.isLoading = true;
    this.couponService.getAllCoupons().subscribe({
      next: (res: any) => {
        this.coupons = res.data || [];
        this.totalItems = this.coupons.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  filterCoupons() {
    this.isLoading = true;
    this.couponService
      .getCouponsByFilter({
        couponCode: this.couponCode,
        storeName: this.storeNameSearch,
        storeId: this.selectedStore,
        typeId: this.selectedType 
      })
      .subscribe({
        next: (res: any) => {
          this.coupons = res.data || [];
          this.totalItems = this.coupons.length;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  resetFilters() {
    this.couponCode = '';
    this.storeNameSearch = '';
    this.selectedStore = undefined;
    this.selectedType = undefined; 
    this.currentPage = 1;
    this.loadCoupons();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadCoupons();
  }

  onItemsPerPageChange(items: number) {
    this.itemsPerPage = items;
    this.loadCoupons();
  }
}
