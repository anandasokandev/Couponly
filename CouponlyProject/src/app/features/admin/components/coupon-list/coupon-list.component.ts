import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pages/pagination/pagination.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalComponent, ModalModule } from '@coreui/angular';
import { CouponService } from '../../../../commons/services/Coupon/coupon.service';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { StoreWiseCouponComponent } from '../store-wise-coupon/store-wise-coupon.component';
import { AddCouponModalComponent } from '../../pages/add-coupon-modal/add-coupon-modal.component';

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
    AddCouponModalComponent
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

  selectedDateFilter = '1'; // default to 'All Coupons'
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
  ) { }

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
      dateFilter = undefined;
      break;
  }

  this.couponService.getCouponsByFilter({
    couponCode: this.couponCode,
    storeName: this.storeNameSearch,
    storeId: this.selectedStore,
    typeId: this.selectedType,
    dateFilter: dateFilter
  }).subscribe({
    next: (res: any) => {
      if (res?.data?.length) {
        //  Sort latest first
        const sortedCoupons = res.data.sort(
          (a: any, b: any) =>
            new Date(b.startingDate).getTime() - new Date(a.startingDate).getTime()
        );

        this.totalItems = sortedCoupons.length;

        //  Calculate pagination range
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        //  Slice based on page
        this.coupons = sortedCoupons.slice(startIndex, endIndex);
      } else {
        this.coupons = [];
        this.totalItems = 0;
      }

      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}


  filterCoupons() {
    this.loadCoupons();
  }


  resetFilters() {
    this.couponCode = '';
    this.storeNameSearch = '';
    this.selectedStore = undefined;
    this.selectedType = undefined;
    this.selectedDateFilter = '1';
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
