import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ToastComponent, ToasterComponent, ToasterPlacement } from '@coreui/angular';

@Component({
  selector: 'app-add-location-modal',
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
    ButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.scss'
})
export class AddLocationModalComponent {

  locationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      district: ['', Validators.minLength(2)],
      locationName: ['', Validators.minLength(4)],
      pincode: ['',[Validators.required, Validators.minLength(6)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }

  save() {
    if (this.locationForm.valid) {
      console.log(this.locationForm.value);
    }
  }

}
