import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private http: HttpClient) {}

  getCouponType() {
    return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.coupon.GetCouponType}`);
  }

  GenerateCoupon(data: any) {
    return this.http.post<any>(`${environment.apiBaseUrl}/${environment.endpoints.coupon.GenerateCoupon}`, data);
  }
}
