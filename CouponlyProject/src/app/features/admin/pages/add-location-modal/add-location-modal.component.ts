import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, SpinnerComponent, ToastComponent, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { District } from '../../../../commons/models/district.model';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';

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
    ReactiveFormsModule,
    CommonModule,
    ButtonDirective, 
    SpinnerComponent
  ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.scss'
})
export class AddLocationModalComponent implements OnInit{

  locationForm!: FormGroup;
  districts: District[] = [];
  @Output() locationAdded = new EventEmitter<Location>();
  @ViewChild('closeButton') closeButton!: ElementRef;
  isLoading: boolean = false;
  
  constructor(private fb: FormBuilder, private toastService: ToastService, private locationApi: LocationService) {
  }
  ngOnInit(): void {
    this.locationForm = this.fb.group({
      district: ['', Validators.required],
      locationName: ['', [Validators.required, Validators.minLength(3)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      latitude: ['', [Validators.required, Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/)]],
    });

    this.fetchDistrict();
  }

  fetchDistrict(): void {
    this.locationApi.fetchDistrict()
    .subscribe({
      next: (data) => this.districts = data.data || [],
      error: (err) => console.error('Error fetching districts:', err)
    })
  }

  get f() {
    return this.locationForm.controls;
  }

  closeModal(): void {
    // You can also call this method from anywhere
    this.closeButton.nativeElement.click();
  }

  save() {
    this.isLoading = !this.isLoading;
    if (this.locationForm.valid) {

      const formValue = {
      ...this.locationForm.value,
      districtId: Number(this.locationForm.value.district),
      pincode: Number(this.locationForm.value.pincode)
      };

      console.log(formValue);
      this.locationApi.addLocation(formValue)
        .subscribe({
          next: ({isSuccess, statusMessage}) => {
            if(isSuccess) {
              this.toastService.show({ type: 'success', message: 'Location added successfully' });
              this.locationForm.reset();
              this.isLoading = !this.isLoading;
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

}