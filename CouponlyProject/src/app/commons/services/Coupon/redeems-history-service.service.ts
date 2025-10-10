import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedeemHistory } from '../../models/redeem-history.model';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedeemsHistoryServiceService {
  constructor(private http: HttpClient) { }

  

  getAllRedeems(currentPage: number, itemsPerPage: number, districtid: number, locationid: number, fromdate: string, todate: string) {

    let params = new HttpParams()
      .set('PageNumber', currentPage)
      .set('PageSize', itemsPerPage)
      .set('districtid', districtid)
      .set('locationid', locationid);

    let headers = new HttpHeaders()
      .set('loginid', sessionStorage.getItem('userId') || '')
      .set('role', sessionStorage.getItem('role') || '');

    console.log(fromdate, todate)
    if(fromdate !== '')
      params = params.append('fromdate', fromdate);
    if(todate !== '')
      params = params.append('todate', todate);
    return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.redeem.getAllRedeems}`, { headers, params })
    .pipe(
      map((response: any) => {
        if (response && response.statusCode == 200) {
          return {RedeemHistory: response.data.items as RedeemHistory[], total: response.data.totalCount as number};
        }
        return {RedeemHistory: [], total: 0};
      })
    );
  
  }

  exportRedeemsToExcel(districtId: number, locationId: number, fromDate?: string, toDate?: string) {
    const params: any = {
      districtid: districtId,
      locationid: locationId
    };
    if (fromDate) params.fromdate = fromDate;
    if (toDate) params.todate = toDate;

    let headers = new HttpHeaders()
      .set('loginid', sessionStorage.getItem('userId') || '')
      .set('role', sessionStorage.getItem('role') || '');

    return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.redeem.ExportExcel}`, {
      params,
      responseType: 'blob',
      headers
    });
  }

  ExportToExcelAndMail(districtId: number, locationId: number, fromDate?: string, toDate?: string): Observable<any>  {
      const params: any = {
      districtid: districtId,
      locationid: locationId
    };
    if (fromDate) params.fromdate = fromDate;
    if (toDate) params.todate = toDate;

    let headers = new HttpHeaders()
      .set('loginid', sessionStorage.getItem('userId') || '')
      .set('role', sessionStorage.getItem('role') || '');
      
    return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.redeem.ExportEmail}`, { headers, params });
  }

  getDistricts(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.location.fetchDistrict}`);
  }

  getLocations(districtId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.location.fetchDistrict}/${districtId}/locations`);
  }
}
