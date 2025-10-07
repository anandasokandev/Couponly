import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, FormModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { District } from '../../../../../commons/models/district.model';
import { Location } from '../../../../../commons/models/location.model';
import { Category } from '../../../../../commons/models/category.model';
import { PromotionService } from '../../../../../commons/services/Promotion/promotion.service';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ToastService } from '../../../../../commons/services/Toaster/toast.service';
import { CostSettingService } from '../../../../../commons/services/Promotion/cost-setting.service';

export interface Coupon {
  id: number;
  couponCode: string;
  name: string;
  couponImage: string;
  // Add other relevant properties here
}

@Component({
  selector: 'app-find-store-model',
  imports: [
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    CommonModule,
    ButtonDirective,
    SpinnerModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginationComponent,
  ],
  templateUrl: './find-store-model.component.html',
  styleUrl: './find-store-model.component.scss'
})




export class FindStoreModelComponent {
  // --- Pagination & Search Controls ---
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  isStoreLoading: boolean = false;
  isCouponLoading: boolean = false;
  isPageChange: boolean = false;
  searchtext: string = '';

  // --- Properties for Data ---
  searchResults: any[] = [];
  selectedStore: any | null = null;
  contactsNeeded: number = 0;
  districts: District[] = [];
  locations: Location[] = [];
  categories: Category[] = [];
  districtId: number = 0;
  locationId: number = 0;
  categoryId: number = 0;
  couponBox: boolean = false;
  storeBox: boolean = false;
  couponDetails: any | null = null;
  couponText: string = '';
  selectedCoupon: Coupon | null = null;
  StoreContactCount: number = 0;
  PublicContactCount: number = 0;
  Math = Math;

  filterForm: FormGroup;

  @Output() contactsAdded = new EventEmitter<{ store: any; count: number; contactsNeeded: number; publicContacts: number; coupon: any }>();

  private toastService = inject(ToastService);
  constructor(private fb: FormBuilder, private promotionService: PromotionService) {
    this.filterForm = this.fb.group({
      district: ['0'],
      location: ['0'],
      category: ['0'],
      storeName: ['']
    });
  }

  ngOnInit(): void {
    
    this.searchResults = [];
    // Optionally, you can load initial data or all stores here
    // this.searchStores();
    // this.promotionService.getDistricts().subscribe((data: any) => {
    //   if(data && data.statusCode == 200) {
    //     this.districts = data.data as District[];
    //   }
    // });
    // this.getLocations();
    // this.promotionService.getCategories().subscribe({
    //   next: (response: any) => {
    //     this.categories = response.data;
    //     console.log(response)
    //   }
    // })
    // this.filterForm.get('district')?.valueChanges.subscribe(value => {
    //   this.districtId = value;
    //   this.filterForm.get('location')?.setValue('0');
    //   this.getLocations();
    // });
    this.filterForm.get('storeName')?.valueChanges.subscribe(value => {
      this.searchtext = value;
    });
  }

  getLocations() {
    if(this.districtId == 0) {
      this.locations = [];
    }
    else {
      this.promotionService.getLocations(this.districtId).subscribe((data: any) => {
        if(data && data.statusCode == 200) {
          const locations = data.data as Location[];
          this.locations = locations;
        } else {
          this.locations = [];
        }
      });
    }
  }

  /**
   * Fetches stores from a service based on the current filter values.
   */
  searchStores(): void {
    this.couponBox = false;
    this.couponDetails = null;
    this.storeBox = true;
    this.couponText = '';
    this.isStoreLoading = true;
    if(!this.isPageChange) {
      this.currentPage = 1; // Reset to first page on new search
    }
    this.promotionService.getStores(this.currentPage, this.itemsPerPage, '0', '1', this.searchtext).subscribe({
      next: (response: any) => {
        this.searchResults = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isStoreLoading = false;
        this.isPageChange = false;
        console.log(response)
      }
    })
    this.selectedStore = null; // Reset selection on new search
  }

  searchCoupon(): void {
    this.isCouponLoading = true;

    this.promotionService.getCoupons(this.selectedStore.id, this.couponText).subscribe({
      next: (response: any) => {
        this.couponDetails = response.data;
        this.isCouponLoading = false;
      },
      error: () => {
        this.isCouponLoading = false;
      }
    });

    //temporary placeholder for coupon search
    // setTimeout(() => {
    //   this.couponDetails = [{
    //     id: 1,
    //     couponCode: 'SAVE20',
    //     couponName: '20% Off Summer Sale',
    //     couponImage: 'https://tse2.mm.bing.net/th/id/OIP.XAQ6mOO-gPKohh53kkKw3wHaEv?rs=1&pid=ImgDetMain&o=7&rm=3'
    //   }];
    //   this.isCouponLoading = false;
    // }, 2000);
  }

  selectStore(store: any): void {
    this.selectedStore = store;
    this.couponDetails = null; // Reset coupon details when a new store is selected
    this.couponBox = true; // Show coupon box when a new store is selected
    this.storeBox = false;
    this.contactsNeeded = 0; // Reset contacts needed when a new store is selected
    this.searchResults = [];
    this.searchCoupon();
  }

  selectCoupon(coupon: Coupon) {
    this.selectedCoupon = coupon;
    this.couponDetails = null;
    this.couponBox = false;
    this.promotionService.getStoreContactCount(this.selectedStore.id).subscribe({
      next: (response: any) => {
        this.StoreContactCount = response.data;
      }
    });
    this.promotionService.getPublicContactCount(this.selectedStore.id).subscribe({
      next: (response: any) => {
        this.PublicContactCount = response.data.count;
      }
    });
  }

  checkContactsNeeded(): void {
    this.contactsNeeded = Math.min(this.contactsNeeded, (this.PublicContactCount + this.StoreContactCount));
  }

  addContacts(): void {
    if (!this.selectedStore || !this.contactsNeeded || this.contactsNeeded <= 0 || !this.selectedCoupon) {
      this.toastService.show({ message: 'Please select a store, a coupon, and enter a valid number of contacts.', type: 'error' });
      return;
    }

    const dataToEmit = {
      store: this.selectedStore,
      count: this.contactsNeeded,
      contactsNeeded: this.contactsNeeded,
      publicContacts: this.contactsNeeded - this.StoreContactCount > 0 ? this.contactsNeeded - this.StoreContactCount : 0,
      coupon: this.selectedCoupon
    };

    this.contactsAdded.emit(dataToEmit);
  }

  /**
   * Closes the modal without taking action.
   */
  // closeModal(): void {
  //   this.activeModal.dismiss();
  //   console.log('Modal closed');
  // }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.isPageChange = true;
    this.searchStores();
  }
}
