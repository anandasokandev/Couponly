import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CardModule, NavModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreDashboardService } from '../../../../../commons/services/StoreDashboard/store-dashboard.service'; 

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CardModule, NavModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  storeData: any;
 isLoading = true;

  constructor(
    public router: Router,
    private storeDashboardService: StoreDashboardService
  ) {}

  shouldShowStoreCard(): boolean {
    return !this.router.url.includes('/store-dashboard/store-info');
  }


ngOnInit(): void {
  const token = localStorage.getItem('token');
  // console.log('Token in header:', token); // ✅ Confirm token is available

  this.storeDashboardService.getStoreInfo().subscribe({
    next: (res) => {
      // console.log('Store Info API response:', res); // ✅ Log full response
      if (res?.isSuccess) {
        this.storeData = res.data;
        // console.log('Store data:', this.storeData); // ✅ Should show full store info
      }
      this.isLoading = false;
    },
    error: (err) => {
      // console.error('Error fetching store info:', err);
      this.isLoading = false;
    }
  });
}

 

}







 




