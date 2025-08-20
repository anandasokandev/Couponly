import { Component, inject, OnInit } from '@angular/core';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ToastComponent, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';
import { CommonModule, NgClass } from '@angular/common';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ToastComponent, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { CommonModule } from '@angular/common';
import { District } from '../../../../commons/models/district.model';
import { LocationService } from '../../../../commons/services/Admin/location.service';

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
    CommonModule
  ],
  templateUrl: './add-location-modal.component.html',
  styleUrl: './add-location-modal.component.scss'
})
export class AddLocationModalComponent implements OnInit{

  locationForm!: FormGroup;
  districts: District[] = [];
  private toast = inject(ToastService);
  constructor(private fb: FormBuilder, private locationApi: LocationService) {
  @Output() locationAdded = new EventEmitter<Location>();
  
  constructor(private fb: FormBuilder, private toastService: CustomToastService, private locationApi: LocationService) {
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

  save() {
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
              this.toastService.show('✅ Location created successfully', 'success');
              this.locationForm.reset();

              this.locationAdded.emit();

            } else {
              this.toastService.show(`❌, ${statusMessage}`, 'danger');
            }
          },
          error: (err) => {
            console.error('Error creating location:', err);
            this.toastService.show('❌', 'danger');
          }
        });
      this.toast.show({ type: 'success', message: 'Location Created Successfully' });
      console.log(this.locationForm.value);
    }
  }

}
