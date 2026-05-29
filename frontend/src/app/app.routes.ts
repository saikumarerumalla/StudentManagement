import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path: 'overview', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
        { path: 'students', loadComponent: () => import('./features/students/student-list/student-list.component').then(m => m.StudentListComponent) },
        { path: 'attendance', loadComponent: () => import('./features/attendance/mark-attendance/mark-attendance.component').then(m => m.MarkAttendanceComponent) },
        { path: 'fees', loadComponent: () => import('./features/fees/fee-list/fee-list.component').then(m => m.FeeListComponent) },
        { path: 'exams', loadComponent: () => import('./features/exams/exam-list/exam-list.component').then(m => m.ExamListComponent) },
        { path: 'grades/:id', loadComponent: () => import('./features/exams/grade-entry/grade-entry.component').then(m => m.GradeEntryComponent) },
        { path: 'student-results', loadComponent: () => import('./features/exams/student-results/student-results.component').then(m => m.StudentResultsComponent) },
        { path: 'section-results', loadComponent: () => import('./features/exams/section-results/section-results.component').then(m => m.SectionResultsComponent) }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
