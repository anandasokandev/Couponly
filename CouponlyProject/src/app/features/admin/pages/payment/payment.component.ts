import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../../commons/services/Store/store.service';

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
  token :string='';

  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute,private api: StoreService) {
    this.paymentForm = this.fb.group({
      cardholderName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });
  }

  ngOnInit(){
       this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token') || '';
      if (this.token) {
        this.verifyToken(this.token);
      } else {
        this.router.navigate(['/404']);
      }
    });
  }
  private verifyToken(token: string): void {
    this.api.verifyPaymentToken( token ).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          
          console.log(res)
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: () => this.router.navigate(['/404'])
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
