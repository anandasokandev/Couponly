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
  PaginationComponent,
  TableDirective
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { cilSortAlphaUp, cilSortAlphaDown } from '@coreui/icons';
import { Location } from '../../../../commons/models/location.model';
import { LocationService } from '../../../../commons/services/Admin/location.service';
import { District } from '../../../../commons/models/district.model';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { RouterLink } from '@angular/router';

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
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective
  ],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  constructor(private locationApi: LocationService, private toastService: ToastService) { }

  // Make Math available in template
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
  isLoading: boolean = false;

  // Pagination properties
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalItems = 0;
  hasPrevious: boolean = false;
  hasNext: boolean = false;
  pagedLocations: Location[] = [];

  // Track if we're using server-side or client-side pagination
  useServerPagination = true;

  ngOnInit(): void {
    this.fetchDistrict();
    this.fetchLocation();
  }

  fetchLocation(): void {
    this.isLoading = true;
    // Fix: Remove duplicate pageSize parameter
    this.locationApi.fetchLocation(this.currentPage, this.pageSize, 10)
      .subscribe({
        next: (data) => {
          this.locations = data.data.items || [];
          this.pageHandling(data.data);
          
          // Only set filtered locations if no filters are applied
          if (!this.hasFilters()) {
            this.filteredLocations = [...this.locations];
            this.pagedLocations = [...this.locations];
          }
          this.isLoading = false;
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

  filterLocation() {
    this.isLoading = true;
    this.filteredLocations = []
    const districtId = (this.selectedDistrict && this.selectedDistrict > 0) ? this.selectedDistrict : null;
    
    this.locationApi.filterLocation(districtId, this.locationFilter || '', this.pincodeFilter || '')
      .subscribe({
        next: (data) => {
          this.filteredLocations = data.data || [];
          this.currentPage = 1;
          this.useServerPagination = false; // Switch to client-side pagination for filtered results
          this.calculateClientPagination();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
          this.isLoading = false;
        }
      });
  }

  toggleLocation(id: number) {
    this.locationApi.toggleLocation(id)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.isSuccess) {
            this.toastService.show({ type: 'success', message: 'Success' });
            // Update the location status in the current data
            this.updateLocationStatus(id);
          } else {
            this.toastService.show({ type: 'error', message: `Failed to change status` });
          }
        },
        error: (err) => {
          console.error('Error toggling location:', err);
          this.toastService.show({ type: 'error', message: 'Error occurred while changing status' });
        }
      });
  }

  // Helper method to update location status without refetching
  updateLocationStatus(id: number): void {
    const updateStatus = (locations: Location[]) => {
      const location = locations.find(loc => loc.id === id);
      if (location) {
        location.isActive = !location.isActive;
      }
    };

    updateStatus(this.locations);
    updateStatus(this.filteredLocations);
    updateStatus(this.pagedLocations);
  }

  onLocationAdded(newLocation: Location) {
    console.log('New location added:', newLocation);
    this.resetFilters();
    this.fetchLocation();
  }

  resetFilters(): void {
    this.selectedDistrict = null;
    this.locationFilter = '';
    this.pincodeFilter = '';
    this.locationSortDirection = '';
    this.useServerPagination = true;
    this.currentPage = 1;
    this.fetchLocation(); // Refetch original data from server
  }

  // Check if any filters are applied
  hasFilters(): boolean {
    return !!(this.selectedDistrict || this.locationFilter || this.pincodeFilter);
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
      // Reset to original order
      if (this.useServerPagination && !this.hasFilters()) {
        this.fetchLocation();
        return;
      }
      this.filteredLocations = [...this.locations];
    } else {
      // Apply sorting
      this.filteredLocations.sort((a, b) => {
        const nameA = a.locationName.toLowerCase();
        const nameB = b.locationName.toLowerCase();
        if (nameA < nameB) return this.locationSortDirection === 'asc' ? -1 : 1;
        if (nameA > nameB) return this.locationSortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.currentPage = 1;
    if (!this.useServerPagination) {
      this.calculateClientPagination();
    }
  }

  // Client-side pagination calculation
  calculateClientPagination(): void {
    this.totalItems = this.filteredLocations.length;
    this.totalPages = Math.ceil(this.filteredLocations.length / this.pageSize);
    this.hasPrevious = this.currentPage > 1;
    this.hasNext = this.currentPage < this.totalPages;
    this.updatePagedLocations();
  }

  // Update the displayed locations based on current page
  updatePagedLocations(): void {
    if (this.useServerPagination && !this.hasFilters()) {
      this.pagedLocations = [...this.filteredLocations];
      return;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedLocations = this.filteredLocations.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    if (this.useServerPagination && !this.hasFilters()) {
      // Fetch new page from server
      this.fetchLocation();
    } else {
      // Update client-side pagination
      this.updatePagedLocations();
    }
  }

  goToPreviousPage(): void {
    if (this.hasPrevious) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.hasNext) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Table utilities for district grouping
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
