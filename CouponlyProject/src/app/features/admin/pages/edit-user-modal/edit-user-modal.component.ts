import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonCloseDirective,
  ButtonDirective,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ModalToggleDirective
} from '@coreui/angular';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ButtonDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ModalToggleDirective
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.scss'
})
export class EditUserModalComponent {
  @Input() user: any = null;
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  localUser: any = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.localUser = { ...this.user };
    }
  }

  saveChanges() {
    if (this.user && this.localUser) {
      Object.assign(this.user, this.localUser);
      this.save.emit();
    }
  }
}
