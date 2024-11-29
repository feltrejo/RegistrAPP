import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IssNowResponse } from './iss-now-response.model';  // Importa tu interfaz

@Injectable({
  providedIn: 'root',
})
export class IssTrackingDataService {
  private apiUrl = 'http://api.open-notify.org/iss-now.json';

  constructor(private http: HttpClient) {}

  location(): Observable<IssNowResponse> {
    return this.http.get<IssNowResponse>(this.apiUrl);
  }
}
