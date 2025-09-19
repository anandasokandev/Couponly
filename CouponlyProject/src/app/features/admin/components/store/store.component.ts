import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalComponent, ModalToggleDirective, TableDirective } from '@coreui/angular';
import { AddStoreModalComponent } from '../../pages/add-store-modal/add-store-modal.component';
import { EditStoreModalComponent } from '../../pages/edit-store-modal/edit-store-modal.component';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../pages/pagination/pagination.component';


@Component({
  selector: 'app-store',
  imports: [CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    TableDirective,
    ModalToggleDirective,
    ModalComponent,
    ReactiveFormsModule,
    FormsModule,
    AddStoreModalComponent,
    EditStoreModalComponent,
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  standalone: true
})
export class StoreComponent {


  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  isLoading: boolean = true;
  isPageChange: boolean = false;
  stores: any[] = [];
  selectedStore: any = null;
  type: number = 0;
  searchtype: number = 0;
  searchtext: string = '';
  constructor(private api: StoreService) { }

  ngOnInit() {
    this.FetchStores();
  }

  FetchStores() {
    this.isLoading = true;
    this.api.FetchStores(this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        
        this.stores = response.data.items;
        console.log(this.stores);
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
      }})
  }

  FilterStore() {
    if (!this.isPageChange)
      this.currentPage = 1;
    this.api.searchStores(this.currentPage, this.itemsPerPage, this.type, this.searchtype, this.searchtext).subscribe({
      next: (response: any) => {
        this.stores = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isLoading = false;
        this.isPageChange = false;
      }
    })
  }


  reset() {
    this.type = 0;
    this.searchtype = 0;
    this.searchtext = '';
    this.FilterStore();
  }

  openEditModal(id: number) {
    this.api.FetchStore(id).subscribe({
      next: (response: any) => {
        this.selectedStore = response.data;
        console.log(this.selectedStore)
      }})
  }

  refreshStore() {
    this.api.FetchStores(this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        this.stores = response.data;
      }})
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.FilterStore();
  }

}
