
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreDashboardService {
  constructor(private http: HttpClient) { }

  getStoreInfo(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.storeinfo}`;
    return this.http.get(url, { headers });
  }

  getRedeemHistory(
    pageNumber: number,
    pageSize: number,
    searchType: number = 4,
    searchText: string = '',
    fromDate?: string,
    toDate?: string
  ): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('searchType', searchType)
      .set('searchText', searchText);

    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);

    const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.redeemhistory}`;
    return this.http.get(url, { headers, params });
  }


  getPromotionHistory(
    pageNumber: number,
    pageSize: number,
    searchType: number = 5,
    searchText: string = '',
    fromDate?: string,
    toDate?: string
  ): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)
      .set('searchType', searchType)
      .set('searchText', searchText);

    if (fromDate) {
      params = params.set('fromDate', fromDate);
    }

    if (toDate) {
      params = params.set('toDate', toDate);
    }

    const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.promotions}`;
    return this.http.get(url, { headers, params });
  }

  getStoreOverview(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.overview}`;
    return this.http.get(url, { headers });
  }


  getCouponType() {
    return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.storedashboard.coupontype}`);
  }

  getStoreCoupons(couponCode: string = '', typeId?: number, dateFilter?: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    if (couponCode) params = params.set('couponCode', couponCode);
    if (typeId !== undefined) params = params.set('typeId', typeId);
    if (dateFilter) params = params.set('dateFilter', dateFilter);

    const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.coupons}`;
    return this.http.get(url, { headers, params });
  }

  deleteStoreCoupon(couponId: number): Observable<any> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.deletecoupon}/${couponId}`;
  return this.http.delete(url, { headers });
}


  exportStoreRedeemsToExcel(
  searchType: number = 4,
  searchText: string = '',
  fromDate?: string,
  toDate?: string
): Observable<Blob> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  let params = new HttpParams()
    .set('searchType', searchType)
    .set('searchText', searchText);

  if (fromDate) params = params.set('fromDate', fromDate);
  if (toDate) params = params.set('toDate', toDate);

  const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.excelredeem}`;
  return this.http.get(url, { headers, params, responseType: 'blob' });
}

exportStorePromotionsToExcel(
  searchType: number = 6,
  searchText: string = '',
  fromDate?: string,
  toDate?: string
): Observable<Blob> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  let params = new HttpParams()
    .set('searchType', searchType)
    .set('searchText', searchText);

  if (fromDate) params = params.set('fromDate', fromDate);
  if (toDate) params = params.set('toDate', toDate);

  const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.excelpromo}`;
  return this.http.get(url, { headers, params, responseType: 'blob' });
}


downloadPromotionInvoice(promotionId: number): Observable<Blob> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/pdf');

  const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.invoice}/${promotionId}`;
  return this.http.get(url, { headers, responseType: 'blob' });
}


}
