import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  TableDirective
} from '@coreui/angular';
import { AddUserModalComponent } from '../../pages/add-user-modal/add-user-modal.component';
import { FormsModule } from '@angular/forms';
import { EditUserModalComponent } from '../../pages/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-manage-users',
  imports: [
    CommonModule,
    FormCheckComponent,
    FormCheckInputDirective,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    AddUserModalComponent,
    FormsModule,
    EditUserModalComponent
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

  selectedUser: any = null;

  users = [
    {
      firstName: 'Emma',
      lastName: 'Joseph',
      email: 'emma@gmail.com',
      phoneNumber: '9876543210',
      type: 'Admin'
    },
    {
      firstName: 'Andrews',
      lastName: 'Thomas',
      email: 'andrews@gmail.com',
      phoneNumber: '9876541230',
      type: 'User'
    }
  ];


  openEditUserModal(user: any) {
    this.selectedUser = { ...user };
  }

}
