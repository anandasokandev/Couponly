import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

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
constructor(private fb: FormBuilder) {
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
