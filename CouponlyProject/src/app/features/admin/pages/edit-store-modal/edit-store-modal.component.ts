import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { LocationService } from '../../../../commons/services/Admin/location.service';

@Component({
  selector: 'app-edit-store-modal',
  imports: [ ModalComponent,
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
  editStoreForm: FormGroup;
constructor(private fb: FormBuilder,private api:StoreService, private locationapi:LocationService) {
  this.editStoreForm=this.fb.group({
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

private toast = inject(ToastService);
categories:any[]=[];
districts:any[]=[];
locations:any[]=[];
ngOnInit(){
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
    //Bind Data
    this.bindOldData
}

bindOldData(){
const store=this.storeToEdit;
console.log(store)
this.editStoreForm.patchValue({
  storeName:store.store,
  storeCategory:store.category,
  storeLocation: store.location,
  storeAddress:store.storeAddress,
  district: store.districtId,
  storeContact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  storeEmail: ['', [Validators.required, Validators.email]],
  storeType: ['', Validators.required]
})
}

 selectLocationByDistrict() {
    const districtId = this.editStoreForm.value.district;
    if (districtId != "") {
      this.locationapi.filterLocation(districtId, '', '').subscribe({
        next: (response: any) => {
          this.locations = response.data;
        }})
    }
    else 
      this.locations = [];
  }

editStore() {
  if (this.editStoreForm.valid) {
    this.toast.show({ type: 'success', message: 'Store updated successfully!' });
  } else {
    this.editStoreForm.markAllAsTouched();
    console.log('Invalid', this.editStoreForm.value);
  }
}
allowOnlyNumbers(event: KeyboardEvent) {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
}
