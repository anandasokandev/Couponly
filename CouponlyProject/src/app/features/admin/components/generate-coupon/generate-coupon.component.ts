import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@coreui/angular';
import { CouponService } from 'src/app/commons/services/Coupon/coupon.service';
import { ToastService } from 'src/app/commons/services/Toaster/toast.service';
import { Coupon, CouponType } from 'src/app/commons/models/coupon.model' 

@Component({
  selector: 'app-generate-coupon',
  standalone: true,   // mark as standalone component
  imports: [
    CommonModule,
    FormsModule,        // ✅ required for ngModel
    ReactiveFormsModule,
    FormModule
  ],
  templateUrl: './generate-coupon.component.html',
  styleUrls: ['./generate-coupon.component.scss']  // ✅ plural
})
export class GenerateCouponComponent implements OnInit {
  activeTab: string = 'upload';
  previewImage: string | ArrayBuffer | null = null;
  aiImage: string | null = null;
  couponTypeList: CouponType [] = [];
  isUserLimit: boolean = false;

  coupon: Coupon = {
    title: '',
    description: '',
    code: '',
    couponType: null,
    discount: null,
    minimumAmount: null,
    userLimit: 1,
    validFrom: '',
    validUntil: ''
  };

  constructor(private couponApi: CouponService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.couponApi.getCouponType().subscribe({
      next: (data) => {
        if(data.isSuccess){
          console.log(data);
          this.couponTypeList = data.data;
        }
      },
      error: (err) => {
        this.toastService.show({ type: 'error', message: `Failed to load coupon types` });
      }
    });
  }

  ngOnChange(): void {
    console.log(this.coupon.couponType);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewImage = e.target?.result ?? null;
      reader.readAsDataURL(file);
    }
  }

  generateAICoupon() {
    this.aiImage = 'https://via.placeholder.com/400x200.png?text=AI+Generated+Coupon';
  }

  saveCoupon() {
    console.log('Saving Coupon:', this.coupon);
    alert('Coupon Saved Successfully!');
  }
}
