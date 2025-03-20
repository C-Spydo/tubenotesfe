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
    return this.http.get<{ data: any }>(`${this.apiUrl}/history`).pipe(
      map((response) => response.data)
    );
  }

  summariseVideo(searchQuery: string): Observable<any> {
    return this.http.get<any>('assets/video-test.json');
  }

  summariseVideox(title: string): Observable<any> {

    return this.http.get<{ data: any }>(`${this.apiUrl}/emails/generate/${title}`).pipe(
      map((response) => response.data)
    );
    
  }


}
