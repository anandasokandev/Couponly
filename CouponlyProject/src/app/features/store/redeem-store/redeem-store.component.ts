import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { CardModule, GridModule } from '@coreui/angular'; // Import CoreUI Card module

@Component({
  selector: 'app-redeem-store',
  standalone: true,
  imports: [CommonModule, IconModule, CardModule,GridModule], 
  templateUrl: './redeem-store.component.html',
  styleUrls: ['./redeem-store.component.scss']
})
export class RedeemStoreComponent {}
