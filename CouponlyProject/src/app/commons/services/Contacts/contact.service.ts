import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ContactService {


   

  constructor(private http: HttpClient) { }



  //Fetching contacts 
  FetchContacts(pageNumber: number, pagesize: number): Observable <any[]>{

    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pagesize.toString());

    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.contact.AllContacts}`, { params });

  }
  
searchContacts(pageNumber: number, pagesize: number, name: string, email: string, phonenumber: string): Observable<any> {
  const params = new HttpParams()
    .set('PageNumber', pageNumber.toString())
    .set('PageSize', pagesize.toString())
    .set('name', name)
    .set('email', email)
    .set('phonenumber', phonenumber);

  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.contact.AllFilters}`, { params });
}


addContact(contactData: any): Observable<any> {
  const token = sessionStorage.getItem('token'); 

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.contact.AddContact}`, contactData, { headers });
}


updateContact(contactId: number, contactData: any): Observable<any> {
  const headers = new HttpHeaders({
    id: contactId
  });

  return this.http.post(
      `${environment.apiBaseUrl}/${environment.endpoints.contact.EditContact}`,
      contactData,
      { headers }
    );
  }



ExportContactsToCsv(name?: string, email?: string, phonenumber?: string) {
  const params: any = {};

  if (name) params.name = name;
  if (email) params.email = email;
  if (phonenumber) params.phonenumber = phonenumber;

  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.contact.ExportCSV}`, {
    params,
    responseType: 'blob' // Important for downloading CSV
  });
}

ExportContactsToVCard(name?: string, email?: string, phonenumber?: string) {
  const params: any = {};

  if (name) params.name = name;
  if (email) params.email = email;
  if (phonenumber) params.phonenumber = phonenumber;

  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.contact.ExportVcard}`, {
    params,
    responseType: 'blob' // Important for downloading .vcf
  });
}

ImportContactsFromCsv(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.contact.importcsv}`, formData);
}



ImportContactsFromVCard(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.contact.importvcard}`, formData);
}


}