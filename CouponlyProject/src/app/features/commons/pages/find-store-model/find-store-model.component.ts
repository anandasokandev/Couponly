import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, ColComponent, FormModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, NavComponent, NavItemComponent, NavModule, RowComponent, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { District } from '../../../../commons/models/district.model';
import { Location } from '../../../../commons/models/location.model';
import { Category } from '../../../../commons/models/category.model';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { PaginationComponent } from '../../../admin/pages/pagination/pagination.component';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { CostSettingService } from '../../../../commons/services/Promotion/cost-setting.service';

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
    NavModule,
    NavComponent,
    RowComponent,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    ColComponent
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
  isStore: boolean = false;
  currentStep: number = 1;
  stepCheck = {
    store: false,
    coupon: false,
    contacts: false
  };

  @Output() contactsAdded = new EventEmitter<{ store: any; count: number; contactsNeeded: number; publicContacts: number; coupon: any }>();

  private toastService = inject(ToastService);
  constructor(private fb: FormBuilder, private promotionService: PromotionService) {
    this.filterForm = this.fb.group({
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

    if(sessionStorage.getItem('role') === "Store")
    {
      this.isStore = true;
      this.promotionService.getStores(this.currentPage, this.itemsPerPage, '0', '8', sessionStorage.getItem('storeId') || '').subscribe({
        next: (response: any) => {
          this.selectedStore = response.data.items[0];
          this.selectStore(this.selectedStore);
        }
      });
      // this.couponBox = true;
    } else {

      this.filterForm.get('storeName')?.valueChanges.subscribe(value => {
        this.searchtext = value;
        this.searchStores();
      });
    }
  }

  searchStores(): void {
    if(!this.searchtext) {
      this.searchResults = [];
      return;
    }
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
        console.log("Store search: ",response)
      }
    })
    this.selectedStore = null; // Reset selection on new search
  }

  searchCoupon(): void {
    // if(this.couponText == '') {
    //   return;
    // }

    this.isCouponLoading = true;

    this.promotionService.getCoupons(this.selectedStore.id, this.couponText).subscribe({
      next: (response: any) => {
        console.log(response)
        this.couponDetails = response.data;
        this.isCouponLoading = false;
        console.log("Coupon: ", this.couponDetails);
      },
      error: () => {
        this.isCouponLoading = false;
      }
    });

  }

  selectStore(store: any): void {
    this.selectedStore = store;
    this.stepCheck.store = true;
    this.currentStep = 2;
    this.couponDetails = null; // Reset coupon details when a new store is selected
    this.contactsNeeded = 0; // Reset contacts needed when a new store is selected
    this.searchResults = [];
    this.searchCoupon();
    console.log("Store selected: ", this.selectedStore);
  }

  selectCoupon(coupon: Coupon) {
    this.selectedCoupon = coupon;
    this.stepCheck.coupon = true;
    this.currentStep = 3;
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

  changeCoupon(): void {
    this.selectedCoupon = null;
    this.couponDetails = null;
    this.couponBox = true;
    this.stepCheck.coupon = false;
    this.stepCheck.contacts = false;
    this.currentStep = 2;
    this.searchCoupon();
  }

  changeStore(): void {
    this.selectedCoupon = null;
    this.selectedStore = null;
    this.searchResults = [];
    this.filterForm.reset();
    this.couponDetails = null;
    this.stepCheck.store = false;
    this.stepCheck.coupon = false;
    this.stepCheck.contacts = false;
    this.currentStep = 1;
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
    this.stepCheck.contacts = true;
    this.contactsAdded.emit(dataToEmit);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.isPageChange = true;
    this.searchStores();
  }
}
