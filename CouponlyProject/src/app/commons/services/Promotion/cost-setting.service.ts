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
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.service.AllServices}`, { headers });
    }

    updateService(service: CostSetting): Observable<any> {

      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.service.UpdateService}`, service, { headers });
    }

}
