import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardHeaderComponent, CardModule, FormModule, GridModule, InputGroupComponent, ModalBodyComponent, ModalComponent, ModalDialogComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

@Component({
  selector: 'app-ai-image-modal',
  imports: [
    CardBodyComponent,
    CardHeaderComponent,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    InputGroupComponent,
    GridModule,
    FormModule,
    CommonModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './ai-image-modal.component.html',
  styleUrl: './ai-image-modal.component.scss'
})
export class AiImageModalComponent {

  public generationMethod: 'prompt' | 'default' = 'prompt';
}
