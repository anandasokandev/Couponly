
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, TableDirective } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cibSoundcloud, cilCloudDownload, cilSortAlphaDown, cilSortAlphaUp } from '@coreui/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedeemHistory } from '../../../../../commons/models/redeem-history.model';
import { ToastService } from '../../../../../commons/services/Toaster/toast.service';
import { PaginationComponent } from '../../../pages/pagination/pagination.component';
import { StoreDashboardService } from '../../../../../commons/services/StoreDashboard/store-dashboard.service';

@Component({
  selector: 'app-redeem-history',
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
    PaginationComponent,
  ],
  templateUrl: './redeem-history.component.html',
  styleUrls: ['./redeem-history.component.scss']
})
export class RedeemHistoryComponent {
  icons = { cilSortAlphaUp, cibSoundcloud, cilCloudDownload, cilSortAlphaDown };

  redeems: RedeemHistory[] = [];

  // Filters
  searchType: number = 4;
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

  constructor(
    private api: StoreDashboardService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.fetchRedeems();
  }

  fetchRedeems() {
    this.isLoading = true;
    if (!this.isPageChange) this.currentPage = 1;

    this.api.getRedeemHistory(
      this.currentPage,
      this.itemsPerPage,
      this.searchType,
      this.searchText,
      this.fromDate,
      this.toDate
    ).subscribe({
      next: (response: any) => {
        this.redeems = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
        this.isPageChange = false;
      },
      error: () => {
        this.toast.show({ type: 'error', message: 'Failed to fetch redeem history.' });
        this.isLoading = false;
      }
    });
  }

  resetFilters() {
    this.searchType = 4;
    this.searchText = '';
    this.fromDate = '';
    this.toDate = '';
    this.fetchRedeems();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.fetchRedeems();
  }

  downloadExcel() {
  this.api.exportStoreRedeemsToExcel(
    this.searchType,
    this.searchText,
    this.fromDate,
    this.toDate
  ).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Store_Redeem_History.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: () => {
      this.toast.show({ type: 'error', message: 'Failed to download Excel file.' });
    }
  });
}


}