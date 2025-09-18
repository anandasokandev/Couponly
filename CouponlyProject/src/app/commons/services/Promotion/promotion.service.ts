import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  
    constructor(private http: HttpClient) { }

    createPromotion(promotionData: any): Observable<any> {
      const headers = new HttpHeaders({ loginid: sessionStorage.getItem('userId') ?? 0 });
      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.NewPromotion}`, promotionData, { headers });
    }

    getStoreContactCount(storeId: number): Observable<any> {
      return this.http.get(`${environment.apiBaseUrl}/Store/${storeId}/count`);
    }

    getPublicContactCount(storeId: number): Observable<any> {
      const headers = new HttpHeaders({ storeid: storeId ?? 0 });
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.LocationContact.ContactCount}`, { headers });
    }

    getStores(currentPage: number, itemsPerPage: number, type: string, searchtype: string, searchtext: string) {
      const params = new HttpParams()
        .set('PageNumber', currentPage.toString())
        .set('PageSize', itemsPerPage.toString())
        .set('type', type)
        .set('searchtype', searchtype)
        .set('searchtext', searchtext);

      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.store.filterstore}`, { params });
    }

    getDistricts(): Observable<any> {
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.location.fetchDistrict}`);
    }
  
    getLocations(districtId: number): Observable<any> {
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.location.fetchDistrict}/${districtId}/locations`);
    }
  
    getCategories(): Observable<any> {
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.store.fetchcategories}`);
    }

    getCoupons(storeId: number, couponCode: string): Observable<any> {
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.coupon.CouponSearch}`, {
        params: { StoreId: storeId.toString(), CouponCode: couponCode }
      });
    }
}
