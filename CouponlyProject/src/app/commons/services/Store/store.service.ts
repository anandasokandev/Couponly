import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  private baseUrl = "https://api.couponly.store/api/Store";

  constructor(private http: HttpClient) { }

  //Fetching Stores 
  FetchStores(): Observable <any[]>{
    return this.http.get<any[]>(this.baseUrl+'/AllStores')
  }

  searchStores(type: number, searchtype: number, searchtext: string): Observable<any> {
  const params = new HttpParams()
    .set('type', type)
    .set('searchtype', searchtype)
    .set('searchtext', searchtext);

  return this.http.get(`${this.baseUrl}/FilterStore`, { params });}

  


}
