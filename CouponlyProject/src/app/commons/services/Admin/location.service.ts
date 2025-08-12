import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = "https://api.couponly.store/api"
  constructor(private http: HttpClient) { }

  fetchLocation(pageNumber: number, pageSize: number) {

  }

}
