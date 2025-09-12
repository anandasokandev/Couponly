import { Component, OnInit } from '@angular/core';
import { CardModule, NavModule } from '@coreui/angular';
import { StoreDashboardService } from '../../../../../commons/services/StoreDashboard/store-dashboard.service';

@Component({
  selector: 'app-counts-tabs',
  imports: [CardModule, NavModule],
  templateUrl: './counts-tabs.component.html',
  styleUrl: './counts-tabs.component.scss'
})
export class CountsTabsComponent implements OnInit {
  overviewData: any;

  constructor(private storeDashboardService: StoreDashboardService) { }

  ngOnInit(): void {
    this.storeDashboardService.getStoreOverview().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.overviewData = response.data;
        }
      },
      error: (err) => {
        console.error('Failed to fetch store overview:', err);
      }
    });
  }
}