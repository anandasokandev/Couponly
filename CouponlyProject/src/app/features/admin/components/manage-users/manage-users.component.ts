import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {

  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  ModalComponent,
  ModalToggleDirective,
  TableDirective
} from '@coreui/angular';
import { AddUserModalComponent } from '../../pages/add-user-modal/add-user-modal.component';
import { FormsModule } from '@angular/forms';
import { EditUserModalComponent } from '../../pages/edit-user-modal/edit-user-modal.component';
import { UserService } from '../../../../commons/services/Users/user.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

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

  isLoading: boolean = false;

  constructor(
    private api: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
     this.isLoading = true;
    this.api.FetchUsers().subscribe({
      next: (response: any) => {
        //  console.log('Filtered response:', response.data);
        this.users = response.data;
        // console.log('Fetched users:', this.users);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }




  FilterUser() {
    this.isLoading = true;
    this.api.searchUsers(this.userType, this.isActive, this.searchType, this.searchText).subscribe({
      next: (response: any) => {
        // console.log('Filtered response:', response.data);
        this.users = response.data;
        this.isLoading = false;
      },
      error: (err) => {
      this.isLoading = false;
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


  onToggleUserStatus(user: any): void {
    // console.log('Toggling user status:', user); // Confirm user.id is valid

    this.api.disableuser(user.id).subscribe({
      next: (res) => {
        // console.log('Success:', res);
        user.isActive = !user.isActive; // Optimistically update UI
        this.toastService.show({ type: 'success', message: res.statusMessage });
      },
      error: (err) => {
        // console.error('Error toggling user status:', err);
        this.toastService.show({ type: 'error', message: 'Failed to toggle user status' });
      }
    });
  }




}
