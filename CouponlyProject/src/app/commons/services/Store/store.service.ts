import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from './../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  //Fetching Categories
  FetchCategories():  Observable <any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchcategories}`)
  }
  //Fetching District
  FetchDistricts():  Observable <any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchdistricts}`)
  }
  //Fetching Stores 
  FetchStores(): Observable <any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchstores}`)
  }
  //Filtering Stores
  searchStores(type: number, searchtype: number, searchtext: string): Observable<any> {
  const params = new HttpParams()
    .set('type', type)
    .set('searchtype', searchtype)
    .set('searchtext', searchtext);

  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.store.filterstore}`, { params });}

  


}
