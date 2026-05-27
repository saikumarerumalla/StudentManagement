import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  private apiUrl = 'http://localhost:8080/api/v1/academic';

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`);
  }

  getSectionsByClass(classId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes/${classId}/sections`);
  }

  getAllSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subjects`);
  }
}
