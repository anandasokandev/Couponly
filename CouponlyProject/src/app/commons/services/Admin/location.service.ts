import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../models/location.model';
import { Observable } from 'rxjs';
import { PaginatedData, PaginatedResponse } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = "https://localhost:7224/api";

  constructor(private http: HttpClient) { }

  fetchDistrict(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/District`);
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
      `${this.baseUrl}/Location`,
      { params }
    );
  }

  filterLocation(districtId: number | null, location: string, pincode: string): Observable<any> {
  const params: any = {};
  
  if (districtId != null) params.districtId = districtId;
  if (location) params.location = location;
  if (pincode) params.pincode = pincode;

  return this.http.get<any>(`${this.baseUrl}/Location/filter`, { params });
}



}
