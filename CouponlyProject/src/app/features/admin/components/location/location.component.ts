import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddLocationModalComponent } from '../../pages/add-location-modal/add-location-modal.component';
import { FormsModule } from '@angular/forms';
import { EditLocationModalComponent } from '../../pages/edit-location-modal/edit-location-modal.component';

interface Location {
  district: string;
  location: string;
  pincode: string;
  latitude: string;
  longitude: string;
}

interface District {
  value: string;
  name: string;
}


type SortDirection = '' | 'asc' | 'desc';

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

@Component({
  selector: 'app-location',
  imports: [
    CommonModule,
    FormCheckComponent,
    FormCheckInputDirective,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    ButtonDirective,
    ModalToggleDirective,
    ModalComponent,
    AddLocationModalComponent,
    EditLocationModalComponent,
    FormsModule
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

  locations: Location[] = [
    // Ernakulam District
    { district: 'Ernakulam', location: 'Kochi (Marine Drive)', pincode: '682011', latitude: '9.9754', longitude: '76.2874' },
    { district: 'Ernakulam', location: 'Kakkanad', pincode: '682030', latitude: '10.0216', longitude: '76.3533' },
    { district: 'Ernakulam', location: 'Aluva', pincode: '683101', latitude: '10.1089', longitude: '76.3517' },
    { district: 'Ernakulam', location: 'Muvattupuzha', pincode: '686661', latitude: '9.9806', longitude: '76.5779' },
    { district: 'Ernakulam', location: 'Perumbavoor', pincode: '683542', latitude: '10.1062', longitude: '76.5332' },

    // Thrissur District
    { district: 'Thrissur', location: 'Thrissur City', pincode: '680001', latitude: '10.5276', longitude: '76.2144' },
    { district: 'Thrissur', location: 'Guruvayoor', pincode: '680101', latitude: '10.6033', longitude: '76.0354' },
    { district: 'Thrissur', location: 'Chalakudy', pincode: '680307', latitude: '10.2974', longitude: '76.3475' },

    // Kottayam District
    { district: 'Kottayam', location: 'Kottayam Town', pincode: '686001', latitude: '9.5916', longitude: '76.5222' },
    { district: 'Kottayam', location: 'Pala', pincode: '686575', latitude: '9.7196', longitude: '76.6806' },
    { district: 'Kottayam', location: 'Vaikom', pincode: '686141', latitude: '9.7423', longitude: '76.3905' },

    // Alappuzha District
    { district: 'Alappuzha', location: 'Alappuzha Beach', pincode: '688001', latitude: '9.4981', longitude: '76.3388' },
    { district: 'Alappuzha', location: 'Cherthala', pincode: '688524', latitude: '9.6917', longitude: '76.3432' },

    // Idukki District (closer to Vazhithala as well)
    { district: 'Idukki', location: 'Thodupuzha', pincode: '685584', latitude: '9.8974', longitude: '76.7118' },
    { district: 'Idukki', location: 'Munnar', pincode: '685612', latitude: '10.0889', longitude: '77.0595' },
  ];

  districts: District[] = [
    { value: '', name: 'Select District' },
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

  locationFilter: string = '';
  selectedDistrict: string = '';
  pincodeFilter: string = '';
  filteredLocations: Location[] = [];
  locationSortDirection: SortDirection = '';
  selectedLocation: Location | null = null;

  ngOnInit(): void {
    this.applyFilters();
    this.locations.sort((a, b) => a.district.localeCompare(b.district));
  }

  openEditModal(loc: Location) {
    this.selectedLocation = { ...loc };
  }

  applyFilters(): void {

    console.log(this.selectedDistrict);

    let tempLocations = [...this.locations];

    if (this.selectedDistrict) {
      tempLocations = tempLocations.filter(loc => loc.district === this.selectedDistrict);
    }

    if (this.locationFilter) {
      const searchTerm = this.locationFilter.toLowerCase();
      tempLocations = tempLocations.filter(loc =>
        loc.location.toLowerCase().includes(searchTerm)
      );
    }

    if (this.pincodeFilter) {
      const searchTerm = this.pincodeFilter.toLowerCase();
      tempLocations = tempLocations.filter(loc =>
        loc.pincode.toLowerCase().includes(searchTerm)
      );
    }

    this.filteredLocations = this.sortLocationsWithinDistricts(tempLocations);
  }

  toggleLocationSort(): void {
    // Cycle through sort directions: '' -> 'asc' -> 'desc' -> ''
    if (this.locationSortDirection === '') {
      this.locationSortDirection = 'asc';
    } else if (this.locationSortDirection === 'asc') {
      this.locationSortDirection = 'desc';
    } else {
      this.locationSortDirection = '';
    }
    // Re-apply filters to ensure sorting is re-done on the current data set
    this.applyFilters();
  }

  // New: Internal method to perform the actual sorting
  private sortLocationsWithinDistricts(locationsToSort: Location[]): Location[] {
    if (this.locationSortDirection === '') {
      // If no specific location sort is active, ensure consistent grouping
      // by simply sorting by district, then location.
      return [...locationsToSort].sort((a, b) => {
        const districtCompare = a.district.localeCompare(b.district);
        if (districtCompare !== 0) {
          return districtCompare;
        }
        return a.location.localeCompare(b.location);
      });
    }

    const groupedLocations = new Map<string, Location[]>();

    // 1. Group locations by district
    locationsToSort.forEach(loc => {
      if (!groupedLocations.has(loc.district)) {
        groupedLocations.set(loc.district, []);
      }
      groupedLocations.get(loc.district)?.push(loc);
    });

    let finalSortedLocations: Location[] = [];

    // Maintain the original order of districts for the final output
    // based on how they first appear in the original allLocations, or your districts array.
    // To ensure consistent order, iterate through the `districts` array.
    this.districts
      .filter(d => d.value !== '') // Exclude the "Select District" option
      .map(d => d.name) // Get just the district names
      .forEach(districtName => {
        if (groupedLocations.has(districtName)) {
          const locationsInDistrict = groupedLocations.get(districtName);
          if (locationsInDistrict) {
            // 2. Sort locations within each district group
            locationsInDistrict.sort((a, b) => {
              const locationA = a.location.toLowerCase();
              const locationB = b.location.toLowerCase();
              let comparison = locationA.localeCompare(locationB);
              return this.locationSortDirection === 'desc' ? comparison * -1 : comparison;
            });
            // 3. Add the sorted group to the final list
            finalSortedLocations = finalSortedLocations.concat(locationsInDistrict);
          }
        }
      });

    return finalSortedLocations;
  }

  shouldShowDistrict(index: number): boolean {
    if (index === 0) return true;
    return this.filteredLocations[index] && this.filteredLocations[index - 1] &&
      this.filteredLocations[index].district !== this.filteredLocations[index - 1].district;
  }

  getDistrictRowspan(index: number): number {
    let rowspan = 1;
    if (!this.filteredLocations[index]) return 1;
    const currentDistrict = this.filteredLocations[index].district;
    for (let i = index + 1; i < this.filteredLocations.length; i++) {
      if (this.filteredLocations[i].district === currentDistrict) {
        rowspan++;
      } else {
        break;
      }
    }
    return rowspan;
  }
}
