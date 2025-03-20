import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = `${environment.baseUrl}`;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  fetchSummaryHistory(): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/emails`).pipe(
      map((response) => response.data)
    );
  }

  summariseVideo(searchQuery: string): Observable<any> {
    return this.http.get<any>('assets/video-test.json');
  }

  // summariseVideo(title: string): Observable<any> {

  //   // return this.http.get<{ data: any }>(`${this.apiUrl}/emails/generate/${prospect_id}`).pipe(
  //   //   map((response) => response.data)
  //   // );
    
  // }

  // generateMail(prospect_id: number): Observable<any> {
  //   return this.http.post<{ data: any }>(`${this.baseUrl}/emails/generate`, { prospect_id }).pipe(
  //     map(response => response.data) 
  //   );
  // }

  

}
