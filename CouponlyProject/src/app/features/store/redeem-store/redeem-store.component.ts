import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { CardBodyComponent, CardComponent, CardHeaderComponent, CardModule, ColComponent, GridModule, RowComponent } from '@coreui/angular'; // Import CoreUI Card module
import { StoreService } from '../../../commons/services/Store/store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redeem-store',
  standalone: true,
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent
  ], 
  templateUrl: './redeem-store.component.html',
  styleUrls: ['./redeem-store.component.scss']
})
export class RedeemStoreComponent implements OnInit {

  coupons: any[] = [];
  selectedCoupon: string = '';
  storeId: any = null ; 

  constructor(private storeService: StoreService) {} 

  ngOnInit(): void {
    this.storeId = sessionStorage.getItem('storeId');
    console.log('StoreId',this.storeId)
    this.storeService.FetchStoreRedeem(this.storeId).subscribe({
      next: (res) => {
        this.coupons = res.data;
      },
      error: (err) => {
        console.error('Error fetching coupons:', err);
      }
    });
  }



selectedCouponImage: string | null = null;


updateSelectedCouponImage(): void {
  const selected = this.coupons.find(c => c.couponId === this.selectedCoupon);
  this.selectedCouponImage = selected?.imageUrl || null;
}

}