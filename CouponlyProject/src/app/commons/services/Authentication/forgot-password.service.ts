import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  forgotPassword(payload: { email: string }): Observable<any> {
    return this.http.post<any>(
      `${environment.apiBaseUrl}${environment.endpoints.login.forgotPassword}`,
      payload
    );
  }
  
verifyToken(payload: { token: string }): Observable<any> {
  return this.http.post<any>(
    `${environment.apiBaseUrl}${environment.endpoints.login.verifyToken}`,
    payload
  );
}
updatePassword(email: string, payload: { newPassword: string; confirmPassword: string }): Observable<any> {
  return this.http.post<any>(
    `${environment.apiBaseUrl}${environment.endpoints.login.updatePassword}/${email}`,
    payload
  );
}

}
