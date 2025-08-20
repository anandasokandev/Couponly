import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';

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

  constructor(private locationApi: LocationService) {}

  districts: District[] = [];

  ngOnInit() {
    this.fetchDistrict();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      this.selectedDistrict = this.location.districtName;
    }

    console.log(this.selectedDistrict);
  }
  
  fetchDistrict(): void {
    this.locationApi.fetchDistrict()
      .subscribe({
        next: (data) => this.districts = data.data || [],
        error: (err) => console.error('Error fetching districts:', err)
      });
  }
}
