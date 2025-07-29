import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableActiveDirective, TableDirective } from '@coreui/angular';
import { EditContactModalComponent } from '../../pages/edit-contact-modal/edit-contact-modal.component';
import { AddContactModalComponent } from '../../pages/add-contact-modal/add-contact-modal.component';

@Component({
  selector: 'app-contact',
  imports: [ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    ModalToggleDirective,
    ModalComponent,
    CommonModule,
    EditContactModalComponent,
    AddContactModalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}