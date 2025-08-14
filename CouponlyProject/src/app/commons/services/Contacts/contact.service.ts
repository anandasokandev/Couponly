import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ContactService {


   

  constructor(private http: HttpClient) { }

  //Fetching contacts 
  FetchContacts(): Observable <any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.contact.AllContacts}`)

  }
  
searchContacts(name: string, email: string, phonenumber: string): Observable<any> {
  const params = new HttpParams()
  .set('name', name)
  .set('email', email)
  .set('phonenumber', phonenumber);

  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.contact.AllFilters}`, { params });



}
}