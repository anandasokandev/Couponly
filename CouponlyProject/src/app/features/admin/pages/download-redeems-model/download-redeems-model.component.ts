import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerModule } from '@coreui/angular';
import { RedeemHistoryComponent } from '../../components/redeem-history/redeem-history.component';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';

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
    SpinnerModule
  ],
  templateUrl: './download-redeems-model.component.html',
  styleUrl: './download-redeems-model.component.scss'
})
export class DownloadRedeemsModelComponent {

  constructor(private component: RedeemHistoryComponent, private toastService: CustomToastService) {}
  downloadRedeemsHistory() {
    this.toastService.show('Redeem history will downloaded shortly!', 'success');
    this.component.downloadExcel();
  }
  sendRedeemsHistoryEmail() {
    
  }
}
