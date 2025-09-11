import { HttpClient, HttpParams } from '@angular/common/http';
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
getAllCoupons() {
  return this.http.get<any>(
    `${environment.apiBaseUrl}/${environment.endpoints.coupon.GetAllCoupons}`
  );
}

getCouponsByFilter(filter: {
  couponCode?: string;
  storeId?: number;
  categoryId?: number;
}) {
  let params = new HttpParams();

  if (filter.couponCode) {
    params = params.set('couponCode', filter.couponCode);
  }
  if (filter.storeId) {
    params = params.set('storeId', filter.storeId.toString());
  }
  if (filter.categoryId) {
    params = params.set('categoryId', filter.categoryId.toString());
  }

  return this.http.get<any>(
    `${environment.apiBaseUrl}/${environment.endpoints.coupon.FilterCoupons}`,
    { params }
  );
}


 
}
