import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, TableDirective } from '@coreui/angular';
import { IconComponent, IconModule } from '@coreui/icons-angular';
import { IconSubset } from '../../../../icons/icon-subset';
import { cibIcloud, cibSoundcloud, cilCloudDownload, cilSortAlphaDown, cilSortAlphaUp } from '@coreui/icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterStorePipe } from '../../../../commons/filters/filterstore.pipe';
import { FilteruserPipe } from '../../../../commons/filters/filteruser.pipe';
import { FiltercouponcodePipe } from '../../../../commons/filters/filtercouponcode.pipe';
import { FiltercouponnamePipe } from '../../../../commons/filters/filtercouponname.pipe';
import { RedeemHistory } from '../../../../commons/models/redeem-history.model';
import { District } from '../../../../commons/models/district.model';
import { Location } from '../../../../commons/models/location.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-redeem-history',
  imports: [
    CommonModule,
    ColComponent, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent, 
    TableDirective,
    IconModule,
    FilterStorePipe,
    FilteruserPipe,
    FiltercouponcodePipe,
    FiltercouponnamePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './redeem-history.component.html',
  styleUrl: './redeem-history.component.scss'
})
export class RedeemHistoryComponent {

  // constructor (private redeemHistory: RedeemHistory){}
  icons = {cilSortAlphaUp, cibSoundcloud, cilCloudDownload, cilSortAlphaDown}
  filterStores: string = ''
  filterUsers: string = ''
  filterCouponName: string = ''
  filterCouponCode: string = ''
  distirctId: number = 0
  fromDate: Date = new Date();
  toDate: Date = new Date();
  // selectedDistirctId: string = ''

  redeems: RedeemHistory[] = [
    { id: 1, couponCode: 'COUP101', couponName: 'XBGD', userName: 'Ebin', storeName: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 2, couponCode: 'COUP102', couponName: 'dfdf', userName: 'Parvathi', storeName: "Relience Thpzha", redeemDate: "2025-01-26 15:15:20" },
    { id: 3, couponCode: 'COUP103', couponName: 'vadfvf', userName: 'Anand', storeName: "Relience Thpzha", redeemDate: "2025-01-26 15:15:20" },
    { id: 4, couponCode: 'COUP104', couponName: 'fdvdfvsfv', userName: 'helen', storeName: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 5, couponCode: 'COUP105', couponName: 'dvarvare', userName: 'Abhijith', storeName: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 6, couponCode: 'COUP106', couponName: 'dvarvare', userName: 'Merlin', storeName: "Relience Thpzha", redeemDate: "2025-01-26 15:15:20" },
    { id: 7, couponCode: 'COUP107', couponName: 'dvarvare', userName: 'Anumol', storeName: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
    { id: 8, couponCode: 'COUP107', couponName: 'dvarvare', userName: 'Gopika', storeName: "More Koothattkulam", redeemDate: "2025-01-26 15:15:20" },
  ]

  districts: District[] = [
    { id:1, districtName: 'Thrissur' },
    { id:2, districtName: 'Ernakulam' },
    { id:3, districtName: 'Kottayam' },
    { id:4, districtName: 'Thiruvanandhapuram' },
    { id:5, districtName: 'Idukki' }
  ]

  locations: Location[] = [
    { id: 1, districtId: 4, locationName: 'Kazhakuttam', pincode: '265947', latitude: '8.5673° N', longitude: '76.8741° E' },
    { id: 2, districtId: 1, locationName: 'Thriprayar', pincode: '263515', latitude: '10.4136° N', longitude: '76.1131° E' },
    { id: 3, districtId: 3, locationName: 'Pala', pincode: '465978', latitude: '9.7084° N', longitude: '76.6849° E' },
    { id: 4, districtId: 1, locationName: 'Kunnamkulam', pincode: '659545', latitude: '10.6484° N', longitude: '76.0706° E' },
    { id: 5, districtId: 2, locationName: 'Thripunithura', pincode: '656268', latitude: '9.9439° N', longitude: '76.3494° E' },
    { id: 6, districtId: 2, locationName: 'Kakanadu', pincode: '636261', latitude: '10.017° N', longitude: '76.344° E' },
    { id: 7, districtId: 5, locationName: 'Vazhithala', pincode: '646853', latitude: '9.8833° N', longitude: '76.6417° E' },

  ]

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      district: ['0'],
      location: ['0'],
      from: [''],
      to: ['']
    });
  }

  selectedStore: string = '';
  filteredLocations = [...this.locations];
  
  getLocations() {
    if(this.distirctId == 0) {
      return this.locations
    }
    else {
      
      return this.locations.filter(item => item.districtId == this.distirctId)
    }
  }

  districtChange(event: any) {
    this.distirctId = event.target.value;
    this.filterForm.get('location')?.setValue('0')
    this.getLocations();
  }

  getRedeems() {
    
  }

}
