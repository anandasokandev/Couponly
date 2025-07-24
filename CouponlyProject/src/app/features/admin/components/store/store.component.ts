import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TableDirective } from '@coreui/angular';

@Component({
  selector: 'app-store',
  imports: [  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableDirective,
  ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent
],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  standalone: true
})
export class StoreComponent {

}
