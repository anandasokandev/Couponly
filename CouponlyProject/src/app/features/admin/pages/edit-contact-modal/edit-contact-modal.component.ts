import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';

@Component({
  selector: 'app-edit-contact-modal',
  imports: [ModalComponent,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective],
  templateUrl: './edit-contact-modal.component.html',
  styleUrl: './edit-contact-modal.component.scss'
})
export class EditContactModalComponent {
 constructor(private toastService: CustomToastService) {}
 
 createContacts() {
   this.toastService.show('✅ Edit successfully!', 'success');
 }
 }
