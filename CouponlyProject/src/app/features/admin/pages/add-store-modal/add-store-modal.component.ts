import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-store-modal',
  imports: [
    ModalComponent,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    CommonModule
  ],
  templateUrl: './add-store-modal.component.html',
  styleUrl: './add-store-modal.component.scss'
})
export class AddStoreModalComponent {
  isModalOpen = true;
constructor(private toastService: CustomToastService) {}

createStore() {
  this.toastService.show('Store created successfully!', 'warning');
}
}
