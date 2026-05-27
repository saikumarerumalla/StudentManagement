import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  private apiUrl = 'http://localhost:8080/api/v1/fees';

  constructor(private http: HttpClient) {}

  getStudentFees(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }

  recordPayment(feeId: number, amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${feeId}/payment?amount=${amount}`, {});
  }
}
