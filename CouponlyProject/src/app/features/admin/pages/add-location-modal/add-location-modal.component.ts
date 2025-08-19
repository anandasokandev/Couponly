import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective, ModalBodyComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, ToastComponent, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { CustomToastService } from '../../../../commons/services/custom-toast.service';
import { LocationService } from 'src/app/commons/services/Admin/location.service';
import { District } from 'src/app/commons/models/district.model';
import { CommonModule, NgClass } from '@angular/common';

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

  locationForm: FormGroup;
  districts: District[] = [];

  constructor(private fb: FormBuilder, private toastService: CustomToastService, private locationApi: LocationService) {
    this.locationForm = this.fb.group({
      district: ['', Validators.minLength(2)],
      locationName: ['', Validators.minLength(4)],
      pincode: ['',[Validators.required, Validators.minLength(6)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.fetchDistrict();
  }

  fetchDistrict(): void {
    this.locationApi.fetchDistrict()
    .subscribe({
      next: (data) => this.districts = data.data || [],
      error: (err) => console.error('Error fetching districts:', err)
    })
  }
  save() {
    if (this.locationForm.valid) {
      this.toastService.show('✅ Location Created Successfully', 'success');
      console.log(this.locationForm.value);
    }
  }

}
