import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/v1/students';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  enrollStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enroll`, student);
  }

  getStudentsBySection(sectionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/section/${sectionId}`);
  }
}
