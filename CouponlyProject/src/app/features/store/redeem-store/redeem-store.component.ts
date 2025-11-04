import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { StoreService } from '../../../commons/services/Store/store.service';
import { ToastService, ReactiveFormsModule } from '../../../commons/services/Toaster/toast.service';
import { ToastComponent } from '../../admin/pages/toast/toast.component';
import { ContactService } from '../../../commons/services/Contacts/contact.service';

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
export class RedeemStoreComponent implements OnInit {
  coupons: any[] = [];
  selectedCoupon: string = '';
  selectedCouponImage: string | null = null;
  storeId: any = null;

  contactForm: FormGroup;
  public toast = inject(ToastService);

  @ViewChild('closeButton') closeButton!: ElementRef;
  @Output() contactAdded = new EventEmitter<void>();
 

  constructor(private storeService: StoreService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      Message: ['']
    });
  }
  storeId: any = null ; 
  contactSearch:any;

  constructor(private storeService: StoreService, private conatctService: ContactService) {} 

  ngOnInit(): void {
    this.storeId = sessionStorage.getItem('storeId');
    console.log('StoreId:', this.storeId);

    if (this.storeId) {
      this.storeService.FetchStoreRedeem(this.storeId).subscribe({
        next: (res) => {
          this.coupons = res.data;
        },
        error: (err) => {
          console.error('Error fetching coupons:', err);
        }
      });
    }
  }

  updateSelectedCouponImage(): void {
    const selected = this.coupons.find(c => c.couponId === this.selectedCoupon);
    this.selectedCouponImage = selected?.imageUrl || null;
  }

searchContact(){

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

  closeModal(): void {
    this.closeButton.nativeElement.click();
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
}
