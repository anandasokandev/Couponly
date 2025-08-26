import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  //uploadImage
  UploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file); // 'image' must match the expected field name

    const headers = new HttpHeaders({
      'x-api-key': environment.imageKey
    });

    return this.http.post(
      `${environment.imageUploadUrl}`,
      formData,
      { headers }
    );
  }
    //addstore

    AddStore(data: any): Observable<any> {
  return this.http.post(
    `${environment.apiBaseUrl}/${environment.endpoints.store.addStore}`,
    data
  );
}
//fetchstore

FetchStore(id: number):Observable<any>{
  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchstore}${id}`)
}

UpdateStore(id: number, data: any): Observable<any> {
  const url = `${environment.apiBaseUrl}/${environment.endpoints.store.updateStore}${id}`;
  return this.http.post(url, data);
}
}
