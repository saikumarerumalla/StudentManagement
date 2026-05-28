import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Student Management System</span>
      <span class="spacer"></span>
      <button mat-button (click)="logout()">
        <mat-icon>logout</mat-icon>
        Logout
      </button>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard/overview" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/dashboard/students" routerLinkActive="active">
            <mat-icon matListItemIcon>person</mat-icon>
            <span matListItemTitle>Students</span>
          </a>
          <a mat-list-item routerLink="/dashboard/academic" routerLinkActive="active">
            <mat-icon matListItemIcon>school</mat-icon>
            <span matListItemTitle>Academic</span>
          </a>
          <a mat-list-item routerLink="/dashboard/attendance" routerLinkActive="active">
            <mat-icon matListItemIcon>event_available</mat-icon>
            <span matListItemTitle>Attendance</span>
          </a>
          <a mat-list-item routerLink="/dashboard/fees" routerLinkActive="active">
            <mat-icon matListItemIcon>payments</mat-icon>
            <span matListItemTitle>Fees</span>
          </a>
          <a mat-list-item routerLink="/dashboard/exams" routerLinkActive="active">
            <mat-icon matListItemIcon>assignment</mat-icon>
            <span matListItemTitle>Exams</span>
          </a>
          <a mat-list-item routerLink="/dashboard/student-results" routerLinkActive="active">
            <mat-icon matListItemIcon>bar_chart</mat-icon>
            <span matListItemTitle>Student Results</span>
          </a>
          <a mat-list-item routerLink="/dashboard/section-results" routerLinkActive="active">
            <mat-icon matListItemIcon>assessment</mat-icon>
            <span matListItemTitle>Class Performance</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .sidenav-container {
      height: calc(100vh - 64px);
    }
    mat-sidenav {
      width: 250px;
    }
    .content {
      padding: 20px;
    }
    .active {
      background: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
