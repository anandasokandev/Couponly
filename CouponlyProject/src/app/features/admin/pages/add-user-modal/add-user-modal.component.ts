import { Component } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective,
   FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent,
   ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
@Component({
  selector: 'app-add-user-modal',
  imports: [
    ModalComponent,
    ModalToggleDirective,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss'
})
export class AddUserModalComponent {

}
