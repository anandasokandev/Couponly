import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from 'src/app/commons/services/Store/store.service';
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

constructor(private toastService: CustomToastService,private fb: FormBuilder,private api:StoreService) {}


ngOnInit(){
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

allowOnlyNumbers(event: KeyboardEvent) {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

createStore() {
  if (this.addStoreForm.valid) {
    this.toastService.show('Store created successfully!', 'success');
    this.addStoreForm.reset();
  } else {
    this.addStoreForm.markAllAsTouched();
    console.log('Invalid', this.addStoreForm.value);
  }
}

resetForm() {
  this.addStoreForm.reset();
}
}
