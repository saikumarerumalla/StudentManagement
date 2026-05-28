import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../core/services/exam.service';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-grade-entry',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <div class="grade-container">
      <h2>Enter Grades for Exam</h2>
      
      @if (students.length > 0) {
        <table mat-table [dataSource]="students" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Student Name </th>
            <td mat-cell *matCellDef="let student"> {{student.user.firstname}} {{student.user.lastname}} </td>
          </ng-container>

          <ng-container matColumnDef="marks">
            <th mat-header-cell *matHeaderCellDef> Marks Obtained </th>
            <td mat-cell *matCellDef="let student">
              <mat-form-field appearance="outline">
                <input matInput type="number" [(ngModel)]="gradeData[student.id].marksObtained">
              </mat-form-field>
            </td>
          </ng-container>

          <ng-container matColumnDef="remarks">
            <th mat-header-cell *matHeaderCellDef> Remarks </th>
            <td mat-cell *matCellDef="let student">
              <mat-form-field appearance="outline">
                <input matInput [(ngModel)]="gradeData[student.id].remarks">
              </mat-form-field>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div class="actions">
          <button mat-raised-button color="primary" (click)="saveGrades()">Save Grades</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .grade-container { padding: 20px; }
    table { width: 100%; }
    mat-form-field { margin-top: 8px; margin-bottom: 8px; }
    .actions { margin-top: 20px; display: flex; justify-content: flex-end; }
  `]
})
export class GradeEntryComponent implements OnInit {
  examId?: number;
  students: any[] = [];
  gradeData: { [key: number]: any } = {};
  displayedColumns: string[] = ['name', 'marks', 'remarks'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.examId = parseInt(id);
      // In a real app, we'd fetch the exam first to get the sectionId
      // For now, let's assume we fetch all students (or pass sectionId via route)
      this.studentService.getAllStudents().subscribe(data => {
        this.students = data;
        this.students.forEach(s => {
          this.gradeData[s.id] = { marksObtained: 0, remarks: '' };
        });
      });
    }
  }

  saveGrades() {
    if (this.examId) {
      const grades = Object.keys(this.gradeData).map(id => ({
        studentId: parseInt(id),
        marksObtained: this.gradeData[parseInt(id)].marksObtained,
        remarks: this.gradeData[parseInt(id)].remarks
      }));

      this.examService.recordGrades(this.examId, grades).subscribe(() => {
        alert('Grades saved successfully!');
        this.router.navigate(['/dashboard/exams']);
      });
    }
  }
}
