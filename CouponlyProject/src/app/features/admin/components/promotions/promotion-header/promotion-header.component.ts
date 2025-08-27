import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CardModule, NavModule } from '@coreui/angular';

@Component({
  selector: 'app-promotion-header',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CardModule, NavModule],
  templateUrl: './promotion-header.component.html',
  styleUrls: ['./promotion-header.component.scss']
})
export class PromotionHeaderComponent {

}
