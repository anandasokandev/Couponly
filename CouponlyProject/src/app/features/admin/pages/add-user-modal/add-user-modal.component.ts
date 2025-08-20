
import { Component, inject, ViewChild } from '@angular/core';
import {
  ButtonCloseDirective, ButtonDirective, FormControlDirective,
  FormLabelDirective, ModalBodyComponent, ModalComponent,
  ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective,
  ModalToggleDirective
} from '@coreui/angular';

import { AddUserDTO } from '../../../../commons/models/adduser.module';
import { UserService } from '../../../../commons/services/Users/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';


@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    CommonModule,
    ReactiveFormsModule,
    ModalComponent
  ],
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent {

  @ViewChild('verticallyCenteredScrollableModal') modal?: ModalComponent;

  userForm: FormGroup;
  private toast = inject(ToastService);
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) 
  {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
     phoneNumber: ['', [
    Validators.required,
    Validators.pattern(/^\d{10}$/)
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(100),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
  ]],
      type: ['', Validators.required],
      statusId: [6]
    });
  }

  resetForm() {
    this.userForm.reset({
      type: '',
      statusId: 6
    });
  }

  createUser() {
  if (this.userForm.invalid) {
    this.toast.show({ type: 'warning', message: 'Please fill all required fields.' });
    return;
  }

  this.userService.addUser(this.userForm.value).subscribe({
    next: (res) => {
      // This block will only run if the backend returns a 2xx status
      if (res.isSuccess) {
        this.toast.show({ type: 'success', message: 'User created successfully!' });
        document.getElementById('verticallyCenteredScrollableModal')?.click();
        setTimeout(() => window.location.reload(), 500);
      } else {
        // Optional: handle unexpected non-error responses
        this.toast.show({ type: 'warning', message: res.statusMessage });
      }
    },
    error: (err) => {
      // This block handles 4xx/5xx errors like 409 Conflict
      const errorMsg = err.error?.errors?.[0]?.toLowerCase();

      if (errorMsg?.includes('email') && errorMsg?.includes('phone')) {
        this.toast.show({ type: 'error', message: '📧📱 Email and phone number already exist.' });
      } else if (errorMsg?.includes('email')) {
        this.toast.show({ type: 'error', message: '📧 Email already exists.' });
      } else if (errorMsg?.includes('phone')) {
        this.toast.show({ type: 'error', message: '📱 Phone number already exists.' });
      } else {
        this.toast.show({ type: 'error', message: '❌ Error adding user!' });
      }
    }
  });
}

}
