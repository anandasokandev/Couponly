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
  districtId: number = 0;
  locationId: number = 0;
  fromDate: string = '';
  toDate: string = '';
  isLoading: boolean = false;
  isPageChange: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  redeems: RedeemHistory[] = [];
  districts: District[] = [];
  locations: Location[] = [];

  private toast = inject(ToastService);

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
    this.redeemHistoryService.getDistricts().subscribe((data: any) => {
      if(data && data.statusCode == 200) {
        this.districts = data.data as District[];
      }
    });
    this.filterForm.get('district')?.valueChanges.subscribe(value => {
      this.districtId = value;
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
    if(this.districtId == 0) {
      this.locations = [];
    }
    else {
      this.redeemHistoryService.getLocations(this.districtId).subscribe((data: any) => {
        if(data && data.statusCode == 200) {
          const locations = data.data as Location[];
          this.locations = locations;
        } else {
          this.locations = [];
        }
      });
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
    this.districtId = 0;
    this.locationId = 0;
    this.filterForm.get('to')?.setValue('');
    this.filterForm.get('from')?.setValue('');
    this.getRedeems()
  }

  downloadExcel() {
    this.redeemHistoryService.exportRedeemsToExcel(
      this.districtId,
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
      this.districtId,
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
    if (!this.isPageChange)
      this.currentPage = 1;
    this.redeems = [];
    this.redeemHistoryService.getAllRedeems(
      this.currentPage,
      this.itemsPerPage,
      this.districtId,
      this.locationId,
      this.fromDate,
      this.toDate
    )?.subscribe((data: RedeemHistory[]) => {
      this.redeems = data;
      this.isLoading = false;
      this.isPageChange = false;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.isPageChange = true;
    this.getRedeems();
  }

}
