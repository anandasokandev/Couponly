import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerModule } from '@coreui/angular';
import { RedeemHistoryComponent } from '../../components/redeem-history/redeem-history.component';

import { IconModule } from '@coreui/icons-angular';
import { cilCloudDownload, cilEnvelopeOpen } from '@coreui/icons';
import { RedeemsHistoryServiceService } from '../../../../commons/services/Coupon/redeems-history-service.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

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

  private toast = inject(ToastService);

  constructor(private component: RedeemHistoryComponent) {}
  downloadRedeemsHistory() {
    this.toast.show({ type: 'success', message: 'Redeem history will downloaded shortly!' });
    this.component.downloadExcel();
  }
  sendRedeemsHistoryEmail() {
    this.toast.show({ type: 'success', message: 'Redeem history will sent via email shortly! Check your inbox.' });
    this.component.emailExcel();
  }
}
