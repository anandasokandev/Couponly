import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgotPasswordService } from '../../../commons/services/Authentication/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message: string = '';
  isError: boolean = false;

  constructor(private fb: FormBuilder, private forgotService: ForgotPasswordService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotForm.invalid) {
      this.message = 'Please enter a valid email.';
      this.isError = true;
      return;
    }

    const payload = this.forgotForm.value;

    this.forgotService.forgotPassword(payload).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.message = res.message || 'Password reset email sent successfully.';
          this.isError = false;
        } else {
          this.message = res.message || 'Failed to send reset email.';
          this.isError = true;
        }
      },
      error: (err) => {
        console.error(err);
        this.message = 'Something went wrong.';
        this.isError = true;
      }
    });
  }
}
