import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, ModalComponent, ModalToggleDirective, SpinnerComponent, TableDirective } from '@coreui/angular';
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
import { DownloadRedeemsModelComponent } from '../../pages/download-redeems-model/download-redeems-model.component';
import { RedeemsHistoryServiceService } from '../../../../commons/services/Coupon/redeems-history-service.service';
import { ToastService } from '../../../../commons/services/Toaster/toast.service';
import { PaginationComponent } from '../../pages/pagination/pagination.component';

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
    DownloadRedeemsModelComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalToggleDirective,
    ModalComponent,
    SpinnerComponent,
    PaginationComponent,
  ],
  templateUrl: './redeem-history.component.html',
  styleUrl: './redeem-history.component.scss'
})
export class RedeemHistoryComponent {

  // constructor (private redeemHistory: RedeemHistory){}
  icons = {cilSortAlphaUp, cibSoundcloud, cilCloudDownload, cilSortAlphaDown}
  filterStores: string = ''
  filterUsers: string = ''
  filterLocations: string = ''
  filterCouponName: string = ''
  filterCouponCode: string = ''
  distirctId: number = 0;
  locationId: number = 0;
  fromDate: string = '';
  toDate: string = '';
  isLoading: boolean = false;
  // selectedDistirctId: string = ''

  private toast = inject(ToastService);

  redeems: RedeemHistory[] = []

  districts: District[] = [
    { id:1, districtName: 'Thrissur' },
    { id:7, districtName: 'Ernakulam' },
    { id:3, districtName: 'Kottayam' },
    { id:4, districtName: 'Thiruvanandhapuram' },
    { id:5, districtName: 'Idukki' }
  ]

  locations = [
    { id: 1, districtId: 4, locationName: 'Kazhakuttam', pincode: '265947', latitude: '8.5673° N', longitude: '76.8741° E' },
    { id: 2, districtId: 1, locationName: 'Thriprayar', pincode: '263515', latitude: '10.4136° N', longitude: '76.1131° E' },
    { id: 3, districtId: 3, locationName: 'Pala', pincode: '465978', latitude: '9.7084° N', longitude: '76.6849° E' },
    { id: 4, districtId: 1, locationName: 'Kunnamkulam', pincode: '659545', latitude: '10.6484° N', longitude: '76.0706° E' },
    { id: 5, districtId: 7, locationName: 'Thripunithura', pincode: '656268', latitude: '9.9439° N', longitude: '76.3494° E' },
    { id: 3, districtId: 7, locationName: 'Moovattupuzha', pincode: '636261', latitude: '10.017° N', longitude: '76.344° E' },
    { id: 7, districtId: 5, locationName: 'Vazhithala', pincode: '646853', latitude: '9.8833° N', longitude: '76.6417° E' },

  ]

  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private redeemHistoryService: RedeemsHistoryServiceService) {
    this.filterForm = this.fb.group({
      district: ['0'],
      location: ['0'],
      from: [''],
      to: ['']
    });
  }

  ngOnInit() {
    this.getRedeems();
    this.filterForm.get('district')?.valueChanges.subscribe(value => {
      this.distirctId = value;
      this.filterForm.get('location')?.setValue('0');
      this.getLocations();
      this.getRedeems();
    });
    this.filterForm.get('location')?.valueChanges.subscribe(value => {
      this.locationId = value;
      this.getRedeems();
    });
    this.filterForm.get('from')?.valueChanges.subscribe(value => {
      this.fromDate = value;
      this.getRedeems();
    });
    this.filterForm.get('to')?.valueChanges.subscribe(value => {
      this.toDate = value;
      this.getRedeems();
    });
    this.getLocations();
  }
  
  getLocations() {
    if(this.distirctId == 0) {
      return this.locations
    }
    else {
      return this.locations.filter(item => item.districtId == this.distirctId)
    }
  }

  getRedeemsFiltered() {
    if(this.filterLocations != "") {
      return this.redeems.filter(redeem =>
        redeem.location.toLowerCase().includes(this.filterLocations.toLowerCase())
      );
    }
    else {
      return this.redeems;
    }

  }

  resetFilter() {
    this.distirctId = 0;
    this.locationId = 0;
    this.filterForm.get('to')?.setValue('');
    this.filterForm.get('from')?.setValue('');
    this.getRedeems()
  }

  downloadExcel() {
    this.redeemHistoryService.exportRedeemsToExcel(
      this.distirctId,
      this.locationId,
      this.fromDate,
      this.toDate
    )?.subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Redeems History.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      this.toast.show({ type: 'success', message: 'Redeem history downloaded successfully!' });
    }, error => {
      console.error('Download failed', error);
      this.toast.show({ type: 'error', message: 'Failed to download redeem history.' });
    });
  }

  emailExcel() {
    this.redeemHistoryService.ExportToExcelAndMail(
      this.distirctId,
      this.locationId,
      this.fromDate,
      this.toDate
    ).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.toast.show({ type: 'success', message: response.data });
        } else {
          this.toast.show({ type: 'error', message: 'Failed to send redeem history email.' });
        }
      },
      error: (error) => {
        this.toast.show({ type: 'error', message: 'Failed to send redeem history email.' });
        console.log(error);
      }
    });
  }

  getRedeems() {
    this.isLoading = true;
    this.redeemHistoryService.getAllRedeems(
      this.currentPage,
      this.itemsPerPage,
      this.distirctId,
      this.locationId,
      this.fromDate,
      this.toDate
    )?.subscribe((data: RedeemHistory[]) => {
      this.redeems = data;
      this.isLoading = false;
    });
  }
  itemsPerPage: number = 10;
  currentPage: number = 1;

  onPageChange(page: number) {
    this.currentPage = page;
    this.getRedeems();
  }

}
