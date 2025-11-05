import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
@Component({
  selector: 'app-add-store-modal',
  imports: [
    ModalComponent,
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
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-store-modal.component.html',
  styleUrl: './add-store-modal.component.scss'
})


export class AddStoreModalComponent {
  
   @ViewChild('closeButton') closeButton!: ElementRef;
   @Output() storeAdded = new EventEmitter<void>();
  addStoreForm!: FormGroup;
  categories:any[]=[];
  districts:any[]=[];
  locations:any[]=[];
  default:string="Choose a District";
  selectedFile: File | null = null;
  private toast = inject(ToastService);
  constructor(private fb: FormBuilder,private api:StoreService, private locationapi:LocationService) {}


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
    //InitiateForm
    this.initiateForm();
  }

private initiateForm(){
   this.addStoreForm=this.fb.group({
    storeName:['',Validators.required],
    storeLogo:['',Validators.required],
    storeCategory:['',Validators.required],
    storeLocation:['',Validators.required],
    storeAddress:['',Validators.required],
    district:['',Validators.required],
    storeContact:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
    storeEmail:['',[Validators.required,strictEmailValidator]],
    storeType:['',Validators.required]
  });
}

  selectLocationByDistrict() {
    const districtId = this.addStoreForm.value.district;
    if (districtId != "") {
      this.default = "choose a Location"
      this.locationapi.filterLocation(districtId, '', '').subscribe({
        next: (response: any) => {
          this.locations = response.data;
        }})
    }
    else 
      this.locations = [];
  }

  
allowOnlyNumbers(event: KeyboardEvent) {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

createStore() {
  if (!this.addStoreForm.valid) {
    this.addStoreForm.markAllAsTouched();
    console.log('Invalid form', this.addStoreForm.value);
    return;
  }

  const form = this.addStoreForm.value;
  const email = form.storeEmail;
  const contact = form.storeContact;

  // Step 1: Check if store already exists
  this.api.CheckStoreExistence(email, contact).subscribe({
    next: res => {
      if (res.emailExists && res.contactExists) {
        this.toast.show({ type: 'error', message: 'A store with this email and phone number already exists.' });
        return;
      } else if (res.emailExists) {
        this.toast.show({ type: 'error', message: 'A store with this email already exists.' });
        return;
      } else if (res.contactExists) {
        this.toast.show({ type: 'error', message: 'A store with this phone number already exists.' });
        return;
      }

      // Step 2: Proceed with image upload
      if (!this.selectedFile) {
        this.toast.show({ type: 'error', message: 'Please select a store logo/image.' });
        return;
      }

      this.api.UploadImage(this.selectedFile).subscribe({
        next: res => {
          if (res.status && res.url) {
            const payload = this.buildStorePayload(res.url);

            // Step 3: Add store
            this.api.AddStore(payload).subscribe({
              next: () => {
                this.toast.show({ type: 'success', message: 'Store created successfully!' });
                this.addStoreForm.reset();
                this.storeAdded.emit();
                this.closeModal();
                this.selectedFile = null;
              },
              error: () => {
                this.toast.show({ type: 'error', message: 'Store creation failed.' });
              }
            });
          } else {
            this.toast.show({ type: 'error', message: 'Image upload failed.' });
          }
        },
        error: err => {
          console.error('Image upload error:', err);
          this.toast.show({ type: 'error', message: 'Image upload failed.' });
        }
      });
    },
    error: err => {
      console.error('Existence check failed:', err);
      this.toast.show({ type: 'error', message: 'Failed to validate store details.' });
    }
  });
}


private buildStorePayload(url: string): any {
  const form = this.addStoreForm.value;
  return {
    StoreName: form.storeName,
    Address: form.storeAddress,
    Logo: url,
    Contact: form.storeContact,
    Email: form.storeEmail,
    LocationId: form.storeLocation,
    CategoryId: form.storeCategory,
    ApprovedBy: sessionStorage.getItem('userId'),
    Type: form.storeType,
  };
}

resetForm() {
  this.addStoreForm.reset();
}

closeModal(): void {
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

