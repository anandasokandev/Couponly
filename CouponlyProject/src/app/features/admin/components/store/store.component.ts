import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-store',
  imports: [  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableDirective,
  
],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  standalone: true
})
export class StoreComponent {

}
