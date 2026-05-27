import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8080/api/v1/attendance';

  constructor(private http: HttpClient) {}

  markAttendance(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/mark`, data);
  }

  getDailyAttendance(date: string, sectionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/daily?date=${date}&sectionId=${sectionId}`);
  }
}
