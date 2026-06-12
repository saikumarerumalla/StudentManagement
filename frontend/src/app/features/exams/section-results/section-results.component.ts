import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AcademicService } from '../../../core/services/academic.service';
import { ExamService } from '../../../core/services/exam.service';

@Component({
  selector: 'app-section-results',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatSelectModule, FormsModule],
  template: `
    <div class="results-container">
      <h2>Class/Section Performance Dashboard</h2>

      <div class="filters">
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
          <mat-select [(ngModel)]="selectedSectionId" (selectionChange)="loadSectionSummary()">
            @for (section of sections; track section.id) {
              <mat-option [value]="section.id">{{section.name}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      @if (summary) {
        <table mat-table [dataSource]="summary.studentPerformances" class="mat-elevation-z8">
          <ng-container matColumnDef="studentName">
            <th mat-header-cell *matHeaderCellDef> Student Name </th>
            <td mat-cell *matCellDef="let perf"> {{perf.studentName}} </td>
          </ng-container>

          <ng-container matColumnDef="averagePercentage">
            <th mat-header-cell *matHeaderCellDef> Average % </th>
            <td mat-cell *matCellDef="let perf"> {{perf.averagePercentage | number:'1.2-2'}}% </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      }
    </div>
  `,
  styles: [`
    .results-container { padding: 20px; }
    .filters { display: flex; gap: 20px; margin-bottom: 20px; }
    mat-form-field { width: 250px; }
    table { width: 100%; }
  `]
})
export class SectionResultsComponent implements OnInit {
  classes: any[] = [];
  sections: any[] = [];
  summary: any;
  selectedClassId?: number;
  selectedSectionId?: number;
  displayedColumns: string[] = ['studentName', 'averagePercentage'];

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
      this.summary = null;
    }
  }

  loadSectionSummary() {
    if (this.selectedSectionId) {
      this.examService.getSectionSummary(this.selectedSectionId).subscribe(data => this.summary = data);
    }
  }
}
