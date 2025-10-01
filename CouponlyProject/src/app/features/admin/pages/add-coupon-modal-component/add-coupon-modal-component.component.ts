import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent, ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-add-coupon-modal-component',
  standalone: true,
  imports: [ModalModule,CommonModule,ModalComponent],
  templateUrl: './add-coupon-modal-component.component.html',
  styleUrl: './add-coupon-modal-component.component.scss'
})
export class AddCouponModalComponentComponent {

}
