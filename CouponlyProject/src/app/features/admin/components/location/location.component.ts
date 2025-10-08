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
  PageItemDirective,
  PageLinkDirective,
  TableDirective
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cilSortAlphaUp, cilSortAlphaDown } from '@coreui/icons';
import { Location } from '../../../../commons/models/location.model';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { PaginationsComponent } from 'src/app/views/base/paginations/paginations.component';
import { PaginationComponent } from '../../pages/pagination/pagination.component';

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
    IconModule,
    PaginationComponent
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  constructor(private locationApi: LocationService, private toastService: ToastService) { }

  Math = Math;

  districts: District[] = [];
  locations: Location[] = [];
  filteredLocations: Location[] = [];

  locationFilter = '';
  selectedDistrict: number | null = null;
  pincodeFilter = '';
  locationSortDirection: SortDirection = '';
  selectedLocation: Location | null = null;

  icons = { cilSortAlphaUp, cilSortAlphaDown };
  isLoading = false;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalItems = 0;
  hasPrevious = false;
  hasNext = false;
  pagedLocations: Location[] = [];
  isPageChange: boolean = false;

  // Flags
  useServerPagination = true;

  ngOnInit(): void {
    this.fetchDistrict();
    this.fetchLocation();
  }

  fetchLocation(): void {
    this.isLoading = true;
    this.locationApi.fetchLocation(this.currentPage, this.pageSize, 10)
      .subscribe({
        next: (data) => {
          this.locations = data.data.items || [];
          this.pageHandling(data.data);
          
          this.filteredLocations = [...this.locations];
          this.updatePagedLocations();

          this.isLoading = false;

          console.log(data);
          
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
          this.isLoading = false;
        }
      });
  }

  pageHandling(data: any): void {
    this.currentPage = data.pageNumber;
    this.totalPages = data.totalPages;
    this.totalItems = data.totalCount || data.totalItems || 0;
    this.hasPrevious = data.hasPrevious;
    this.hasNext = data.hasNext;
  }

  fetchDistrict(): void {
    this.isLoading = true;
    this.locationApi.fetchDistrict()
      .subscribe({
        next: (data) => {
          this.districts = data.data || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching districts:', err);
          this.isLoading = false;
        }
      });
  }

  filterLocation(): void {
    this.isLoading = true;
    const districtId = this.selectedDistrict && this.selectedDistrict > 0 ? this.selectedDistrict : null;

    this.locationApi.filterLocation(districtId, this.locationFilter || '', this.pincodeFilter || '')
      .subscribe({
        next: (data) => {
          this.filteredLocations = data.data || [];
          this.useServerPagination = false;
          console.log(data.data);
          
          // this.currentPage = ;
          this.updatePagedLocations();
          this.isPageChange = !this.isPageChange;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error filtering locations:', err);
          this.isLoading = false;
        }
      });
  }

   onPageChange(page: number): void {
    this.currentPage = page;
    this.isPageChange = true;
    this.fetchLocation();
  }


  updatePagedLocations(): void {
    if (this.useServerPagination) {
      this.pagedLocations = [...this.filteredLocations];
    } else {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedLocations = this.filteredLocations.slice(start, end);
    }

    if (this.locationSortDirection) {
      this.applySort(); // Ensure sorted even in pagination
    }
  }

  toggleLocation(id: number): void {
    this.locationApi.toggleLocation(id)
      .subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.toastService.show({ type: 'success', message: 'Status changed successfully' });
            this.updateLocationStatus(id);
          } else {
            this.toastService.show({ type: 'error', message: 'Failed to change status' });
          }
        },
        error: (err) => {
          console.error('Error toggling location:', err);
          this.toastService.show({ type: 'error', message: 'An error occurred' });
        }
      });
  }

  updateLocationStatus(id: number): void {
    const update = (list: Location[]) => {
      const loc = list.find(l => l.id === id);
      if (loc) loc.isActive = !loc.isActive;
    };

    update(this.locations);
    update(this.filteredLocations);
    update(this.pagedLocations);
  }

  onLocationAdded(newLocation: Location): void {
    this.resetFilters();
  }

  resetFilters(): void {
    this.selectedDistrict = null;
    this.locationFilter = '';
    this.pincodeFilter = '';
    this.locationSortDirection = '';
    this.useServerPagination = true;
    this.currentPage = 1;
    this.fetchLocation();
  }

  hasFilters(): boolean {
    return !!(this.selectedDistrict || this.locationFilter || this.pincodeFilter);
  }

  openEditModal(loc: Location): void {
    this.selectedLocation = { ...loc };
  }

  toggleLocationSort(): void {
    this.locationSortDirection = this.locationSortDirection === ''
      ? 'asc'
      : this.locationSortDirection === 'asc'
        ? 'desc'
        : '';

    this.applySort();
  }

  applySort(): void {
    if (this.locationSortDirection === '') {
      this.filteredLocations = [...this.filteredLocations];
    } else {
      this.filteredLocations.sort((a, b) => {
        const nameA = a.locationName.toLowerCase();
        const nameB = b.locationName.toLowerCase();

        if (nameA < nameB) return this.locationSortDirection === 'asc' ? -1 : 1;
        if (nameA > nameB) return this.locationSortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.updatePagedLocations();
  }

  // Grouping Utilities
  shouldShowDistrict(index: number): boolean {
    if (index === 0) return true;

    const curr = this.pagedLocations[index];
    const prev = this.pagedLocations[index - 1];

    return curr?.districtName !== prev?.districtName;
  }

  getDistrictRowspan(index: number): number {
    let rowspan = 1;
    const currentDistrict = this.pagedLocations[index]?.districtName;
    if (!currentDistrict) return rowspan;

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

