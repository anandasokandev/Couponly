import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, TableDirective } from '@coreui/angular';
import { IconComponent, IconModule } from '@coreui/icons-angular';
import { IconSubset } from '../../../../icons/icon-subset';
import { cilSortAlphaUp } from '@coreui/icons';
import { RedeemHistory } from 'src/app/commons/models/redeem-history.model';
import { FormsModule } from '@angular/forms';
import { FilterStorePipe } from 'src/app/commons/filters/filterstore.pipe';
import { FilteruserPipe } from 'src/app/commons/filters/filteruser.pipe';
import { FiltercouponcodePipe } from 'src/app/commons/filters/filtercouponcode.pipe';
import { FiltercouponnamePipe } from 'src/app/commons/filters/filtercouponname.pipe';

@Component({
  selector: 'app-redeem-history',
  imports: [
    CommonModule,
    ColComponent, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent, 
    TableDirective,
    IconModule,
    FilterStorePipe,
    FilteruserPipe,
    FiltercouponcodePipe,
    FiltercouponnamePipe,
    FormsModule
  ],
  templateUrl: './redeem-history.component.html',
  styleUrl: './redeem-history.component.scss'
})
export class RedeemHistoryComponent {

  // constructor (private redeemHistory: RedeemHistory){}
  icons = {cilSortAlphaUp}
  filterStores: string = ''
  filterUsers: string = ''
  filterCouponName: string = ''
  filterCouponCode: string = ''
  redeems: RedeemHistory[] = [

    { id: 1, couponCode: 'COUP101', couponName: 'XBGD', user: 'Ebin', store: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 2, couponCode: 'COUP102', couponName: 'dfdf', user: 'Parvathi', store: "Relience Thpzha", redeemDate: "2025-01-26 15:15:20" },
    { id: 3, couponCode: 'COUP103', couponName: 'vadfvf', user: 'Anand', store: "Relience Thpzha", redeemDate: "2025-01-26 15:15:20" },
    { id: 4, couponCode: 'COUP104', couponName: 'fdvdfvsfv', user: 'helen', store: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 5, couponCode: 'COUP105', couponName: 'dvarvare', user: 'Abhijith', store: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 6, couponCode: 'COUP106', couponName: 'dvarvare', user: 'Merlin', store: "Relience Thpzha", redeemDate: "2025-01-26 15:15:20" },
    { id: 7, couponCode: 'COUP107', couponName: 'dvarvare', user: 'Anumol', store: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 8, couponCode: 'COUP107', couponName: 'dvarvare', user: 'Gopika', store: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
  ]

  selectedStore: string = '';
  filteredData = [...this.redeems];
  
}
