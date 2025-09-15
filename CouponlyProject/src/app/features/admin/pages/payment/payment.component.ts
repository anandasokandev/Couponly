import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

   paymentForm: FormGroup;
  loading = false;
  showResult = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      cardholderName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });
  }

  startPayment() {
    this.loading = true;
    this.showResult = false;
  }

  handleResult(success: boolean) {
    this.loading = false;
    this.isSuccess = success;
    this.showResult = true;
  }

  navigate() {
    this.showResult = false;
    if (this.isSuccess) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/payment']);
    }
  }

}
