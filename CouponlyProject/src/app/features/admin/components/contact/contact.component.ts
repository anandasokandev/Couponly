import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableActiveDirective, TableDirective } from '@coreui/angular';
import { EditContactModalComponent } from '../../pages/edit-contact-modal/edit-contact-modal.component';

@Component({
  selector: 'app-contact',
  imports: [ColComponent,CardComponent,CardHeaderComponent,CardBodyComponent,TableDirective,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,CommonModule,EditContactModalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}