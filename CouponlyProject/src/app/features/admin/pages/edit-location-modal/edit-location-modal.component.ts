import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';

interface District {
  value: string;
  name: string;
}

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
    ButtonDirective,
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-location-modal.component.html',
  styleUrl: './edit-location-modal.component.scss'
})
export class EditLocationModalComponent {
  @Input() location: any = null;
  selectedDistrict: string = '';

  districts: District[] = [
    { value: 'Alappuzha', name: 'Alappuzha' },
    { value: 'Ernakulam', name: 'Ernakulam' },
    { value: 'Idukki', name: 'Idukki' },
    { value: 'Kasaragod', name: 'Kasaragod' },
    { value: 'Kannur', name: 'Kannur' },
    { value: 'Kollam', name: 'Kollam' },
    { value: 'Kottayam', name: 'Kottayam' },
    { value: 'Kozhikode', name: 'Kozhikode' },
    { value: 'Malappuram', name: 'Malappuram' },
    { value: 'Palakkad', name: 'Palakkad' },
    { value: 'Pathanamthitta', name: 'Pathanamthitta' },
    { value: 'Thiruvananthapuram', name: 'Thiruvananthapuram' },
    { value: 'Thrissur', name: 'Thrissur' },
    { value: 'Wayanad', name: 'Wayanad' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      this.selectedDistrict = this.location.district;
    }
  }

}
