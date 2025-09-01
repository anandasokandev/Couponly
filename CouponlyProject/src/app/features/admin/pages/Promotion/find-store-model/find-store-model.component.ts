import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, FormModule, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerModule, TableModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RedeemsHistoryServiceService } from '../../../../../commons/services/Coupon/redeems-history-service.service';
import { District } from '../../../../../commons/models/district.model';
import { Location } from '../../../../../commons/models/location.model';
import { Category } from '../../../../../commons/models/category.model';
import { PromotionService } from '../../../../../commons/services/Coupon/promotion.service';
import { PaginationComponent } from '../../pagination/pagination.component';

// Define an interface for the store data structure for type safety
interface Store {
  id: number;
  name: string;
  category: string;
  district: string;
  place: string;
  totalContacts: number;
  contactsAlreadyAdded: number; // Represents contacts already added in the current context
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
    PaginationComponent
  ],
  templateUrl: './find-store-model.component.html',
  styleUrl: './find-store-model.component.scss'
})




export class FindStoreModelComponent {
  // --- Pagination & Search Controls ---
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  isLoading: boolean = false;
  isPageChange: boolean = false;
  searchtext: string = '';

  // --- Properties for Data ---
  searchResults: any[] = [];
  selectedStore: any | null = null;
  contactsNeeded: number | null = null;
  districts: District[] = [];
  locations: Location[] = [];
  categories: Category[] = [];
  districtId: number = 0;
  locationId: number = 0;
  categoryId: number = 0;

  filterForm: FormGroup;

  @Output() contactsAdded = new EventEmitter<{ store: Store; count: number; contactsNeeded: number }>();


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
    this.promotionService.getDistricts().subscribe((data: any) => {
      if(data && data.statusCode == 200) {
        this.districts = data.data as District[];
      }
    });
    this.getLocations();
    this.promotionService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        console.log(response)
      }
    })
    this.filterForm.get('district')?.valueChanges.subscribe(value => {
      this.districtId = value;
      this.filterForm.get('location')?.setValue('0');
      this.getLocations();
    });
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
    this.isLoading = true;
    if(!this.isPageChange) {
      this.currentPage = 1; // Reset to first page on new search
    }
    this.promotionService.getStores(this.currentPage, this.itemsPerPage, '0', '1', this.searchtext).subscribe({
      next: (response: any) => {
        this.searchResults = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
        this.isPageChange = false;
        console.log(response)
      }
    })
    this.selectedStore = null; // Reset selection on new search
  }

  /**
   * Sets the clicked store as the selected store.
   * @param store The store object that was clicked in the table.
   */
  selectStore(store: Store): void {
    this.selectedStore = store;
    this.contactsNeeded = null; // Reset contacts needed when a new store is selected
    this.searchResults = [];
  }

  /**
   * Final action. Emits the data and closes the modal.
   */
  addContacts(): void {
    if (!this.selectedStore || !this.contactsNeeded || this.contactsNeeded <= 0) {
      alert('Please select a store and enter a valid number of contacts.');
      return;
    }

    const dataToEmit = {
      store: this.selectedStore,
      count: this.contactsNeeded,
      contactsNeeded: this.contactsNeeded,
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
