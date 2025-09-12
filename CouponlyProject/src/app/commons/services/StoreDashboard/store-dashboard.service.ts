
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

getStoreOverview(): Observable<any> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${environment.apiBaseUrl}/${environment.endpoints.storedashboard.overview}`;
  return this.http.get(url, { headers });
}



}
 