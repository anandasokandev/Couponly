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
import { PaginationComponent } from '../../pages/pagination/pagination.component';

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
    EditUserModalComponent,
    PaginationComponent
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
  statusFilter: string = '';

  isLoading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  isPageChange: boolean = false;

  constructor(
    private api: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.api.FetchUsers(this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        // console.log('Filtered response:', response.data);
        this.users = response.data.items;
        this.totalItems = response.data.totalCount;
        // this.users = response.data;
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
    if (!this.isPageChange)
      this.currentPage = 1;
    this.api.searchUsers(

      this.userType,
      this.isActive,
      this.searchType,
      this.searchText,
      this.currentPage,
      this.itemsPerPage,
      this.currentPage
    ).subscribe({
      next: (response: any) => {
        this.users = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
        this.isPageChange = false;
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
    this.selectedUser = {
      ...user,
      type: user.typeId
    };
  }


  onToggleUserStatus(user: any): void {
    // console.log('Toggling user status:', user); 

    this.api.disableuser(user.id).subscribe({
      next: (res) => {
        // console.log('Success:', res);
        user.isActive = !user.isActive;
        this.toastService.show({ type: 'success', message: res.statusMessage });
      },
      error: (err) => {
        // console.error('Error toggling user status:', err);
        this.toastService.show({ type: 'error', message: 'Failed to toggle user status' });
      }
    });
  }

  //pagination

  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.FilterUser();
  }


}
