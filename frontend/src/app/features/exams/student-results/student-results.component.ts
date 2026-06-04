import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { ExamService } from '../../../core/services/exam.service';

@Component({
  selector: 'app-student-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule],
  template: `
    <div class="results-container">
      <h2>Individual Student Results</h2>

      <mat-form-field appearance="fill">
        <mat-label>Select Student</mat-label>
        <mat-select [(ngModel)]="selectedStudentId" (selectionChange)="loadSummary()">
          @for (student of students; track student.id) {
            <mat-option [value]="student.id">
              {{student.user.firstname}} {{student.user.lastname}} ({{student.admissionNumber}})
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      @if (summary) {
        <mat-card class="summary-card">
          <mat-card-header>
            <mat-card-title>{{summary.studentName}}</mat-card-title>
            <mat-card-subtitle>Overall Average: {{summary.averagePercentage | number:'1.2-2'}}%</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="summary.grades" class="mat-elevation-z8">
              <ng-container matColumnDef="examName">
                <th mat-header-cell *matHeaderCellDef> Exam </th>
                <td mat-cell *matCellDef="let grade"> {{grade.examName}} </td>
              </ng-container>

              <ng-container matColumnDef="subjectName">
                <th mat-header-cell *matHeaderCellDef> Subject </th>
                <td mat-cell *matCellDef="let grade"> {{grade.subjectName}} </td>
              </ng-container>

              <ng-container matColumnDef="marks">
                <th mat-header-cell *matHeaderCellDef> Marks </th>
                <td mat-cell *matCellDef="let grade"> {{grade.marksObtained}} / {{grade.maxMarks}} </td>
              </ng-container>

              <ng-container matColumnDef="percentage">
                <th mat-header-cell *matHeaderCellDef> % </th>
                <td mat-cell *matCellDef="let grade"> {{grade.percentage | number:'1.1-1'}}% </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .results-container { padding: 20px; }
    mat-form-field { width: 300px; margin-bottom: 20px; }
    .summary-card { margin-top: 20px; }
    table { width: 100%; margin-top: 15px; }
  `]
})
export class StudentResultsComponent implements OnInit {
  students: any[] = [];
  summary: any;
  selectedStudentId?: number;
  displayedColumns: string[] = ['examName', 'subjectName', 'marks', 'percentage'];

  constructor(
    private studentService: StudentService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => this.students = data);
  }

  loadSummary() {
    if (this.selectedStudentId) {
      this.examService.getStudentSummary(this.selectedStudentId).subscribe(data => this.summary = data);
    }
  }
}
