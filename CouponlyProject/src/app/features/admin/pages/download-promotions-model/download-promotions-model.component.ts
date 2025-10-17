import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonDirective, ModalBodyComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cilCloudDownload } from '@coreui/icons/dist/esm/free/cil-cloud-download';
import { cilEnvelopeOpen } from '@coreui/icons/dist/esm/free/cil-envelope-open';
import { ToastService } from 'src/app/commons/services/Toaster/toast.service';
import { ViewPromotionsComponent } from '../../components/view-promotions/view-promotions.component';

@Component({
  selector: 'app-download-promotions-model',
  imports: [
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    CommonModule,
    ButtonDirective,
    SpinnerModule,
    IconModule
  ],
  templateUrl: './download-promotions-model.component.html',
  styleUrl: './download-promotions-model.component.scss'
})
export class DownloadPromotionsModelComponent {
  icons = {
    cilCloudDownload: cilCloudDownload,
    cilEnvelopeOpen: cilEnvelopeOpen
  };

  private toast = inject(ToastService);

  constructor(private component: ViewPromotionsComponent) {}
  downloadPromotionsHistory() {
    this.toast.show({ type: 'success', message: 'Promotions history will downloaded shortly!' });
    // this.component.downloadExcel();
  }
  sendPromotionsHistoryEmail() {
    this.toast.show({ type: 'success', message: 'Promotions history will sent via email shortly! Check your inbox.' });
    // this.component.emailExcel();
  }
}
