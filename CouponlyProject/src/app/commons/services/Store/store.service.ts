import { HttpClient } from '@angular/common/http';
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

  


}
