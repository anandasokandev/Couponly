import { Component } from '@angular/core';
import { CardModule, NavModule } from '@coreui/angular';

@Component({
  selector: 'app-counts-tabs',
   imports: [ CardModule, NavModule],
  templateUrl: './counts-tabs.component.html',
  styleUrl: './counts-tabs.component.scss'
})
export class CountsTabsComponent {

}
