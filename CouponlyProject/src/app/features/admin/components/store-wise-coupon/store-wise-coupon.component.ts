import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pages/pagination/pagination.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalModule } from '@coreui/angular';
import { CouponService } from '../../../../commons/services/Coupon/coupon.service';
import { StoreService } from '../../../../commons/services/Store/store.service';

@Component({
  selector: 'app-store-wise-coupon',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    CardComponent,
    CardHeaderComponent,
    ModalModule,
    CardBodyComponent,
    ColComponent
  ],
  templateUrl: './store-wise-coupon.component.html',
  styleUrls: ['./store-wise-coupon.component.scss']
})
export class StoreWiseCouponComponent implements OnInit {
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  stores: any[] = [];
  filteredStores: any[] = [];
  selectedStore: any = null;

  isLoading = false;

  // 🔍 Store search
  storeSearch: string = '';

  colors: string[] = [
    '#e74c3c', // red
    '#27ae60', // green
    '#2980b9', // blue
    '#8e44ad', // purple
    '#f39c12', // orange
    '#16a085'  // teal
  ];

  constructor(
    private storeService: StoreService,
    private couponService: CouponService
  ) {}

  ngOnInit(): void {
    this.loadStores();
  }
  
loadStores() {
  this.isLoading = true;
  this.storeService.FetchStores(this.currentPage, this.itemsPerPage).subscribe({
    next: (res: any) => {
      const storeList = Array.isArray(res?.data?.items) ? res.data.items : [];

      this.stores = storeList;
      this.filteredStores = [...storeList];
      this.totalItems = res.data?.totalCount || storeList.length;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error loading stores:', err);
      this.stores = [];
      this.filteredStores = [];
      this.isLoading = false;
    }
  });
}




  filterStores() {
    const term = this.storeSearch.toLowerCase();
    this.filteredStores = this.stores.filter((store: any) =>
      store.name?.toLowerCase().includes(term)
    );
    this.totalItems = this.filteredStores.length;
  }

  resetFilters() {
    this.storeSearch = '';
    this.filteredStores = [...this.stores];
    this.totalItems = this.filteredStores.length;
    this.selectedStore = null;
  }

  viewCoupons(store: any) {
    this.isLoading = true;
    this.couponService.getCouponsByFilter({ storeId: store.id }).subscribe({
      next: (res: any) => {
        this.selectedStore = {
          ...store,
          coupons: res.data || []
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading coupons:', err);
        this.isLoading = false;
      }
    });
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onItemsPerPageChange(items: number) {
    this.itemsPerPage = items;
    this.currentPage = 1;
  }
}
