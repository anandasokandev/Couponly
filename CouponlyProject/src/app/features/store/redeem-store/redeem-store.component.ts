import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, GridModule } from '@coreui/angular'; // Import CoreUI Card module
import { StoreService } from 'src/app/commons/services/Store/store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redeem-store',
  standalone: true,
  imports: [CommonModule, IconModule, CardModule,GridModule,FormsModule], 
  templateUrl: './redeem-store.component.html',
  styleUrls: ['./redeem-store.component.scss']
})
export class RedeemStoreComponent implements OnInit {

 coupons: any[] = [];
selectedCoupon: string = '';
storeId: number = Number(localStorage.getItem('storeId')) || 0; // fallback to 0 if null

constructor(private storeService: StoreService) {}

ngOnInit(): void {
  if (this.storeId > 0) {
    this.storeService.FetchStoreRedeem(this.storeId).subscribe({
      next: (res) => {
        this.coupons = res;
      },
      error: (err) => {
        console.error('Error fetching coupons:', err);
      }
    });
  } else {
    console.warn('Invalid storeId from localStorage');
  }
}
}