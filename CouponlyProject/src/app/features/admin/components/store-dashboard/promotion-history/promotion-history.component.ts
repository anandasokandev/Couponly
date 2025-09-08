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
  selector: 'app-promotion-history',
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
  templateUrl: './promotion-history.component.html',
  styleUrl: './promotion-history.component.scss'
})
export class PromotionHistoryComponent {

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





}
