import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RedeemHistory } from '../../models/redeem-history.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeemsHistoryServiceService {
  constructor(private http: HttpClient) { }

  getAllRedeems() {
    return this.http.get<RedeemHistory[]>(`${environment.apiBaseUrl}/${environment.endpoints.redeem.getAllRedeems}`);
  }
}
