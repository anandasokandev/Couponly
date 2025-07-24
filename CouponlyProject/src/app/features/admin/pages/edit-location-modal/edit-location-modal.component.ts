import { Component, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

@Component({
  selector: 'app-edit-location-modal',
  imports: [
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective
  ],
  templateUrl: './edit-location-modal.component.html',
  styleUrl: './edit-location-modal.component.scss'
})
export class EditLocationModalComponent {
  @Input() location: any = null;
}
