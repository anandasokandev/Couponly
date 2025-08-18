import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location.model';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { PaginatedData, PaginatedResponse } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  fetchDistrict(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.location.fetchDistrict}`);
  }

  fetchLocation(
    pageNumber: number,
    pageSize: number,
    validPageSize: number
  ): Observable<PaginatedResponse<PaginatedData<Location>>> {
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString())
      .set('ValidPageSize', validPageSize.toString());

    return this.http.get<PaginatedResponse<PaginatedData<Location>>>(
      `${environment.apiBaseUrl}/${environment.endpoints.location.fetchLocation}`,
      { params }
    );
  }
}
