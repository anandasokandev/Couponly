import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from 'src/app/commons/services/custom-toast.service';
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

  editStoreForm: FormGroup;
constructor(private toastService: CustomToastService,private fb: FormBuilder) {
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

editStore() {
  if (this.editStoreForm.valid) {
    this.toastService.show('Store updated successfully!', 'success');
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
