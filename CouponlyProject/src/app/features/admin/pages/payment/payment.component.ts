import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../../commons/services/Store/store.service';
import { PromotionService } from '../../../../commons/services/Promotion/promotion.service';


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

  token: string = '';
  promotionId: number = 0;
  totalAmount: number = 0;
  isPaid=false;
  isTokenInvalid=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private api: StoreService,
    private paymentapi: PromotionService,
  ) {
    this.paymentForm = this.fb.group({
      cardholderName: ['', [Validators.required, this.cardholderNameValidator]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, this.expiryMonthValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token') || '';

      if (this.token) {
        this.verifyToken(this.token);
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  // Validate cardholder name: starts with capital, only letters/spaces
  cardholderNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[A-Z][a-zA-Z\s]*$/;
    return regex.test(value) ? null : { invalidCardholderName: true };
  }

  //  Validate expiry: format YYYY-MM, future date, valid month/year
  expiryMonthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value || !/^\d{4}-\d{2}$/.test(value)) {
      return { invalidFormat: true };
    }

    const [yearStr, monthStr] = value.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    if (yearStr.length !== 4 || year < 1000 || year > 9999) {
      return { invalidYear: true };
    }

    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }

    const now = new Date();
    const selected = new Date(year, month - 1);
    const current = new Date(now.getFullYear(), now.getMonth());

    return selected > current ? null : { expired: true };
  }

  //  Verify token from query params
  private verifyToken(token: string): void {
    this.api.verifyPaymentToken(token).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          if (!res.data.isPaymentSuccess) {
            this.totalAmount = res.data.totalAmount;
            this.promotionId = res.data.promotionId;
          } else {
            this.isPaid = res.data.isPaymentSuccess
          }
        } else {
          console.log('INVALID')
          this.isTokenInvalid=true;
        }
      }
    });
  }

  // Start payment only if form is valid
  startPayment(): void {
    if (this.paymentForm.valid) {
      this.loading = true;
      this.showResult = false;
      
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  //  Handle result after payment attempt
  handleResult(success: boolean): void {
    this.loading = false;
    this.isSuccess = success;
    this.showResult = true;
  }

  //  Navigate based on payment result
  navigate(): void {
  this.showResult = false;
  const payload = {
  PromotionId: this.promotionId,
  TotalAmount: this.totalAmount,
  Status: this.isSuccess
};
this.paymentapi.Payment(payload).subscribe({
  next: (res: boolean) => {

    const paymentWebhookdata= {
      PromotionId: this.promotionId,
      PaymentStatus: res ? 1 : 2
    }
    if (res === true) {
      this.handleResult(true); 
    } else {
      this.handleResult(false); 
    }
  },
  error: (err) => {
    console.error('Payment API error:', err);
    this.handleResult(false); // Treat error as failure
  }
});

  if (this.isSuccess) {
    this.router.navigate(['/home']);
  } else {
    this.paymentForm.reset();
    window.location.reload(); 
  }
}

  //  Restrict input to letters and spaces
  allowOnlyLetters(event: KeyboardEvent): void {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-Z\s]$/.test(char)) {
      event.preventDefault();
    }
  }

  //  Restrict input to numbers only
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
