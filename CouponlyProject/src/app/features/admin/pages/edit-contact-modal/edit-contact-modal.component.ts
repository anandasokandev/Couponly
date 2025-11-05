import { Component, ElementRef, inject, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { OnChanges, SimpleChanges } from '@angular/core';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


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
  @Output() contactUpdated = new EventEmitter<void>();
  @Input() contactToEdit: any;

  editContactForm: FormGroup;
  private toast = inject(ToastService);
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.editContactForm = this.fb.group({
      Name: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      Email: ['', [Validators.required, Validators.email, strictEmailValidator]]
    });
  }

ngOnChanges(changes: SimpleChanges): void {
  console.log(this.contactToEdit)
  if (changes['contactToEdit'] && this.contactToEdit) {
    this.editContactForm.patchValue({
      Name: this.contactToEdit.name,
      PhoneNumber: this.contactToEdit.phoneNumber,
      Email: this.contactToEdit.email
    });
  }
}

 isValidEmail(email: string): boolean {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailPattern.test(email);
  }



@ViewChild('closeButton') closeButton!: ElementRef;


closeModal(): void {
    // You can also call this method from anywhere
    this.closeButton.nativeElement.click();
  }

createContacts() {
  
    console.log(this.contactToEdit?.id)
  if (this.editContactForm.invalid) {
    this.editContactForm.markAllAsTouched();
    this.toast.show({ type: 'error', message: 'Please correct the errors before submitting.' });
    return;
  }

  const contactData = this.editContactForm.value;

  if (this.contactToEdit?.id) {
    // Edit mode
    this.contactService.updateContact(this.contactToEdit.id, contactData).subscribe({
   
  next: (response) => {
    console.log('Update response:', response);  // Check response here
    this.toast.show({ type: 'success', message: 'Contact updated successfully!' });
    this.contactUpdated.emit();
    this.closeModal(); 
    

  },
  error: (error) => {
    console.error('Error updating contact:', error);  // Log the error for more details
    this.toast.show({ type: 'error', message: 'Failed to update contact.' });
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

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email) return null;

  // Allow only gmail.com, gmail.in, gmail.org
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.(com|org|in)$/i;

  return emailRegex.test(email) ? null : { strictEmail: true };
}

