import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddUserDTO } from '../../models/adduser.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   constructor(private http: HttpClient) { }

  //Fetching Users 
  FetchUsers(): Observable <any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.user.fetchusers}`)
  }

searchUsers(userType: number, isActive: boolean | null, searchType: number, searchText: string): Observable<any> {
  let params = new HttpParams()
    .set('userType', userType)
    .set('searchType', searchType)
    .set('searchText', searchText);

  if (isActive !== null) {
    params = params.set('isActive', isActive);
  }
  return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.user.filterusers}`, { params });}
  



  addUser(user: AddUserDTO): Observable<any> {
  return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.user.addusers}`, user);
}

}


