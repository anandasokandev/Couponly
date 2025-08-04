import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-contact-modal',
  standalone:true,
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
    CommonModule,
    ReactiveFormsModule
   ],
  templateUrl: './edit-contact-modal.component.html',
  styleUrl: './edit-contact-modal.component.scss'
})
export class EditContactModalComponent {
  editContactForm: FormGroup;

  constructor(private fb: FormBuilder , private toastService: CustomToastService) {
    this.editContactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  createContacts() {
    if (this.editContactForm.invalid) {
      this.editContactForm.markAllAsTouched();
      this.toastService.show('❌ Please correct the errors before submitting.');
      return;
    }

    // Save logic can go here
    console.log(this.editContactForm.value);
    this.toastService.show('✅ Contact created successfully!', 'success');
  }

  validateNameInputs(event: KeyboardEvent): void {
  const inputChar = event.key;

  // Block non-letter characters
  if (!/^[a-zA-Z\s]*$/.test(inputChar)) {
    event.preventDefault();
  }
}

validatePhoneInputs(event: KeyboardEvent): void {
  const inputChar = event.key;
  const currentValue = this.editContactForm.get('phone')?.value || '';

  // Only allow digits
  if (!/^\d$/.test(inputChar)) {
    event.preventDefault();
    return;
  }

  // First digit must be 6–9
  if (currentValue.length === 0 && !/[6-9]/.test(inputChar)) {
    event.preventDefault();
    return;
  }

  // Max 10 digits
  if (currentValue.length >= 10) {
    event.preventDefault();
  }
}


  
}