import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule , FormsModule} from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { StoreService } from '../../../commons/services/Store/store.service';
import { ToastService,} from '../../../commons/services/Toaster/toast.service';
import { ToastComponent } from '../../admin/pages/toast/toast.component';
import { ContactService } from '../../../commons/services/Contacts/contact.service';
import { StoreDashboardService } from '../../../commons/services/StoreDashboard/store-dashboard.service';

@Component({
  selector: 'app-redeem-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    FormsModule,
    ToastComponent
  ],
  templateUrl: './redeem-store.component.html',
  styleUrls: ['./redeem-store.component.scss']
})
export class RedeemStoreComponent implements OnInit, AfterViewInit  {
  couponSearch = '';
  filteredCoupons: any[] = [];
  coupons: any[] = [];
  selectedCoupon: string = '';
  selectedCouponImage: string | null = null;
  storeId: any = null;
  contacts:any[]=[];
  contactForm: FormGroup;
  searchStart:boolean=false;
  selectedContact: any = null;
  public toast = inject(ToastService);

  @ViewChild('closeButton') closeButton!: ElementRef;
  @Output() contactAdded = new EventEmitter<void>();
  
 

  constructor(private storeService: StoreService, private fb: FormBuilder,private conatctService: ContactService,
    private api:StoreDashboardService
  ) {
    this.contactForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      Message: ['']
    });
  }
  contactSearch:any; 

ngOnInit(): void {
  this.loadValidCoupons();
  this.storeId = sessionStorage.getItem('storeId');


}

  updateSelectedCouponImage(): void {
    const selected = this.coupons.find(c => c.couponId === this.selectedCoupon);
    this.selectedCouponImage = selected?.imageUrl || null;
  }

searchContact() {
  const query = this.contactSearch?.trim();

  if (!query) {
    this.contacts = [];
    this.searchStart = false;
    console.log('IFFF',this.contacts)
    return;
  }
  else{
console.log('ELSE',this.contacts)
  this.searchStart = true;
  this.conatctService.searchContacts(1, 3, '', '', query).subscribe({
    next: (response: any) => {
      this.contacts = response.data.items;
      this.searchStart = false;
    },
    error: (err) => {
      console.error('Search error:', err);
      this.searchStart = false;
    }
  });
}
}



  createContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toast.show({ type: 'error', message: 'Please correct the errors before submitting.' });
      return;
    }

    const contactData = this.contactForm.value;

    this.storeService.AddNewContact(contactData).subscribe({
      next: (response: any) => {
        console.log(response)
        if(response.isSuccess == true) {
          this.toast.show({ type: 'success', message: 'Contact created successfully!' });
          this.contactSearch=contactData.PhoneNumber
          this.searchContact();
          console.log(this.storeService);
          
          this.contactForm.reset();
          this.contactAdded.emit();
          this.closeModal();
        } else {
        console.error('Error creating contact:', response.errors[0]);
        this.toast.show({ type: 'error', message: response.errors[0] });
        }
      },
      error: (err) => {
        console.error('Error creating contact:', err);
        this.toast.show({ type: 'error', message: 'Failed to create contact.' });
      }
    });
  }


  validateNameInput(event: KeyboardEvent): void {
    const inputChar = event.key;
    if (!/^[a-zA-Z\s]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  validatePhoneInput(event: KeyboardEvent): void {
    const inputChar = event.key;
    const currentValue = this.contactForm.get('PhoneNumber')?.value || '';

    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
      return;
    }

    if (currentValue.length >= 10) {
      event.preventDefault();
    }
  }

  onRemove(id: number) {
    this.toast.remove(id);
  }

  refreshSearch(): void {
  this.contactSearch = '';
  this.contacts = [];
  this.searchStart = false;
}

selectContact(contact: any): void {
  this.selectedContact = contact;
}

ngAfterViewInit(): void {
  const scroller = document.querySelector('.coupon-scroller') as HTMLElement | null;
  const leftBtn = document.getElementById('scrollLeft');
  const rightBtn = document.getElementById('scrollRight');

  if (!scroller || !leftBtn || !rightBtn) return;

  const scrollAmount = 260; // Adjust based on your card width

  leftBtn.addEventListener('click', () => {
    scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  const modalEl = document.getElementById('addNewUserModal');
    if (modalEl) {
      modalEl.addEventListener('shown.bs.modal', () => {
        this.resetModal();
      });
    }
}


filterCoupons(): void {
  const term = this.couponSearch?.trim().toLowerCase() ?? '';
  this.filteredCoupons = this.coupons.filter(c =>
    c.name?.toLowerCase().includes(term) ||
    c.couponCode?.toLowerCase().includes(term)
  );
}

clearCouponSearch(): void {
  this.couponSearch = '';
  this.filteredCoupons = [...this.coupons];
}

selectCoupon(coupon: any): void {
  this.selectedCoupon = coupon.id;
  this.updateSelectedCouponImage(); // keep your function logic intact
}

private loadValidCoupons(): void {
  this.api.getStoreCoupons('', undefined, 'valid').subscribe({
    next: (response: any) => {
      console.log('COUPONS FROM API →', response);
      this.coupons = Array.isArray(response.data) ? response.data : [];
      this.filteredCoupons = [...this.coupons];

      console.log("Coupon IDs:", this.coupons.map(c => c.id)); // ✅ fixed from couponId to id
      console.log("Sample coupon object:", this.coupons[0]);

      if (this.coupons.length === 0) {
        this.toast.show({ type: 'info', message: 'No valid coupons found.' });
      }
    },
    error: (err: any) => {
      console.error('Failed to fetch coupons:', err);
      this.toast.show({ type: 'error', message: 'Failed to fetch coupons.' });
      this.coupons = [];
      this.filteredCoupons = [];
    }
  });
}

resetModal(): void {
    this.contactForm.reset();
    this.contactSearch = '';
    this.contacts = [];
    this.contactForm.markAsPristine();
    this.contactForm.markAsUntouched();
  }
 
isModalOpen = false;
 
openModal(): void {
  this.resetModal(); // reset before showing
  this.isModalOpen = true;
}
 
closeModal(): void {
  this.isModalOpen = false;
}
 
getSelectedCoupon(): any {
  if (!this.selectedCoupon) return null;
  return this.coupons.find(c => c.id === this.selectedCoupon);
}

confirmRedeem(): void {
  const selectedCoupon = this.getSelectedCoupon();
  const selectedUser = this.selectedContact;
  if (!selectedUser || !selectedCoupon) {
    this.toast.show({
      type: 'error',
      message: 'Please select both a customer and a coupon before redeeming.'
    });
    return;
  }
  const redeemData = {
    coupon: selectedCoupon.id,
    user: selectedUser.id,  
    store: this.storeId,    
  };
  console.log('DATA',redeemData)
this.storeService.redeem(redeemData).subscribe({
      next: (response) => {
        console.log('HIIIII')
        console.log('Coupon redeemed successfully:', response);
      },
      error: (error) => {
        console.error('Error redeeming coupon:', error);
      }
    });


//    // Hide modal safely after confirm
//   const modalEl = document.getElementById('checkoutModal');
//   const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalEl);
//   if (modalInstance) modalInstance.hide();

//   // Optional success toast
//   this.toast.show({
//     type: 'success',
//     message: `🎉 ${selectedCoupon.name} redeemed for ${selectedUser.name}!`
//   });

//   // Refresh after short delay (so toast is visible)
// setTimeout(() => {
//   window.location.reload();
// }, 1000);

}


}


