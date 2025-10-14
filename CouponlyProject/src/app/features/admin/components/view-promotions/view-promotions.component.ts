import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cilEyedropper, cilOpentype, cilPenNib, cilPlus, cilSearch, cilSortAlphaUp, cilSortNumericDown } from '@coreui/icons';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { CommonModule } from '@angular/common';
import { BgColorDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ColDirective, FormModule, GridModule, ModalComponent, ModalToggleDirective, PlaceholderAnimationDirective, PlaceholderDirective, PlaceholderModule, SpinnerComponent, TableDirective, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../pages/pagination/pagination.component';

@Component({
  selector: 'app-view-promotions',
  imports: [
    CommonModule,
    // SpinnerComponent,
    FormsModule,
    IconModule,
    TableDirective,
    FormModule,
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ModalComponent,
    ColComponent,
    PaginationComponent,
    RouterModule,
    PlaceholderAnimationDirective, 
    // ColDirective, 
    PlaceholderDirective, 
    // BgColorDirective,
    ColDirective
  ],
  templateUrl: './view-promotions.component.html',
  styleUrl: './view-promotions.component.scss'
})
export class ViewPromotionsComponent {
  // --- Icon registration ---
  icons = { cilSortAlphaUp, cilSortNumericDown, cilPlus, cilPenNib, cilOpentype, cilSearch };

  // --- Data Storage ---
  allPromotions: any[] = []; // Stores the original list from the API
  displayedPromotions: any[] = []; // Stores the filtered and sorted list
  paginatedPromotions: any[] = []; // Stores the final list for the current page

  // --- State Management ---
  isLoading = false;
  isPromotionLoading = false;

  // --- Filtering ---
  filterForm: FormGroup;
  titleFilter = '';

  // --- Sorting ---
  sortColumn = 'sentOn';
  sortDirection: 'asc' | 'desc' = 'desc';
  expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
  // --- Pagination ---
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  Statuses: any[] = [];

  constructor(private fb: FormBuilder, private promotionService: PromotionService, private router: Router) {
  console.log(this.expirationTime);
    this.filterForm = this.fb.group({
      status: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadPromotions();
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.isPromotionLoading = true;
    this.promotionService.GetStatuses().subscribe(res => {
      this.Statuses = res.data || [];
      // console.log(this.Statuses);
      this.isPromotionLoading = false;
    });
  }

  loadPromotions(): void {
    this.isLoading = true;
    this.promotionService.getPromotions(this.currentPage, this.itemsPerPage).subscribe(res => {
      // this.allPromotions = res.data.items.map((promo: any) => {
      //     return {
      //       ...promo, // Copy existing promotion properties
      //       isActionAvailable: promo.status === 'Created' && (new Date(promo.date) < this.expirationTime)
      //     };
      //   }) || [];
      this.allPromotions = res.data.items;
      this.totalItems = res.data.totalCount || 0;
      this.applyFiltersAndSort(); // Apply initial filters
      this.isLoading = false;
      // console.log(res.data);
    });
  }

  /**
   * Main method to process data. It filters, sorts, and then paginates.
   * This is much more performant than chaining pipes in the template.
   */
  applyFiltersAndSort(): void {
    const filters = this.filterForm.value;

    // 1. Apply Filters
    let filtered = this.allPromotions.filter(promo => {
      const statusMatch = filters.status ? promo.status === filters.status : true;
      const titleMatch = this.titleFilter ? promo.title.toLowerCase().includes(this.titleFilter.toLowerCase()) : true;
      // ... add logic for fromDate and toDate filters
      return statusMatch && titleMatch;
    });

    // 2. Apply Sorting
    filtered.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      
      let comparison = 0;
      if (valA > valB) comparison = 1;
      else if (valA < valB) comparison = -1;

      return this.sortDirection === 'desc' ? comparison * -1 : comparison;
    });

    this.displayedPromotions = this.allPromotions;
    this.updatePaginatedPromotions();
  }
  
  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  resetFilters(): void {
    this.filterForm.reset({ status: '', fromDate: '', toDate: '' });
    this.titleFilter = '';
    this.applyFiltersAndSort();
  }

  // --- Pagination Logic ---
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPromotions();
  }

  updatePaginatedPromotions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPromotions = this.displayedPromotions.slice(startIndex, endIndex);
  }

  openNewPromotion(): void {
    this.router.navigate(['admin/NewPromotion']);
  }

}
