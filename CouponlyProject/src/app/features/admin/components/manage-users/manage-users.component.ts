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
  filter = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  type: ''
};
selectedUser: any = null;

  users = [
  {
    firstName: 'Alice',
    lastName: 'Joseph',
    email: 'alice@example.com',
    phoneNumber: '9876543210',
    type: 'Admin'
  },
  {
    firstName: 'Bob',
    lastName: 'Mathew',
    email: 'bob@example.com',
    phoneNumber: '9876541230',
    type: 'User'
  }
];
get filteredUsers() {
  return this.users.filter(user =>
    user.firstName.toLowerCase().includes(this.filter.firstName.toLowerCase()) &&
    user.lastName.toLowerCase().includes(this.filter.lastName.toLowerCase()) &&
    user.email.toLowerCase().includes(this.filter.email.toLowerCase()) &&
    user.phoneNumber.includes(this.filter.phoneNumber) &&
    (this.filter.type === '' || user.type === this.filter.type)
  );
}

currentPage = 1;
itemsPerPage = 5;

get pagedUsers() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
}

get totalPages() {
  return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
}

changePage(page: number) {
  this.currentPage = page;
}
onUserSaved() {
  console.log('User successfully saved.');
}

openEditUserModal(user: any) {
  this.selectedUser = { ...user }; 
}

}
