import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonCloseDirective,
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
import { UserService } from '../../../../commons/services/Users/user.service';

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


  users: any[] = [];

  userType: number = 0;

  isActive: boolean | null = null;
  searchType: number = 5;
  searchText: string = '';
  statusFilter: string = ''; // '' = All, 'true' = Active, 'false' = Inactive

  constructor(private api: UserService) { }
  ngOnInit() {

    this.api.FetchUsers().subscribe({
      next: (response: any) => {
        // console.log('Filtered response:', response.data);
        this.users = response.data;
      }
    })
  }

 


  FilterUser() {
    this.api.searchUsers(this.userType, this.isActive, this.searchType, this.searchText).subscribe({
      next: (response: any) => {
        // console.log('Filtered response:', response.data);
        this.users = response.data;
      }
    });
  }


  onStatusChange() {
  this.isActive = this.statusFilter === '' ? null : this.statusFilter === 'true';
  this.FilterUser();
}

  reset() {
    this.userType = 0;
    this.searchType = 5;
    this.searchText = '';
    this.statusFilter = '';
    this.isActive = null;
    this.FilterUser();
  }

  openEditUserModal(user: any) {
    this.selectedUser = { ...user };
  }

}
