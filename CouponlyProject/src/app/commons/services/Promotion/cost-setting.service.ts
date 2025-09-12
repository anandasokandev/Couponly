import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';
import { CostSetting } from '../../models/CostSetting.model';

@Injectable({
  providedIn: 'root'
})
export class CostSettingService {
  constructor(private http: HttpClient) { }

    getAllServices(): Observable<any> {
      let header = new HttpHeaders().set('loginid', sessionStorage.getItem('userId') || '0').set('role', sessionStorage.getItem('role') || '');
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.service.AllServices}`, { headers: header });
    }

    updateService(service: CostSetting): Observable<any> {

      let header = new HttpHeaders().set('loginid', sessionStorage.getItem('userId') || '0').set('role', sessionStorage.getItem('role') || '');

      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.service.UpdateService}`, service, { headers: header });
    }

}
