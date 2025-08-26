import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@coreui/angular';

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
export class GenerateCouponComponent {
  activeTab: string = 'upload';
  previewImage: string | ArrayBuffer | null = null;
  aiImage: string | null = null;

  coupon = {
    title: '',
    description: '',
    code: '',
    discount: null as number | null,
    validFrom: '',
    validUntil: ''
  };

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
