
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddUserDTO } from '../../models/adduser.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }



  FetchUsers(pageNumber: number, pagesize: number): Observable<any[]> {

    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pagesize.toString());

    return this.http.get<any[]>(`${environment.apiBaseUrl}/${environment.endpoints.user.fetchusers}`, { params })
  }

  searchUsers(
    userType: number,
    isActive: boolean | null,
    searchType: number,
    searchText: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('userType', userType)
      .set('searchType', searchType)
      .set('searchText', searchText)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (isActive !== null) {
      params = params.set('isActive', isActive);
    }

    return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.user.filterusers}`, { params });
  }


  addUser(user: AddUserDTO): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.user.addusers}`, user);
  }

  disableuser(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('userId', userId.toString());
    return this.http.post(
      `${environment.apiBaseUrl}/${environment.endpoints.user.disableusers}`, {},
      { headers }
    );
  }

updateUser(userData: any): Observable<any> {
  return this.http.post(
      `${environment.apiBaseUrl}/${environment.endpoints.user.updateusers}`,
      userData
    );
}





}


