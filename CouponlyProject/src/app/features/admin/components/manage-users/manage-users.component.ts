import { Component } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableDirective
} from '@coreui/angular';

@Component({
  selector: 'app-manage-users',
  imports: [ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {

}
