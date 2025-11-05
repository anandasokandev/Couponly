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
  FetchStores(pageNumber: number, pagesize: number): Observable <any[]>{
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pagesize.toString());
    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchstores}`,{params})
  }
  //Filtering Stores
  searchStores(currentPage: number, itemsPerPage :number,type: number, searchtype: number, searchtext: string): Observable<any> {
  const params = new HttpParams()
    .set('PageNumber', currentPage.toString())
    .set('PageSize', itemsPerPage.toString())
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

CheckStoreExistence(email: string, contact: string): Observable<any> {
  const url = `${environment.apiBaseUrl}/${environment.endpoints.store.storeExists}?email=${email}&contact=${contact}`;
  return this.http.get(url);
}

CheckEmailExits(email: string, id: number): Observable<any>{
  const url=`${environment.apiBaseUrl}/${environment.endpoints.store.emailExists}?email=${email}&id=${id}`;
  return this.http.get(url)
}

CheckContactExits(contact: string, id: number): Observable<any>{
  const url=`${environment.apiBaseUrl}/${environment.endpoints.store.contactExists}?number=${contact}&id=${id}`;
  return this.http.get(url)
}
updateStorePassword(email: string, payload: { newPassword: string; confirmPassword: string }): Observable<any> {
  return this.http.post<any>(
    `${environment.apiBaseUrl}/${environment.endpoints.store.updateStorePassword}/?email=${email}`,
    payload
  );
}
verifyPaymentToken(paymentToken: string): Observable<any> {
  const headers = new HttpHeaders({
    'PaymentToken': paymentToken
  });
  return this.http.post<any>(
    `${environment.apiBaseUrl}/${environment.endpoints.store.verifyPaymentToken}`,
    {},
    { headers }
  );
}





//store redeem api

FetchStoreRedeem(id: number): Observable<any> {
  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchStoreRedeem}?storeId=${id}`);
}

fetchStoreUsers(): Observable<any[]> {
  const token = sessionStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.user.StoreUsers}`, { headers });
}
}
