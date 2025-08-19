import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerModule } from '@coreui/angular';
import { RedeemHistoryComponent } from '../../components/redeem-history/redeem-history.component';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { IconModule } from '@coreui/icons-angular';
import { cilCloudDownload, cilEnvelopeOpen } from '@coreui/icons';
import { RedeemsHistoryServiceService } from '../../../../commons/services/Coupon/redeems-history-service.service';

@Component({
  selector: 'app-download-redeems-model',
  imports: [
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    CommonModule,
    ButtonDirective,
    SpinnerModule,
    IconModule
  ],
  templateUrl: './download-redeems-model.component.html',
  styleUrl: './download-redeems-model.component.scss'
})
export class DownloadRedeemsModelComponent {

  icons = {
    cilCloudDownload: cilCloudDownload,
    cilEnvelopeOpen: cilEnvelopeOpen
  };

  constructor(private component: RedeemHistoryComponent, private toastService: CustomToastService, private redeemsHistoryService: RedeemsHistoryServiceService) {}
  downloadRedeemsHistory() {
    this.toastService.show('Redeem history will downloaded shortly!', 'success');
    this.component.downloadExcel();
  }
  sendRedeemsHistoryEmail() {
    this.toastService.show('Redeem history will sent via email shortly! Check your inbox.', 'success');
    this.component.emailExcel();
  }
}
