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

  // 🔍 Filter inputs
  couponCode = '';
  storeNameSearch = '';
  selectedStore?: number;
  selectedType?: number; 

  stores: any[] = [];
  types: any[] = []; 

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
