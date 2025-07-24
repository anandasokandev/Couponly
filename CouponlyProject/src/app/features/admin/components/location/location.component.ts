import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  TableDirective
} from '@coreui/angular';

@Component({
  selector: 'app-location',
  imports: [CommonModule,FormCheckComponent,FormCheckInputDirective, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locations = [
    { district: 'District 1', location: 'Loc A', pincode: '123' },
    { district: 'District 1', location: 'Loc B', pincode: '124' },
    { district: 'District 1', location: 'Loc C', pincode: '125' },
    { district: 'District 2', location: 'Loc D', pincode: '126' },
    { district: 'District 2', location: 'Loc E', pincode: '127' },
  ]

  shouldShowDistrict(index: number): boolean {
    if (index === 0) return true;
    return this.locations[index].district !== this.locations[index - 1].district;
  }

  getDistrictRowspan(index: number): number {
    const district = this.locations[index].district;
    return this.locations.filter(l => l.district === district).length;
  }
}
