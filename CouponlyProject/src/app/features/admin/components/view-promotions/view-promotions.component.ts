import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cilCloudDownload, cilEyedropper, cilOpentype, cilPenNib, cilPlus, cilSearch, cilSortAlphaDown, cilSortAlphaUp, cilSortAscending, cilSortNumericDown, cilSortNumericUp } from '@coreui/icons';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { CommonModule } from '@angular/common';
import { BgColorDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ColDirective, FormModule, GridModule, ModalComponent, ModalToggleDirective, PlaceholderAnimationDirective, PlaceholderDirective, PlaceholderModule, SpinnerComponent, TableDirective, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../pages/pagination/pagination.component';
import { DownloadPromotionsModelComponent } from '../../pages/download-promotions-model/download-promotions-model.component';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

enum sortColumns {
  title = 'title',
  date = 'date',
  store = 'store',
  code = 'code',
  contact = 'contact',
  status = 'status'
}

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
    ColDirective,
    DownloadPromotionsModelComponent,
    ModalToggleDirective,
    ModalComponent,
  ],
  templateUrl: './view-promotions.component.html',
  styleUrl: './view-promotions.component.scss'
})
export class ViewPromotionsComponent {
  // --- Icon registration ---
  icons = { cilSortAlphaUp, cilSortAlphaDown, cilSortNumericDown, cilSortNumericUp, cilPlus, cilPenNib, cilOpentype, cilSearch, cilCloudDownload  };

  // --- Data Storage ---
  allPromotions: any[] = []; // Stores the original list from the API
  displayedPromotions: any[] = []; // Stores the filtered and sorted list
  paginatedPromotions: any[] = []; // Stores the final list for the current page
  Statuses: any[] = []; // List of possible statuses

  // --- State Management ---
  isLoading = false;
  isStatusLoading = false;

  // --- Filtering ---
  titleFilter: string = '';
  storeFilter: string = '';
  codeFilter: string = '';
  statusFilter: number = 0;
  fromDateFilter: string = '';
  toDateFilter: string = '';

  // --- Sorting ---
  sortColumn: sortColumns = sortColumns.date;
  sortDirection: 'asc' | 'desc' = 'desc';
  expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // --- Pagination ---
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  private toast = inject(ToastService);
  constructor(private promotionService: PromotionService, private router: Router) { }

  ngOnInit(): void {
    this.loadPromotions();
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.isStatusLoading = true;
    this.promotionService.GetStatuses().subscribe(res => {
      this.Statuses = res.data || [];
      // console.log(this.Statuses);
      this.isStatusLoading = false;
    });
  }

  loadPromotions(): void {
    this.isLoading = true;
    this.promotionService.getPromotionsWithFilter(
      this.currentPage, 
      this.itemsPerPage, 
      this.titleFilter, 
      this.storeFilter, 
      this.codeFilter, 
      this.statusFilter, 
      this.fromDateFilter, 
      this.toDateFilter, 
      this.sortColumn, 
      this.sortDirection).subscribe(res => {
      // this.allPromotions = res.data.items.map((promo: any) => {
      //     return {
      //       ...promo, // Copy existing promotion properties
      //       isActionAvailable: promo.status === 'Created' && (new Date(promo.date) < this.expirationTime)
      //     };
      //   }) || [];
      this.allPromotions = res.data.items;
      this.totalItems = res.data.totalCount || 0;
      this.isLoading = false;
      console.log(res.data);
    }, error => {
      this.isLoading = false;
      this.toast.show({ type: 'error', message: 'Failed to load promotions.' });
    });
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = sortColumns[column as keyof typeof sortColumns];
      this.sortDirection = 'asc';
    }
    this.loadPromotions();
  }

  resetFilters(): void {
    this.titleFilter = '';
    this.storeFilter = '';
    this.codeFilter = '';
    this.statusFilter = 0;
    this.fromDateFilter = '';
    this.toDateFilter = '';
    this.loadPromotions();
  }

  // --- Pagination Logic ---
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPromotions();
  }

  openNewPromotion(): void {
    this.router.navigate(['admin/NewPromotion']);
  }

  downloadExcel() {
    this.promotionService.downloadPromotionReportExcel(
      this.titleFilter, 
      this.storeFilter, 
      this.codeFilter,
      this.statusFilter,
      this.fromDateFilter,
      this.toDateFilter,
      this.sortColumn,
      this.sortDirection
    )?.subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Promotions History.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.toast.show({ type: 'success', message: 'Promotions history downloaded successfully!' });
      },
      error: (error: any) => {
        console.error('Download failed', error);
        this.toast.show({ type: 'error', message: 'Failed to download promotions history.' });
      }
    });
  }

  emailExcel() {
    this.promotionService.emailPromotionReportExcel(
      this.titleFilter,
      this.storeFilter,
      this.codeFilter,
      this.statusFilter,
      this.fromDateFilter,
      this.toDateFilter,
      this.sortColumn,
      this.sortDirection
    ).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.toast.show({ type: 'success', message: response.data });
        } else {
          this.toast.show({ type: 'error', message: 'Failed to send redeem history email.' });
        }
      },
      error: (error) => {
        console.error('Email failed', error);
        this.toast.show({ type: 'error', message: 'Failed to email promotions history.' });
      }
    });
  }
}
