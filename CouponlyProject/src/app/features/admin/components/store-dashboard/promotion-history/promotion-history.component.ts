import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableDirective
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {
  cibSoundcloud,
  cilCloudDownload,
  cilSortAlphaDown,
  cilSortAlphaUp
} from '@coreui/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionHistory } from '../../../../../commons/models/promotion-history.model';
import { ToastService } from '../../../../../commons/services/Toaster/toast.service';
import { PaginationComponent } from '../../../pages/pagination/pagination.component';
import { StoreDashboardService } from '../../../../../commons/services/StoreDashboard/store-dashboard.service';

@Component({
  selector: 'app-promotion-history',
  standalone: true,
  imports: [
    CommonModule,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent
  ],
  templateUrl: './promotion-history.component.html',
  styleUrls: ['./promotion-history.component.scss']
})
export class PromotionHistoryComponent {
  icons = { cilSortAlphaUp, cibSoundcloud, cilCloudDownload, cilSortAlphaDown };

  promotions: PromotionHistory[] = [];

  // Filters
  searchType: number = 5;
  searchText: string = '';
  fromDate: string = '';
  toDate: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  isPageChange: boolean = false;

  // Loading
  isLoading: boolean = false;

  private api = inject(StoreDashboardService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.fetchPromotions();
  }

  fetchPromotions() {
    this.isLoading = true;
    if (!this.isPageChange) this.currentPage = 1;

    this.api.getPromotionHistory(
      this.currentPage,
      this.itemsPerPage,
      this.searchType,
      this.searchText,
      this.fromDate,
      this.toDate
    ).subscribe({
      next: (response: any) => {
        this.promotions = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
        this.isPageChange = false;
      },
      error: () => {
        this.toast.show({ type: 'error', message: 'Failed to fetch promotion history.' });
        this.isLoading = false;
      }
    });
  }

  resetFilters() {
    this.searchType = 5;
    this.searchText = '';
    this.fromDate = '';
    this.toDate = '';
    this.fetchPromotions();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.fetchPromotions();
  }
}
