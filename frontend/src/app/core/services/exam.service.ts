import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:8080/api/v1/exams';

  constructor(private http: HttpClient) {}

  scheduleExam(exam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/schedule`, exam);
  }

  getExamsBySection(sectionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/section/${sectionId}`);
  }

  recordGrades(examId: number, grades: any[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${examId}/grades`, grades);
  }

  getStudentGrades(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}/grades`);
  }

  getStudentSummary(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/${studentId}/summary`);
  }

  getSectionSummary(sectionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/section/${sectionId}/summary`);
  }
}
