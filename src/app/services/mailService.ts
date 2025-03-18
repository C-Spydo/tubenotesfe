import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = `${environment.baseUrl}`;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  fetchMails(): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/emails`).pipe(
      map((response) => response.data)
    );
  }

  generateMail(prospect_id: number): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/emails/generate/${prospect_id}`).pipe(
      map((response) => response.data)
    );
  }

  // generateMail(prospect_id: number): Observable<any> {
  //   return this.http.post<{ data: any }>(`${this.baseUrl}/emails/generate`, { prospect_id }).pipe(
  //     map(response => response.data) 
  //   );
  // }

  sendMail(prospect_id: number | string, title: string, email_body: string): Observable<any> {
    const id = Number(prospect_id); // Ensure it's a number
  
    if (isNaN(id)) {
      throw new Error("Invalid prospect_id: must be a number.");
    }
  
    return this.http.post<{ data: any }>(`${this.baseUrl}/emails`, { prospect_id: id, title, email_body }).pipe(
      map(response => response.data)
    );
  }

  resendMail(mail_id: number): Observable<any> {
    return this.http.post<{ data: any }>(`${this.baseUrl}/emails/${mail_id}/resend`, {}).pipe(
      map(response => response.data) 
    );
  }
  

}
