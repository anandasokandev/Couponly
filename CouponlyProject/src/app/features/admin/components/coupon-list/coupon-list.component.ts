import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pages/pagination/pagination.component'; // ✅ import pagination
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalComponent, ModalToggleDirective } from '@coreui/angular';

@Component({
  selector: 'app-couponlist',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PaginationComponent,
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
  filteredCoupons: any[] = [];  
  isLoading = false;

  couponCode = '';
  store = '';
  category = '';

  constructor() {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  onItemsPerPageChange(items: number) {
    this.itemsPerPage = items;
    this.onPageChange(1);
  }

  loadCoupons() {
    this.isLoading = true;

    setTimeout(() => {
      this.coupons = [
        {
          couponCode: 'SAVE10',
          name: 'Discount 10%',
          storeName: 'Store A',
          categoryName: 'Food',
          description: '10% off on all items',
          minAmount: 500,
          userLimitCount: 2,
          startingDate: new Date(),
          endingDate: new Date(),
          couponImage: ''
        },
        {
          couponCode: 'WELCOME50',
          name: 'Flat 50 Off',
          storeName: 'Store B',
          categoryName: 'Clothing',
          description: '₹50 off for new users',
          minAmount: 200,
          userLimitCount: 1,
          startingDate: new Date(),
          endingDate: new Date(),
          couponImage: ''
        }
      ];

      this.filteredCoupons = [...this.coupons];
      this.totalItems = this.filteredCoupons.length;
      this.isLoading = false;
    }, 500);
  }

  filterCoupons() {
    this.filteredCoupons = this.coupons.filter(coupon =>
      coupon.couponCode.toLowerCase().includes(this.couponCode.toLowerCase()) &&
      coupon.storeName.toLowerCase().includes(this.store.toLowerCase()) &&
      coupon.categoryName.toLowerCase().includes(this.category.toLowerCase())
    );
    this.totalItems = this.filteredCoupons.length;
    this.onPageChange(1);
  }

  resetFilters() {
    this.couponCode = '';
    this.store = '';
    this.category = '';
    this.filteredCoupons = [...this.coupons];
    this.totalItems = this.filteredCoupons.length;
    this.onPageChange(1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get pagedCoupons(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCoupons.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
