import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedeemHistory } from '../../models/redeem-history.model';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedeemsHistoryServiceService {
  constructor(private http: HttpClient) { }

  

  getAllRedeems(districtid: number, locationid: number, fromdate: string, todate: string) {
    let params = new HttpParams().set('districtid', districtid).set('locationid', locationid);
    console.log(fromdate, todate)
    if(fromdate !== '')
      params = params.append('fromdate', fromdate);
    if(todate !== '')
      params = params.append('todate', todate);
    return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.redeem.getAllRedeems}`, { params })
    .pipe(
      map((response: any) => {
        if (response && response.statusCode == 200) {
          return response.data as RedeemHistory[];
        }
        return [];
      })
    );
  
  }
}
