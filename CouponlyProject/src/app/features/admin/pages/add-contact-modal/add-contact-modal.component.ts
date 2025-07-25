import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

@Component({
  selector: 'app-add-contact-modal',
  imports: [ ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,CommonModule],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.scss'
})
export class AddContactModalComponent {

}
