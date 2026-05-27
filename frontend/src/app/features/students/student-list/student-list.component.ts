import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <h2>Students List</h2>
    <table mat-table [dataSource]="students" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let student"> {{student.user.firstname}} {{student.user.lastname}} </td>
      </ng-container>

      <ng-container matColumnDef="admissionNumber">
        <th mat-header-cell *matHeaderCellDef> Admission No. </th>
        <td mat-cell *matCellDef="let student"> {{student.admissionNumber}} </td>
      </ng-container>

      <ng-container matColumnDef="section">
        <th mat-header-cell *matHeaderCellDef> Section </th>
        <td mat-cell *matCellDef="let student"> {{student.section.name}} ({{student.section.classLevel.name}}) </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  displayedColumns: string[] = ['name', 'admissionNumber', 'section'];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }
}
