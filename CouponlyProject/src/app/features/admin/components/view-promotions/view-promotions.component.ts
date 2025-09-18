import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cilSortAlphaUp, cilSortNumericDown } from '@coreui/icons';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { CommonModule } from '@angular/common';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormModule, ModalComponent, ModalToggleDirective, SpinnerComponent, TableDirective } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-view-promotions',
  imports: [
    CommonModule,
    SpinnerComponent,
    FormsModule,
    IconModule,
    TableDirective,
    FormModule,
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ModalComponent,
    ModalToggleDirective,
    ColComponent
  ],
  templateUrl: './view-promotions.component.html',
  styleUrl: './view-promotions.component.scss'
})
export class ViewPromotionsComponent {
  // --- Icon registration ---
  icons = { cilSortAlphaUp, cilSortNumericDown };

  // --- Data Storage ---
  allPromotions: any[] = []; // Stores the original list from the API
  displayedPromotions: any[] = []; // Stores the filtered and sorted list
  paginatedPromotions: any[] = []; // Stores the final list for the current page

  // --- State Management ---
  isLoading = true;

  // --- Filtering ---
  filterForm: FormGroup;
  titleFilter = '';

  // --- Sorting ---
  sortColumn = 'sentOn';
  sortDirection: 'asc' | 'desc' = 'desc';

  // --- Pagination ---
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private fb: FormBuilder, private promotionService: PromotionService) {
    this.filterForm = this.fb.group({
      status: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  ngOnInit(): void {
    // this.promotionService.getPromotions().subscribe(data => {
    //   this.allPromotions = data;
    //   this.applyFiltersAndSort(); // Apply initial filters
    //   this.isLoading = false;
    // });
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

    this.displayedPromotions = filtered;
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
    this.updatePaginatedPromotions();
  }

  updatePaginatedPromotions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPromotions = this.displayedPromotions.slice(startIndex, endIndex);
  }
}
