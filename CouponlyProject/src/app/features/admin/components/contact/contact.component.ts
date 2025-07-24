import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, TableActiveDirective, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-contact',
  imports: [ColComponent,CardComponent,CardHeaderComponent,CardBodyComponent,TableDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
