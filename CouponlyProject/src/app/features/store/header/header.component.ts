
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StoreDashboardService } from '../../../commons/services/StoreDashboard/store-dashboard.service';
import { filter, Subscription } from 'rxjs';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CardModule, NavModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CardModule,
    NavModule,
    CommonModule
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  storeData: any;
  isLoading = true;
  hideNavContainer = false;
  routerSubscription: Subscription | undefined;

  constructor(
    public router: Router,
    private storeDashboardService: StoreDashboardService
  ) {}

  ngOnInit(): void {
    this.updateNavContainerVisibility(this.router.url);

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavContainerVisibility(this.router.url);
      });

    this.storeDashboardService.getStoreInfo().subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.storeData = res.data;
          sessionStorage.setItem('StoreName', res.data.name);
          sessionStorage.setItem('StoreCat', res.data.categoryName);
          console.log('Store Data:', res.data);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private updateNavContainerVisibility(url: string): void {
    this.hideNavContainer = url.includes('/redeem-store');

    // this.hideNavContainer = sessionStorage.getItem('NavContainer') === 'true';
  }

  shouldShowStoreCard(): boolean {
    return !this.router.url.includes('/store-info');
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
