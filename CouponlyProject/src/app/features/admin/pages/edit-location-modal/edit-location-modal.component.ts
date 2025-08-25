import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';
import { Location } from '../../../../commons/models/location.model';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

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

  constructor(private locationApi: LocationService, private toastService: ToastService) {
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
      this.locationApi.editLocation(this.editLocation)
        .subscribe({
          next: ({isSuccess, statusMessage}) => {
            if(isSuccess) {
              this.toastService.show({ type: 'success', message: 'Location added successfully' });
              this.closeModal();
            } else {
              this.toastService.show({ type: 'error', message: 'Failed to add location' });
            }
          },
          error: (err) => {
            console.error('Error creating location:', err);
            this.toastService.show({ type: 'error', message: 'Error adding location' });
          }
        });
    }
  }


  closeModal(): void {
    this.closeButton.nativeElement.click();
  }

  // Helper method to get district name by ID
  getDistrictName(districtId: number): string {
    const district = this.districts.find(d => d.id === districtId);
    return district ? district.districtName : '';
  }
}
