import { Component, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { OnChanges, SimpleChanges } from '@angular/core';


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
  @Input() contactToEdit: any;

  editContactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: CustomToastService,
    private contactService: ContactService
  ) {
    this.editContactForm = this.fb.group({
      Name: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      Email: ['', [Validators.required, Validators.email]]
    });
  }

ngOnChanges(changes: SimpleChanges): void {
  if (changes['contactToEdit'] && this.contactToEdit) {
    this.editContactForm.patchValue({
      Name: this.contactToEdit.name,
      PhoneNumber: this.contactToEdit.phoneNumber,
      Email: this.contactToEdit.email
    });
  }
}


createContacts() {
  if (this.editContactForm.invalid) {
    this.editContactForm.markAllAsTouched();
    this.toastService.show('❌ Please correct the errors before submitting.');
    return;
  }

  const contactData = this.editContactForm.value;

  if (this.contactToEdit?.id) {
    // Edit mode
    this.contactService.updateContact(this.contactToEdit.id, contactData).subscribe({
   
  next: (response) => {
    console.log('Update response:', response);  // Check response here
    this.toastService.show('✅ Contact updated successfully!', 'success');

    
    


  },
  error: (error) => {
    console.error('Error updating contact:', error);  // Log the error for more details
    this.toastService.show('❌ Failed to update contact.', 'danger');
  }
});
}
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
  const currentValue = this.editContactForm.get('PhoneNumber')?.value || '';

  // Only allow digits
  if (!/^\d$/.test(inputChar)) {
    event.preventDefault();
    return;
  }


  // Max 10 digits
  if (currentValue.length >= 10) {
    event.preventDefault();
  }
}


  
}