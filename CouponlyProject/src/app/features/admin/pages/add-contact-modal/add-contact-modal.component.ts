import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../../commons/services/Contacts/contact.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


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
@Output() contactAdded = new EventEmitter<void>();


 contactForm: FormGroup;
  private toast = inject(ToastService);
  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],
      PhoneNumber: ['', [ Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/) ]],
      Email: ['', [Validators.required, Validators.email]]
    });
  }

   isValidEmail(email: string): boolean {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailPattern.test(email);
  }

  createContact() {
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    this.toast.show({ type: 'error', message: 'Please correct the errors before submitting.' });
    return;
  }



  const contactData = this.contactForm.value;

  this.contactService.addContact(contactData).subscribe({
    next: (response : any) => {
      this.toast.show({ type: 'success', message: 'Contact created successfully!' });

      // console.log(this.contactService);

      this.contactForm.reset(); 
      this.contactAdded.emit();
      
      this.closeModal(); 
    },
    error: (err) => {
      console.error('Error creating contact:', err);
      // console.log(this.contactService);
      this.toast.show({ type: 'error', message: 'Failed to create contact.' });
    }
  });
}


@ViewChild('closeButton') closeButton!: ElementRef;


closeModal(): void {
    // You can also call this method from anywhere
    this.closeButton.nativeElement.click();
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

 

  // Max 10 digits
  if (currentValue.length >= 10) {
    event.preventDefault();
  }
}
  
}