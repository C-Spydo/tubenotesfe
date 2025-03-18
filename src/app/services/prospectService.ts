import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Prospect {
  id: number;
  company_name: string;
  industry_id: number;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  industry_name: string
}

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private apiUrl = `${environment.baseUrl}`;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  fetchProspects(): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/prospects`).pipe(
      map((response) => response.data)
    );
  }

  addProspect(prospect): Observable<any> {
    return this.http.post(`${this.baseUrl}/prospects`, prospect);
  }

  fetchIndustries(): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/industries`).pipe(
      map((response) => response.data)
    );
  }
}
