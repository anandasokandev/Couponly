import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pages/pagination/pagination.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent } from '@coreui/angular';
import { CouponService } from '../../../../commons/services/Coupon/coupon.service';
import { StoreService } from '../../../../commons/services/Store/store.service'; 

@Component({
  selector: 'app-couponlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent
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

  couponCode = '';
  selectedStore?: number;
  selectedCategory?: number;

  stores: any[] = [];
  categories: any[] = [];

  constructor(
    private couponService: CouponService,
    private storeService: StoreService 
  ) {}

  ngOnInit(): void {
    this.loadStoresAndCategories();
    this.loadCoupons();
  }


loadStoresAndCategories() {
this.storeService.FetchStores(0,0).subscribe({
    next: (res) => this.stores = res || [],
    error: () => this.stores = []
  });

  this.storeService.FetchCategories().subscribe({
    next: (res) => this.categories = res || [], 
    error: () => this.categories = []
  });
}



loadCoupons() {
  this.isLoading = true;
  this.couponService.getAllCoupons().subscribe({
    next: (res: any) => {
      this.coupons = res.data || [];   // ✅ extract array from response
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
  this.couponService.getCouponsByFilter({
    couponCode: this.couponCode,
    storeId: this.selectedStore,
    categoryId: this.selectedCategory
  }).subscribe({
    next: (res: any) => {
      this.coupons = res.data || [];
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
    this.selectedStore = undefined;
    this.selectedCategory = undefined;
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
