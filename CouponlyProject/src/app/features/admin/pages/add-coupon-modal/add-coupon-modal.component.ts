import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // ✅ add this
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  ModalBodyComponent, 
  ModalComponent, 
  ModalFooterComponent, 
  ModalHeaderComponent, 
  ModalToggleDirective, 
  ButtonDirective, 
  ButtonCloseDirective, 
  FormModule, 
  SpinnerModule, 
  TableModule, 
  PaginationModule
} from "@coreui/angular";
import { IconModule } from '@coreui/icons-angular';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';
import { PaginationComponent } from "../pagination/pagination.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-coupon-modal',
  standalone: true,  // ✅ needed to use imports array here
  imports: [
    ModalHeaderComponent,
    ModalToggleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalComponent,
    ButtonDirective,
    ButtonCloseDirective,
    FormModule,
    IconModule,
    SpinnerModule,
    TableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    PaginationComponent
],
  templateUrl: './add-coupon-modal.component.html',
  styleUrls: ['./add-coupon-modal.component.scss']
})
export class AddCouponModalComponent {

  storeForm: FormGroup;
  isStoreLoading: boolean = false;
  currentPage!: number;
  totalItems!: number;
  searchResults: any[] = [];
  itemsPerPage: number = 5;
  isPageChange: boolean = false;
  storeBox: boolean = false;
  selectedStore: any = null;

  constructor(private fb: FormBuilder, private storeApi: PromotionService, private router: Router) {
    this.storeForm = this.fb.group({
      storeName: ['']
    });

    console.log(this.storeBox);
    
  }

  searchStores(){
    const storeName = this.storeForm.get('storeName')?.value;
    this.isStoreLoading = true;
    if(!this.isPageChange) {
      this.currentPage = 1; // Reset to first page on new search
    }
    this.storeApi.getStores(this.currentPage, this.itemsPerPage, '0', '1', storeName).subscribe({
      next: (response: any) => {
        this.searchResults = response.data.items;
        this.totalItems = response.data.totalCount;
        this.isStoreLoading = false;
        this.isPageChange = false;
        this.storeBox = !this.storeBox;
        console.log(this.searchResults)
      }
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.isPageChange = true;
    this.searchStores();
  }

  selectStore(store: any){
    this.selectedStore = store;
  }

  generateCoupon(){
    console.log(this.selectedStore.id);
    this.router.navigate(['/admin/generatecoupon', this.selectedStore.id]);
  }
}
