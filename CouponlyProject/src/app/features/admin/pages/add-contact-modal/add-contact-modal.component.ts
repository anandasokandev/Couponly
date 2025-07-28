import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
@Component({
  selector: 'app-add-contact-modal',
  imports: [ ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    FormDirective,
    FormControlDirective,
    FormLabelDirective,
    ModalFooterComponent,
    CommonModule,
    ModalFooterComponent,
    ButtonDirective
  ],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.scss'
})
export class AddContactModalComponent {

 constructor(private toastService: CustomToastService) {}
 
 createContact() {
   this.toastService.show('✅ Contact created successfully!', 'success');
 }
 }