import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';

@Component({
  selector: 'app-redeem-store-demo',
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent
  ],
  templateUrl: './redeem-store-demo.component.html',
  styleUrl: './redeem-store-demo.component.scss'
})
export class RedeemStoreDemoComponent {

}
