import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { StoreComponent } from '../../components/store/store.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-store-modal',
  imports: [ModalComponent,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './edit-store-modal.component.html',
  styleUrl: './edit-store-modal.component.scss'
})
export class EditStoreModalComponent {
  @Input() storeToEdit: any;
  @ViewChild(StoreComponent) child!: StoreComponent;
  @ViewChild('closeButton') closeButton!: ElementRef;
  @Output() storeUpdated = new EventEmitter<void>();
  editStoreForm: FormGroup;
  logo: string = '';
  districtId: any;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private api: StoreService, private locationapi: LocationService) {
    this.editStoreForm = this.fb.group({
      storeName: ['', Validators.required],
      storeLogo: [''],
      storeCategory: ['', Validators.required],
      storeLocation: ['', Validators.required],
      storeAddress: ['', Validators.required],
      district: ['', Validators.required],
      storeContact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      storeEmail: ['', [Validators.required, Validators.email, strictEmailValidator]],
      storeType: ['', Validators.required]
    });
  }

  private toast = inject(ToastService);
  categories: any[] = [];
  districts: any[] = [];
  locations: any[] = [];
  ngOnInit() {
    //fetching Categories
    this.api.FetchCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      }
    })
    //fetching Districts
    this.locationapi.fetchDistrict().subscribe({
      next: (response: any) => {
        this.districts = response.data;
      }
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.storeToEdit) {
      this.bindOldData();
    }
  }

  bindOldData() {
    const store = this.storeToEdit;
    this.logo = store.logo
    this.editStoreForm.value.district = store.districtId
    this.selectLocationByDistrict()
    this.editStoreForm.patchValue({
      storeName: store.name,
      storeCategory: store.categoryId,
      district: store.districtId,
      storeLocation: store.locationId,
      storeAddress: store.address,
      storeContact: store.contact,
      storeEmail: store.email,
      storeType: store.typeId
    })
  }

  selectLocationByDistrict() {
    const districtId = this.editStoreForm.value.district;
    if (districtId) {
      this.locationapi.filterLocation(districtId, '', '').subscribe({
        next: (response: any) => {
          this.locations = response.data;
        }
      })
    }
    else
      this.locations = [];
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  editStore(): void {
    if (!this.editStoreForm.valid) {
      this.editStoreForm.markAllAsTouched();
      return;
    }

    const email = this.editStoreForm.value.storeEmail;
    const contact = this.editStoreForm.value.storeContact;
    const id = this.storeToEdit.id;

    forkJoin({
      emailRes: this.api.CheckEmailExits(email, id),
      contactRes: this.api.CheckContactExits(contact, id)
    }).subscribe({
      next: ({ emailRes, contactRes }) => {
        const emailExists = emailRes.exists;
        const contactExists = contactRes.exists;

        if (!emailExists && !contactExists) {
          if (this.selectedFile) {
            this.uploadAndSubmit();
          } else {
            const payload = this.buildStorePayload(this.logo);
            this.submitStoreUpdate(payload);
          }
        } else {
          if (emailExists && contactExists) {
            this.toast.show({ type: 'error', message: 'Email and contact number already exist' });
          } else if (emailExists) {
            this.toast.show({ type: 'error', message: 'Email already exists' });
          } else if (contactExists) {
            this.toast.show({ type: 'error', message: 'Contact number already exists' });
          }
        }
      },
      error: (err) => {
        console.error('Validation error:', err);
        this.toast.show({ type: 'error', message: 'Validation failed. Please try again.' });
      }
    });
  }


  private uploadAndSubmit(): void {
    this.api.UploadImage(this.selectedFile!).subscribe({
      next: res => {
        if (res.status) {
          const payload = this.buildStorePayload(res.url);
          this.submitStoreUpdate(payload);
        } else {
          this.toast.show({ type: 'error', message: 'Image upload failed' });
        }
      },
      error: () => this.toast.show({ type: 'error', message: 'Image upload failed' })
    });
  }

  private buildStorePayload(logoUrl: string): any {
    const form = this.editStoreForm.value;
    return {
      StoreName: form.storeName,
      Address: form.storeAddress,
      Logo: logoUrl,
      Contact: form.storeContact,
      Email: form.storeEmail,
      LocationId: form.storeLocation,
      CategoryId: form.storeCategory,
      Type: form.storeType
    };
  }

  private submitStoreUpdate(payload: any): void {
    this.api.UpdateStore(this.storeToEdit.id, payload).subscribe({
      next: () => {
        this.toast.show({ type: 'success', message: 'Store updated successfully!' });
        this.editStoreForm.reset();
        this.logo = "";
        this.storeUpdated.emit();
        this.closeModal();
        this.selectedFile = null;
      },
      error: () => this.toast.show({ type: 'error', message: 'Store update failed' })
    });
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  closeModal(): void {
    // You can also call this method from anywhere
    this.closeButton.nativeElement.click();
  }
}

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return { strictEmail: true };
  }
  return null;
}

