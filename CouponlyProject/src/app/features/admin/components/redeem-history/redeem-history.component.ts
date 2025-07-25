import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, TableDirective } from '@coreui/angular';
import { IconComponent, IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-redeem-history',
  imports: [
    CommonModule,
    ColComponent, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent, 
    TableDirective,
    IconModule
  ],
  templateUrl: './redeem-history.component.html',
  styleUrl: './redeem-history.component.scss'
})
export class RedeemHistoryComponent {
  redeems = [
    { couponcode: 'COUP101', couponname: 'XBGD', user: 'Ebin', store: "More Koothattkulam", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP102', couponname: 'dfdf', user: 'Parvathi', store: "Relience Thpzha", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP103', couponname: 'vadfvf', user: 'Anand', store: "Relience Thpzha", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP104', couponname: 'fdvdfvsfv', user: 'helen', store: "More Koothattkulam", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP105', couponname: 'dvarvare', user: 'Abhijith', store: "More Koothattkulam", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP106', couponname: 'dvarvare', user: 'Merlin', store: "Relience Thpzha", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP107', couponname: 'dvarvare', user: 'Anumol', store: "More Koothattkulam", redeemdate: "2025-01-26 15:15:20" },
    { couponcode: 'COUP107', couponname: 'dvarvare', user: 'Gopika', store: "More Koothattkulam", redeemdate: "2025-01-26 15:15:20" },
  ]

  selectedStore: string = '';
  filteredData = [...this.redeems];

  onStoreChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedStore = selectedValue;

    if (selectedValue === '') {
      this.filteredData = [...this.redeems]; // Show all
    } else {
      this.filteredData = this.redeems.filter(item => item.store === selectedValue);
    }
  }
  
}
