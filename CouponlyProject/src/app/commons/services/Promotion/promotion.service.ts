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

    getPromotionsByStoreId(storeId: number, currentPage: number, itemsPerPage: number): Observable<any> {
      const headers = new HttpHeaders({ storeId: sessionStorage.getItem('userId') ?? 0 });
      let params = new HttpParams()
        .set('PageNumber', currentPage)
        .set('PageSize', itemsPerPage);
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.FetchPromotionsByStoreId}`, { headers, params });
    }

    getPromotionById(promotionId: number): Observable<any> {
      let params = new HttpParams()
        .set('id', promotionId);
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.FetchPromotionById}`, { params });
    }

    downloadPromotionReportExcel(title: string, store: string, code: string, status: number, fromDate: string | null, toDate: string | null, sortColumn: string, sortDirection: 'asc' | 'desc'): Observable<Blob> {
      let params = new HttpParams()
        .set('Title', title)
        .set('Store', store)
        .set('Code', code)
        .set('Status', status)
        .set('FromDate', fromDate ? fromDate : '')
        .set('ToDate', toDate ? toDate : '')
        .set('SortColumn', sortColumn)
        .set('SortDirection', sortDirection);
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.Excel.DownloadPromotionReportExcel}`, { responseType: 'blob', params });
    }

    emailPromotionReportExcel(title: string, store: string, code: string, status: number, fromDate: string | null, toDate: string | null, sortColumn: string, sortDirection: 'asc' | 'desc'): Observable<any> {
      let params = new HttpParams()
        .set('Title', title)
        .set('Store', store)
        .set('Code', code)
        .set('Status', status)
        .set('FromDate', fromDate ? fromDate : '')
        .set('ToDate', toDate ? toDate : '')
        .set('SortColumn', sortColumn)
        .set('SortDirection', sortDirection);
      let headers = new HttpHeaders({ userId: sessionStorage.getItem('userId') ?? 0 });
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.Excel.ExportPromotionReportToExcelAndMail}`, { params, headers });
    }

    getPromotions(currentPage: number, itemsPerPage: number): Observable<any> {
      let params = new HttpParams()
        .set('PageNumber', currentPage)
        .set('PageSize', itemsPerPage);
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.FetchPromotions}`, { params });
    }

    getPromotionsWithFilter(currentPage: number, itemsPerPage: number, title: string, store: string, code: string, status: number, fromDate: string | null, toDate: string | null, sortColumn: string, sortDirection: 'asc' | 'desc'): Observable<any> {
      let params = new HttpParams()
        .set('PageNumber', currentPage)
        .set('PageSize', itemsPerPage)
        .set('Title', title)
        .set('Store', store)
        .set('Code', code)
        .set('Status', status)
        .set('FromDate', fromDate ? fromDate : '')
        .set('ToDate', toDate ? toDate : '')
        .set('SortColumn', sortColumn)
        .set('SortDirection', sortDirection);
        console.log(params);
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.FetchPromotionsWithFilter}`, { params });
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

    GetStatuses(): Observable<any> {
      return this.http.get(`${environment.apiBaseUrl}/${environment.endpoints.promotion.status.AllStatuses}`);
    }

    CancelPromotion(promotionId: number): Observable<any> {
      const headers = new HttpHeaders({ loginid: sessionStorage.getItem('userId') ?? 0, promotionid: promotionId ?? 0 });
      // let params = new HttpParams()
      //   .set('id', promotionId);
      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.CancelPromotion}`, null, { headers });
    }

    ResendPaymentLink(promotionId: number): Observable<any> {
      const headers = new HttpHeaders({ loginid: sessionStorage.getItem('userId') ?? 0, promotionid: promotionId ?? 0 });
      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.payment.GeneratePaymentTokenUrl}`, null, { headers });
    }

    Payment(paymentData: any): Observable<any> {
      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.payment.Payment}`, paymentData);
    }

    PaymentWebhook(PaymentWebhook: any): Observable<any> {
      return this.http.post(`${environment.apiBaseUrl}/${environment.endpoints.promotion.payment.paymentWebhook}`, PaymentWebhook);
    }
}
