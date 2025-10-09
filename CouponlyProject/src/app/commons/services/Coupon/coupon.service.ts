import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private http: HttpClient) { }

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

  // getValidCoupons() {
  //   return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.coupon.validcoupons}`);
  // }

  // getExpiredCoupons() {
  //   return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.coupon.expiredcoupons}`);
  // }

  // getUpcomingCoupons() {
  //   return this.http.get<any>(`${environment.apiBaseUrl}/${environment.endpoints.coupon.upcomingcoupon}`);
  // }


  // getCouponsByFilter(filter: {
  //   couponCode?: string;
  //   storeId?: number;
  //   storeName?: string;
  //   typeId?: number;
  // }) {
  //   let params = new HttpParams();

  //   if (filter.couponCode) {
  //     params = params.set('couponCode', filter.couponCode);
  //   }
  //   if (filter.storeId) {
  //     params = params.set('storeId', filter.storeId.toString());
  //   }
  //   if (filter.storeName) {
  //     params = params.set('storeName', filter.storeName);
  //   }
  //   if (filter.typeId) {
  //     params = params.set('typeId', filter.typeId.toString());
  //   }

  //   return this.http.get<any>(
  //     `${environment.apiBaseUrl}/${environment.endpoints.coupon.FilterCoupons}`,
  //     { params }
  //   );
  // }

  getCouponsByFilter(filter: {
    couponCode?: string;
    storeId?: number;
    storeName?: string;
    typeId?: number;
    dateFilter?: string; // "valid", "upcoming", "expired"
  }) {
    let params = new HttpParams();

    if (filter.couponCode) {
      params = params.set('couponCode', filter.couponCode);
    }
    if (filter.storeId) {
      params = params.set('storeId', filter.storeId.toString());
    }
    if (filter.storeName) {
      params = params.set('storeName', filter.storeName);
    }
    if (filter.typeId) {
      params = params.set('typeId', filter.typeId.toString());
    }
    if (filter.dateFilter) {
      params = params.set('dateFilter', filter.dateFilter);
    }

    return this.http.get<any>(
      `${environment.apiBaseUrl}/${environment.endpoints.coupon.FilterCoupons}`,
      { params }
    );
  }


}
