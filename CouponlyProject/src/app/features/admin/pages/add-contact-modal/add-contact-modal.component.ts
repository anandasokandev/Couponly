import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';

@Component({
  selector: 'app-add-contact-modal',
  imports: [ ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    FormDirective,
    FormLabelDirective,
    ModalFooterComponent,
    CommonModule,
    ModalFooterComponent,
    ButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.scss'
})
export class AddContactModalComponent {
 contactForm: FormGroup;

  constructor(private fb: FormBuilder, private toastService: CustomToastService,private contactService: ContactService) {
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],
      PhoneNumber: ['', [ Validators.required, Validators.pattern(/^[6-9]\d{9}$/) ]],
      Email: ['', [Validators.required, Validators.email]]
    });
  }

  createContact() {
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    this.toastService.show('❌ Please correct the errors before submitting.');
    return;
  }

  const contactData = this.contactForm.value;

  this.contactService.addContact(contactData).subscribe({
    next: (response : any) => {
      this.toastService.show('✅ Contact created successfully!', 'success');
     
      // console.log(this.contactService);

      this.contactForm.reset(); // Optional: clear the form
    },
    error: (err) => {
      console.error('Error creating contact:', err);
      // console.log(this.contactService);
      this.toastService.show('❌ Failed to create contact.', 'danger');
    }
  });
}

  validateNameInput(event: KeyboardEvent): void {
  const inputChar = event.key;

  // Block non-letter characters
  if (!/^[a-zA-Z\s]*$/.test(inputChar)) {
    event.preventDefault();
  }
}

validatePhoneInput(event: KeyboardEvent): void {
  const inputChar = event.key;
  const currentValue = this.contactForm.get('phone')?.value || '';

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