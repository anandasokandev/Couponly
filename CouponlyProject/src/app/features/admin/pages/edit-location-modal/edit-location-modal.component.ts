import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';
import { Location } from '../../../../commons/models/location.model';

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
  @Input() location: Location | null = null;
  @Output() locationUpdated = new EventEmitter<Location>();
  @Output() modalClosed = new EventEmitter<void>();

  districts: District[] = [];

  @ViewChild('closeButton') closeButton!: ElementRef;
  
  // Create a working copy of the location to avoid direct mutation
  editLocation: Location | null = null;

  constructor(private locationApi: LocationService) {
    console.log(this.location);
    
  }

  ngOnInit() {
    this.fetchDistrict();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      // Create a deep copy to avoid mutating the original location
      this.editLocation = { ...this.location };
    }
  }
  
  fetchDistrict(): void {
    this.locationApi.fetchDistrict()
      .subscribe({
        next: (data) => this.districts = data.data || [],
        error: (err) => console.error('Error fetching districts:', err)
      });
  }

  onSave(): void {
    if (this.editLocation) {
      // Call the API to update the location
      // this.locationApi.updateLocation(this.editableLocation)
      //   .subscribe({
      //     next: (updatedLocation) => {
      //       this.locationUpdated.emit(updatedLocation);
      //       this.closeModal();
      //     },
      //     error: (err) => console.error('Error updating location:', err)
      //   });

      console.log(this.editLocation);
      this.closeModal();     
    }
  }


  closeModal(): void {
    // You can also call this method from anywhere
    this.closeButton.nativeElement.click();
  }

  // Helper method to get district name by ID
  getDistrictName(districtId: number): string {
    const district = this.districts.find(d => d.id === districtId);
    return district ? district.districtName : '';
  }
}
