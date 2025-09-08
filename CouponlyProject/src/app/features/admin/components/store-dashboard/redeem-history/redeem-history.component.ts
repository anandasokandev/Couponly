import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent,  ModalComponent, ModalToggleDirective,  TableDirective } from '@coreui/angular';
import {  IconModule } from '@coreui/icons-angular';
import {  cibSoundcloud, cilCloudDownload, cilSortAlphaDown, cilSortAlphaUp } from '@coreui/icons';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedeemHistory } from '../../../../../commons/models/redeem-history.model';
import { DownloadRedeemsModelComponent } from '../../../pages/download-redeems-model/download-redeems-model.component';
import { RedeemsHistoryServiceService } from '../../../../../commons/services/Coupon/redeems-history-service.service';
import { ToastService } from '../../../../../commons/services/Toaster/toast.service';
import { PaginationComponent } from '../../../pages/pagination/pagination.component';


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
    // DownloadRedeemsModelComponent,
    FormsModule,
    ReactiveFormsModule,
    // ModalToggleDirective,
    // ModalComponent,
    PaginationComponent,
  ],
  templateUrl: './redeem-history.component.html',
  styleUrl: './redeem-history.component.scss'
})
export class RedeemHistoryComponent {
  icons = { cilSortAlphaUp, cibSoundcloud, cilCloudDownload, cilSortAlphaDown };

  // Filters
  filterCouponCode: string = '';
  fromDate: string = '';
  toDate: string = '';

  // Pagination
  itemsPerPage: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;
  isPageChange: boolean = false;

  // Data
  redeems: RedeemHistory[] = [];
  couponCodes: string[] = [];

  private toast = inject(ToastService);

  constructor(private redeemHistoryService: RedeemsHistoryServiceService) {}

  ngOnInit() {
    this.getRedeems();
    this.getCouponCodes();
  }

  getRedeems() {
    this.isLoading = true;
    if (!this.isPageChange) this.currentPage = 1;

    this.redeemHistoryService.getAllRedeems(
      this.currentPage,
      this.itemsPerPage,
      0, // districtId removed
      0, // locationId removed
      this.fromDate,
      this.toDate
    )?.subscribe((data: RedeemHistory[]) => {
      this.redeems = data;
      this.isLoading = false;
      this.isPageChange = false;
    });
  }

  getCouponCodes() {
    // You can replace this with a real API call if needed
    this.couponCodes = ['Coupon 1', 'Coupon 2', 'Coupon 3'];
  }

  getRedeemsFiltered(): RedeemHistory[] {
    return this.redeems.filter(redeem =>
      this.filterCouponCode === '' ||
      redeem.redeemCouponCode.toLowerCase().includes(this.filterCouponCode.toLowerCase())
    );
  }

  resetFilter() {
    this.filterCouponCode = '';
    this.fromDate = '';
    this.toDate = '';
    this.getRedeems();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.getRedeems();
  }

  downloadExcel() {
    this.redeemHistoryService.exportRedeemsToExcel(0, 0, this.fromDate, this.toDate)?.subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Redeems History.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      this.toast.show({ type: 'success', message: 'Redeem history downloaded successfully!' });
    }, error => {
      this.toast.show({ type: 'error', message: 'Failed to download redeem history.' });
    });
  }
}
