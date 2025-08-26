import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    storeEmail:['',[Validators.required,Validators.email]],
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
  if (this.addStoreForm.valid) {
    if (this.selectedFile) {
      this.api.UploadImage(this.selectedFile).subscribe({
        next: res => {
          if(res.status){
            const payload = this.buildStorePayload(res.url);
          this.api.AddStore(payload).subscribe({
            next: () => {
              this.toast.show({ type: 'success', message: 'Store created successfully!' });
              this.addStoreForm.reset();
              this.closeModal();
              this.selectedFile = null;
            },
            error:() => this.toast.show({ type: 'error', message: 'Store created failed' })
          });
          }
        },
        error: err => console.error('Image upload failed', err)
      });
      
    } else {
      console.warn('No image selected');
    }
  } else {
    this.addStoreForm.markAllAsTouched();
    console.log('Invalid form', this.addStoreForm.value);
  }
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
    ApprovedBy: 5,
    Type: form.storeType,
  };
}

resetForm() {
  this.addStoreForm.reset();
}

closeModal(): void {
    // You can also call this method from anywhere
    this.closeButton.nativeElement.click();
  }

}
