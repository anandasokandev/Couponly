import { Component } from '@angular/core';

import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableDirective
} from '@coreui/angular';

@Component({
  selector: 'app-location',
  imports: [ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

}
