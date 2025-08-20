import { Component, EventEmitter, inject, Output } from '@angular/core';
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
  

  addStoreForm!: FormGroup;
  categories:any[]=[];
  districts:any[]=[];
  locations:any[]=[];
  default:string="Choose a District";
  selectedFile: File | null = null;
  private toast = inject(ToastService);
  constructor(private fb: FormBuilder,private api:StoreService, private locationapi:LocationService) {}


ngOnInit(){
  this.api.FetchCategories().subscribe({
        next:(response: any) =>{
          this.categories=response.data;
        }
      })

      this.locationapi.fetchDistrict().subscribe({
        next:(response: any) =>{
          this.districts=response.data;
        }
      })

  this.addStoreForm=this.fb.group({
    storeName:['',Validators.required],
    storeLogo:['',Validators.required],
    storeCategory:['',Validators.required],
    storeLocation:['',Validators.required],
    storeAddress:['',Validators.required],
    district:['',Validators.required],
    storeContact:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
    storeEmail:['',[Validators.required,Validators.email]],
    storePassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/)]],
    storeType:['',Validators.required]
  });
}

selectLocationByDistrict(){
  const districtId=this.addStoreForm.value.district;
  if(districtId!=""){
    this.default="choose a Location"
  this.locationapi.filterLocation(districtId,'','').subscribe({
    next:(response: any) =>{
          this.locations=response.data;
        }
  })
}
else{
  this.locations=[];
}
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
          const payload = {
            StoreName: this.addStoreForm.value.storeName,
            Address: this.addStoreForm.value.storeAddress,
            Logo: res.fileName,
            Contact: this.addStoreForm.value.storeContact,
            Email: this.addStoreForm.value.storeEmail,
            LocationId: this.addStoreForm.value.storeLocation,
            CategoryId: this.addStoreForm.value.storeCategory,
            ApprovedBy: 5,
            Type: this.addStoreForm.value.storeType,
            Password: this.addStoreForm.value.storePassword
          };
            console.log('Result',payload)
          this.api.AddStore(payload).subscribe({
            next: () => {
              this.toast.show({ type: 'success', message: 'Store created successfully!' });
              this.addStoreForm.reset();
              this.selectedFile = null;
            },
            error: err => console.error('Store creation failed', err)
          });
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

resetForm() {
  this.addStoreForm.reset();
}
}
