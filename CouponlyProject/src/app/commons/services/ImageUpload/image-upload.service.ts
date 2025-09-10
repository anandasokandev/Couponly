import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  
  constructor(private http: HttpClient) { }

  UploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({
      'x-api-key': environment.imageKey
    });

    return this.http.post(
      `${environment.imageUploadUrl}`,
      formData,
      { headers }
    );
  }
}
