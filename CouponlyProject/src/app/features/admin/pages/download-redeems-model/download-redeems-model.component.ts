import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

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
    ButtonDirective
  ],
  templateUrl: './download-redeems-model.component.html',
  styleUrl: './download-redeems-model.component.scss'
})
export class DownloadRedeemsModelComponent {
  downloadRedeemsHistory() {
    
  }
  sendRedeemsHistoryEmail() {
    
  }
}
