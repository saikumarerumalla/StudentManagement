import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { FeeService } from '../../../core/services/fee.service';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-fee-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule
  ],
  template: `
    <div class="fee-container">
      <h2>Fee Records</h2>

      <mat-form-field appearance="fill">
        <mat-label>Select Student</mat-label>
        <mat-select [(ngModel)]="selectedStudentId" (selectionChange)="loadFees()">
          @for (student of students; track student.id) {
            <mat-option [value]="student.id">
              {{student.user.firstname}} {{student.user.lastname}} ({{student.admissionNumber}})
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      @if (feeRecords.length > 0) {
        <table mat-table [dataSource]="feeRecords" class="mat-elevation-z8">
          <ng-container matColumnDef="feeType">
            <th mat-header-cell *matHeaderCellDef> Fee Type </th>
            <td mat-cell *matCellDef="let record"> {{record.feeType}} </td>
          </ng-container>

          <ng-container matColumnDef="totalAmount">
            <th mat-header-cell *matHeaderCellDef> Total </th>
            <td mat-cell *matCellDef="let record"> {{record.totalAmount | currency}} </td>
          </ng-container>

          <ng-container matColumnDef="paidAmount">
            <th mat-header-cell *matHeaderCellDef> Paid </th>
            <td mat-cell *matCellDef="let record"> {{record.paidAmount | currency}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Status </th>
            <td mat-cell *matCellDef="let record"> {{record.status}} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      }
    </div>
  `,
  styles: [`
    .fee-container { padding: 20px; }
    mat-form-field { width: 300px; margin-bottom: 20px; }
    table { width: 100%; }
  `]
})
export class FeeListComponent implements OnInit {
  students: any[] = [];
  feeRecords: any[] = [];
  selectedStudentId?: number;
  displayedColumns: string[] = ['feeType', 'totalAmount', 'paidAmount', 'status'];

  constructor(
    private studentService: StudentService,
    private feeService: FeeService
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => this.students = data);
  }

  loadFees() {
    if (this.selectedStudentId) {
      this.feeService.getStudentFees(this.selectedStudentId).subscribe(data => this.feeRecords = data);
    }
  }
}
