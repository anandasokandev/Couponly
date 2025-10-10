
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
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  stores: any[] = [];
  selectedStore: any = null;

  isLoading = false;
  isViewingCoupons = false;
  isPageChange = false;

  storeSearch: string = '';
  couponCodeSearch = '';
  selectedTypeId?: number;
  selectedDateFilter = '1';
  filteredCoupons: any[] = [];
  types: any[] = [];

  colors: string[] = [
    '#e74c3c', '#27ae60', '#2980b9', '#8e44ad', '#f39c12', '#16a085'
  ];

  constructor(
    private storeService: StoreService,
    private couponService: CouponService
  ) { }

  ngOnInit(): void {
    this.loadStoresByName();
    this.couponService.getCouponType().subscribe({
      next: (res) => (this.types = res.data || []),
      error: () => (this.types = [])
    });
  }


  loadStoresByName() {
    if (!this.isPageChange) this.currentPage = 1;

    this.isLoading = true;
    this.storeService.searchStores(this.currentPage, this.itemsPerPage, 0, 1, this.storeSearch).subscribe({
      next: (res: any) => {
        const storeList = Array.isArray(res?.data?.items) ? res.data.items : [];
        this.stores = storeList;
        this.totalItems = res.data?.totalCount || storeList.length;

        this.stores.forEach((store) => {
          this.couponService.getCouponsByFilter({ storeId: store.id }).subscribe({
            next: (couponRes: any) => {
              store.totalCoupons = couponRes?.data?.length || 0;
            },
            error: () => {
              store.totalCoupons = 0;
            }
          });
        });

        this.isLoading = false;
        this.isPageChange = false;
      },
      error: () => {
        this.stores = [];
        this.totalItems = 0;
        this.isLoading = false;
      }
    });
  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.loadStoresByName();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.loadStoresByName();
  }

  resetFilters() {
    this.storeSearch = '';
    this.selectedStore = null;
    this.loadStoresByName();
  }






  viewCoupons(store: any) {
    this.couponService.getCouponsByFilter({ storeId: store.id }).subscribe(res => {
      const coupons = res.data || [];
      this.selectedStore = {
        id: store.id,
        name: store.store,
        coupons: coupons,
        couponCount: coupons.length
      };
      this.filteredCoupons = [...coupons];
      this.isViewingCoupons = true;
      this.couponCodeSearch = '';
      this.selectedTypeId = undefined;
    });
  }


  filterStoreCoupons() {
    if (!this.selectedStore) return;

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
      storeId: this.selectedStore.id,
      couponCode: this.couponCodeSearch,
      typeId: this.selectedTypeId,
      dateFilter: dateFilter
    }).subscribe(res => {
      this.filteredCoupons = res.data || [];
    });
  }

  getTypeNameById(id: number): string | undefined {
    const type = this.types.find(t => t.id === id);
    return type?.name;
  }

  resetStoreCouponFilters() {
    this.couponCodeSearch = '';
    this.selectedTypeId = undefined;
    this.selectedDateFilter = '1';
    this.filteredCoupons = [...this.selectedStore.coupons];
  }

  goBackToStores() {
    this.selectedStore = null;
    this.isViewingCoupons = false;
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
