import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, GridModule } from '@coreui/angular'; // Import CoreUI Card module
import { StoreService } from '../../../commons/services/Store/store.service';
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
}