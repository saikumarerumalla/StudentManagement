import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { AcademicService } from '../../../core/services/academic.service';
import { StudentService } from '../../../core/services/student.service';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule
  ],
  template: `
    <div class="attendance-container">
      <h2>Daily Attendance</h2>
      
      <div class="filters">
        <mat-form-field appearance="fill">
          <mat-label>Class</mat-label>
          <mat-select [(ngModel)]="selectedClassId" (selectionChange)="onClassChange()">
            @for (class of classes; track class.id) {
              <mat-option [value]="class.id">{{class.name}}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Section</mat-label>
          <mat-select [(ngModel)]="selectedSectionId" (selectionChange)="onSectionChange()">
            @for (section of sections; track section.id) {
              <mat-option [value]="section.id">{{section.name}}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="selectedDate">
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
      </div>

      @if (students.length > 0) {
        <table mat-table [dataSource]="students" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-cell *matCellDef="let student"> {{student.user.firstname}} {{student.user.lastname}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Status </th>
            <td mat-cell *matCellDef="let student">
              <mat-radio-group [(ngModel)]="attendanceData[student.id]">
                <mat-radio-button value="PRESENT">Present</mat-radio-button>
                <mat-radio-button value="ABSENT">Absent</mat-radio-button>
              </mat-radio-group>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div class="actions">
          <button mat-raised-button color="primary" (click)="saveAttendance()">Save Attendance</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .attendance-container { padding: 20px; }
    .filters { display: flex; gap: 20px; margin-bottom: 20px; }
    table { width: 100%; }
    .actions { margin-top: 20px; display: flex; justify-content: flex-end; }
  `]
})
export class MarkAttendanceComponent implements OnInit {
  classes: any[] = [];
  sections: any[] = [];
  students: any[] = [];
  selectedClassId?: number;
  selectedSectionId?: number;
  selectedDate: Date = new Date();
  attendanceData: { [key: number]: string } = {};
  displayedColumns: string[] = ['name', 'status'];

  constructor(
    private academicService: AcademicService,
    private studentService: StudentService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.academicService.getAllClasses().subscribe(data => this.classes = data);
  }

  onClassChange() {
    if (this.selectedClassId) {
      this.academicService.getSectionsByClass(this.selectedClassId).subscribe(data => this.sections = data);
      this.students = [];
    }
  }

  onSectionChange() {
    if (this.selectedSectionId) {
      this.studentService.getStudentsBySection(this.selectedSectionId).subscribe(data => {
        this.students = data;
        this.students.forEach(s => this.attendanceData[s.id] = 'PRESENT');
      });
    }
  }

  saveAttendance() {
    const records = Object.keys(this.attendanceData).map(id => ({
      studentId: parseInt(id),
      status: this.attendanceData[parseInt(id)],
      remarks: ''
    }));

    const payload = {
      date: this.selectedDate.toISOString().split('T')[0],
      sectionId: this.selectedSectionId,
      records: records
    };

    this.attendanceService.markAttendance(payload).subscribe(() => {
      alert('Attendance saved successfully!');
    });
  }
}
