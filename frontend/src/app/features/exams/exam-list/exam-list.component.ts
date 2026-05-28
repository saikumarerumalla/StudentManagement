import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AcademicService } from '../../../core/services/academic.service';
import { ExamService } from '../../../core/services/exam.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule, RouterModule],
  template: `
    <div class="exam-container">
      <h2>Scheduled Exams</h2>

      <mat-form-field appearance="fill">
        <mat-label>Select Class</mat-label>
        <mat-select [(ngModel)]="selectedClassId" (selectionChange)="onClassChange()">
          @for (class of classes; track class.id) {
            <mat-option [value]="class.id">{{class.name}}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Select Section</mat-label>
        <mat-select [(ngModel)]="selectedSectionId" (selectionChange)="loadExams()">
          @for (section of sections; track section.id) {
            <mat-option [value]="section.id">{{section.name}}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      @if (exams.length > 0) {
        <table mat-table [dataSource]="exams" class="mat-elevation-z8">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Exam Name </th>
            <td mat-cell *matCellDef="let exam"> {{exam.name}} </td>
          </ng-container>

          <ng-container matColumnDef="subject">
            <th mat-header-cell *matHeaderCellDef> Subject </th>
            <td mat-cell *matCellDef="let exam"> {{exam.subject.name}} </td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef> Date </th>
            <td mat-cell *matCellDef="let exam"> {{exam.date}} </td>
          </ng-container>

          <ng-container matColumnDef="maxMarks">
            <th mat-header-cell *matHeaderCellDef> Max Marks </th>
            <td mat-cell *matCellDef="let exam"> {{exam.maxMarks}} </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let exam">
              <a mat-button color="primary" [routerLink]="['/dashboard/grades', exam.id]">Enter Grades</a>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      }
    </div>
  `,
  styles: [`
    .exam-container { padding: 20px; }
    mat-form-field { width: 250px; margin-right: 20px; margin-bottom: 20px; }
    table { width: 100%; }
  `]
})
export class ExamListComponent implements OnInit {
  classes: any[] = [];
  sections: any[] = [];
  exams: any[] = [];
  selectedClassId?: number;
  selectedSectionId?: number;
  displayedColumns: string[] = ['name', 'subject', 'date', 'maxMarks', 'actions'];

  constructor(
    private academicService: AcademicService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.academicService.getAllClasses().subscribe(data => this.classes = data);
  }

  onClassChange() {
    if (this.selectedClassId) {
      this.academicService.getSectionsByClass(this.selectedClassId).subscribe(data => this.sections = data);
      this.exams = [];
    }
  }

  loadExams() {
    if (this.selectedSectionId) {
      this.examService.getExamsBySection(this.selectedSectionId).subscribe(data => this.exams = data);
    }
  }
}
