import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddLocationModalComponent } from '../../pages/add-location-modal/add-location-modal.component';
import { EditLocationModalComponent } from '../../pages/edit-location-modal/edit-location-modal.component';

import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  ModalComponent,
  ModalToggleDirective,
  TableDirective
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cilSortAlphaUp, cilSortAlphaDown } from '@coreui/icons';
import { Location } from '../../../../commons/models/location.model';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';

type SortDirection = '' | 'asc' | 'desc';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    AddLocationModalComponent,
    EditLocationModalComponent,
    IconModule
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  constructor(private locationApi: LocationService) { }

  districts: District[] = [];
  locations: Location[] = [];
  filteredLocations: Location[] = [];

  locationFilter = '';
  selectedDistrict: number | null = null;
  pincodeFilter = '';
  locationSortDirection: SortDirection = '';
  selectedLocation: Location | null = null;
  icons = { cilSortAlphaUp, cilSortAlphaDown };

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  pagedLocations: Location[] = [];

  ngOnInit(): void {
    this.fetchDistrict();
    this.fetchLocation();
  }

  fetchLocation(): void {
    this.locationApi.fetchLocation(this.currentPage, this.pageSize, this.pageSize)
      .subscribe({
        next: (data) => {
          this.locations = data.data.items || [];
          this.filteredLocations = [...this.locations];
          this.calculatePagination();
        },
        error: (err) => console.error('Error fetching locations:', err)
      });
  }

  fetchDistrict(): void {
    this.locationApi.fetchDistrict()
      .subscribe({
        next: (data) => this.districts = data.data || [],
        error: (err) => console.error('Error fetching districts:', err)
      });
  }

  filterLocation(): void {
    const location = this.locationFilter || '';
    const pincode = this.pincodeFilter || '';

    const districtId = (this.selectedDistrict && this.selectedDistrict > 0) ? this.selectedDistrict : null;
    this.locationApi.filterLocation(districtId, this.locationFilter || '', this.pincodeFilter || '')
      .subscribe({
        next: (data) => {
          this.filteredLocations = data.data || [];
          this.currentPage = 1;
          this.calculatePagination();
        },
        error: (err) => console.error('Error fetching locations:', err)
      });

  }

  resetFilters(): void {
    this.selectedDistrict = null;
    this.locationFilter = '';
    this.pincodeFilter = '';
    this.locationSortDirection = '';
    this.filteredLocations = [...this.locations];
    this.currentPage = 1;
    this.calculatePagination();
  }

  openEditModal(loc: Location): void {
    this.selectedLocation = { ...loc };
  }

  toggleLocationSort(): void {
    if (this.locationSortDirection === '') {
      this.locationSortDirection = 'asc';
    } else if (this.locationSortDirection === 'asc') {
      this.locationSortDirection = 'desc';
    } else {
      this.locationSortDirection = '';
    }

    this.applySort();
  }

  applySort(): void {
    if (this.locationSortDirection === '') {
      this.filteredLocations = [...this.filteredLocations];
      return;
    }

    this.filteredLocations.sort((a, b) => {
      const nameA = a.locationName.toLowerCase();
      const nameB = b.locationName.toLowerCase();
      if (nameA < nameB) return this.locationSortDirection === 'asc' ? -1 : 1;
      if (nameA > nameB) return this.locationSortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.calculatePagination();
  }

  // Pagination logic
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLocations.length / this.pageSize);
    this.updatePagedLocations();
  }

  updatePagedLocations(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedLocations = this.filteredLocations.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedLocations();
  }

  // Table utilities
  shouldShowDistrict(index: number): boolean {
    if (index === 0) return true;
    return this.pagedLocations[index] && this.pagedLocations[index - 1] &&
      this.pagedLocations[index].districtName !== this.pagedLocations[index - 1].districtName;
  }

  getDistrictRowspan(index: number): number {
    let rowspan = 1;
    if (!this.pagedLocations[index]) return 1;
    const currentDistrict = this.pagedLocations[index].districtName;
    for (let i = index + 1; i < this.pagedLocations.length; i++) {
      if (this.pagedLocations[i].districtName === currentDistrict) {
        rowspan++;
      } else {
        break;
      }
    }
    return rowspan;
  }
}
