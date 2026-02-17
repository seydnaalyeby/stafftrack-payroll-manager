import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { WorkerService } from '../services/worker.service';
import { AttendanceService } from '../services/attendance.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageSwitcherComponent } from '../shared/language-switcher/language-switcher.component';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  template: `
    <div class="premium-dashboard">
      <!-- Elegant Header -->
      <header class="dashboard-header">
        <div class="header-container">
          <div class="header-left">
            <div class="logo-section">
              <div class="logo-circle">
                <mat-icon class="logo-icon">business</mat-icon>
              </div>
              <div class="logo-text">
                <h1 class="logo-title">{{ 'app.title' | translate }}</h1>
                <p class="logo-subtitle">{{ 'app.subtitle' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="header-stats">
              <div class="header-stat">
                <span class="stat-number">{{ totalWorkers }}</span>
                <span class="stat-label">{{ 'nav.workers' | translate }}</span>
              </div>
              <div class="header-stat">
                <span class="stat-number">{{ todayAttendance }}</span>
                <span class="stat-label">{{ 'dashboard.kpi.todaysAttendance' | translate }}</span>
              </div>
            </div>
            <div class="header-actions">
              <app-language-switcher></app-language-switcher>
              <button class="action-btn primary" (click)="navigateToWorkers()">
                <mat-icon>person_add</mat-icon>
                <span>{{ 'dashboard.quickActions.addWorker' | translate }}</span>
              </button>
              <button class="action-btn secondary" (click)="navigateToAttendance()">
                <mat-icon>check_circle</mat-icon>
                <span>{{ 'dashboard.quickActions.markAttendance' | translate }}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Dashboard Content -->
      <main class="dashboard-main">
        <!-- Welcome Banner -->
        <section class="welcome-banner">
          <div class="banner-content">
            <div class="banner-text">
              <h2 class="banner-title">{{ 'dashboard.welcome' | translate }}</h2>
              <p class="banner-description">{{ 'dashboard.description' | translate }}</p>
            </div>
            <div class="banner-visual">
              <div class="visual-circles">
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- KPI Cards Grid -->
        <section class="kpi-section">
          <div class="section-header">
            <h3 class="section-title">Key Performance Indicators</h3>
            <p class="section-subtitle">{{ 'dashboard.latestEvents' | translate }}</p>
          </div>
          <div class="kpi-grid">
            <div class="kpi-card premium">
              <div class="kpi-header">
                <div class="kpi-icon-wrapper revenue">
                  <mat-icon class="kpi-icon">trending_up</mat-icon>
                </div>
                <div class="kpi-trend positive">
                  <mat-icon class="trend-icon">arrow_upward</mat-icon>
                  <span>+15.3%</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value">$124,563</div>
                <div class="kpi-label">{{ 'dashboard.kpi.monthlyRevenue' | translate }}</div>
                <div class="kpi-description">Total revenue this month</div>
              </div>
            </div>

            <div class="kpi-card premium">
              <div class="kpi-header">
                <div class="kpi-icon-wrapper workers">
                  <mat-icon class="kpi-icon">people</mat-icon>
                </div>
                <div class="kpi-trend positive">
                  <mat-icon class="trend-icon">arrow_upward</mat-icon>
                  <span>+8.1%</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value" *ngIf="!isLoadingWorkers; else loadingWorkers">
                  {{ totalWorkers }}
                </div>
                <ng-template #loadingWorkers>
                  <div class="loading-small">
                    <div class="loading-spinner"></div>
                  </div>
                </ng-template>
                <div class="kpi-label">{{ 'dashboard.kpi.totalWorkers' | translate }}</div>
                <div class="kpi-description">Active employees</div>
              </div>
            </div>

            <div class="kpi-card premium">
              <div class="kpi-header">
                <div class="kpi-icon-wrapper attendance">
                  <mat-icon class="kpi-icon">event_available</mat-icon>
                </div>
                <div class="kpi-trend neutral">
                  <mat-icon class="trend-icon">remove</mat-icon>
                  <span>0.0%</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value" *ngIf="!isLoadingAttendance; else loadingAttendance">
                  {{ todayAttendance }}
                </div>
                <ng-template #loadingAttendance>
                  <div class="loading-small">
                    <div class="loading-spinner"></div>
                  </div>
                </ng-template>
                <div class="kpi-label">{{ 'dashboard.kpi.todaysAttendance' | translate }}</div>
                <div class="kpi-description">Workers present today</div>
              </div>
            </div>

            <div class="kpi-card premium">
              <div class="kpi-header">
                <div class="kpi-icon-wrapper efficiency">
                  <mat-icon class="kpi-icon">speed</mat-icon>
                </div>
                <div class="kpi-trend positive">
                  <mat-icon class="trend-icon">arrow_upward</mat-icon>
                  <span>+5.7%</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value">94.2%</div>
                <div class="kpi-label">{{ 'dashboard.kpi.efficiencyRate' | translate }}</div>
                <div class="kpi-description">Overall productivity</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Analytics and Actions Row -->
        <div class="content-row">
          <!-- Analytics Panel -->
          <section class="analytics-panel">
            <div class="panel-header">
              <h3 class="panel-title">Analytics Overview</h3>
              <div class="panel-actions">
                <button class="panel-btn">Export</button>
                <button class="panel-btn">View All</button>
              </div>
            </div>
            <div class="analytics-content">
              <div class="chart-placeholder">
                <div class="chart-header">
                  <h4>Weekly Performance</h4>
                  <span class="chart-period">Last 7 days</span>
                </div>
                <div class="chart-bars">
                  <div class="bar" style="height: 70%"></div>
                  <div class="bar" style="height: 85%"></div>
                  <div class="bar" style="height: 60%"></div>
                  <div class="bar" style="height: 90%"></div>
                  <div class="bar" style="height: 75%"></div>
                  <div class="bar" style="height: 95%"></div>
                  <div class="bar" style="height: 80%"></div>
                </div>
                <div class="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Quick Actions -->
          <section class="actions-panel">
            <div class="panel-header">
              <h3 class="panel-title">Quick Actions</h3>
            </div>
            <div class="actions-grid">
              <button class="quick-action-card" (click)="navigateToWorkers()">
                <div class="action-icon-wrapper">
                  <mat-icon class="action-icon">person_add</mat-icon>
                </div>
                <div class="action-content">
                  <h4 class="action-title">{{ 'dashboard.quickActions.addWorker' | translate }}</h4>
                  <p class="action-description">Register new employee</p>
                </div>
                <mat-icon class="action-arrow">arrow_forward</mat-icon>
              </button>

              <button class="quick-action-card" (click)="navigateToAttendance()">
                <div class="action-icon-wrapper">
                  <mat-icon class="action-icon">check_circle</mat-icon>
                </div>
                <div class="action-content">
                  <h4 class="action-title">{{ 'dashboard.quickActions.markAttendance' | translate }}</h4>
                  <p class="action-description">Record daily presence</p>
                </div>
                <mat-icon class="action-arrow">arrow_forward</mat-icon>
              </button>

              <button class="quick-action-card" (click)="navigateToReports()">
                <div class="action-icon-wrapper">
                  <mat-icon class="action-icon">assessment</mat-icon>
                </div>
                <div class="action-content">
                  <h4 class="action-title">{{ 'dashboard.quickActions.viewReports' | translate }}</h4>
                  <p class="action-description">{{ 'dashboard.latestEvents' | translate }}</p>
                </div>
                <mat-icon class="action-arrow">arrow_forward</mat-icon>
              </button>

              <button class="quick-action-card">
                <div class="action-icon-wrapper">
                  <mat-icon class="action-icon">settings</mat-icon>
                </div>
                <div class="action-content">
                  <h4 class="action-title">Settings</h4>
                  <p class="action-description">System configuration</p>
                </div>
                <mat-icon class="action-arrow">arrow_forward</mat-icon>
              </button>
            </div>
          </section>
        </div>

        <!-- Recent Activity Table -->
        <section class="activity-section">
          <div class="section-header">
            <h3 class="section-title">{{ 'dashboard.recentActivity' | translate }}</h3>
            <p class="section-subtitle">{{ 'dashboard.latestEvents' | translate }}</p>
          </div>
          <div class="activity-table">
            <div class="table-header">
              <div class="table-cell">Event</div>
              <div class="table-cell">User</div>
              <div class="table-cell">Time</div>
              <div class="table-cell">Status</div>
            </div>
            <div class="table-row">
              <div class="table-cell">
                <div class="cell-content">
                  <mat-icon class="cell-icon success">person_add</mat-icon>
                  <span>New employee added</span>
                </div>
              </div>
              <div class="table-cell">John Doe</div>
              <div class="table-cell">2 hours ago</div>
              <div class="table-cell">
                <span class="status-badge success">Completed</span>
              </div>
            </div>
            <div class="table-row">
              <div class="table-cell">
                <div class="cell-content">
                  <mat-icon class="cell-icon info">check_circle</mat-icon>
                  <span>Attendance marked</span>
                </div>
              </div>
              <div class="table-cell">System</div>
              <div class="table-cell">5 hours ago</div>
              <div class="table-cell">
                <span class="status-badge info">Processing</span>
              </div>
            </div>
            <div class="table-row">
              <div class="table-cell">
                <div class="cell-content">
                  <mat-icon class="cell-icon warning">edit</mat-icon>
                  <span>Profile updated</span>
                </div>
              </div>
              <div class="table-cell">Sarah Smith</div>
              <div class="table-cell">1 day ago</div>
              <div class="table-cell">
                <span class="status-badge warning">Pending</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .premium-dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .dashboard-header {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .logo-icon {
      font-size: 1.5rem;
      color: white;
    }

    .logo-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
      line-height: 1.2;
    }

    .logo-subtitle {
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .header-stats {
      display: flex;
      gap: 2rem;
    }

    .header-stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #718096;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-btn.primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .action-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .action-btn.secondary {
      background: white;
      color: #4a5568;
      border: 1px solid #e2e8f0;
    }

    .action-btn.secondary:hover {
      background: #f7fafc;
      border-color: #cbd5e0;
    }

    .dashboard-main {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .welcome-banner {
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 16px;
      padding: 3rem;
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
    }

    .banner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .banner-text {
      flex: 1;
    }

    .banner-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .banner-description {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      max-width: 500px;
    }

    .banner-visual {
      flex: 0 0 200px;
    }

    .visual-circles {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .circle-1 {
      width: 80px;
      height: 80px;
      top: 20px;
      right: 20px;
      animation: float 6s ease-in-out infinite;
    }

    .circle-2 {
      width: 60px;
      height: 60px;
      bottom: 30px;
      right: 60px;
      animation: float 8s ease-in-out infinite reverse;
    }

    .circle-3 {
      width: 40px;
      height: 40px;
      top: 60px;
      right: 80px;
      animation: float 4s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .section-header {
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
    }

    .section-subtitle {
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }

    .kpi-section {
      margin-bottom: 2rem;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .kpi-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .kpi-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .kpi-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kpi-icon-wrapper.revenue {
      background: linear-gradient(135deg, #48bb78, #38a169);
    }

    .kpi-icon-wrapper.workers {
      background: linear-gradient(135deg, #4299e1, #3182ce);
    }

    .kpi-icon-wrapper.attendance {
      background: linear-gradient(135deg, #ed8936, #dd6b20);
    }

    .kpi-icon-wrapper.efficiency {
      background: linear-gradient(135deg, #9f7aea, #805ad5);
    }

    .kpi-icon {
      font-size: 1.25rem;
      color: white;
    }

    .kpi-trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
    }

    .kpi-trend.positive {
      background: rgba(72, 187, 120, 0.1);
      color: #48bb78;
    }

    .kpi-trend.neutral {
      background: rgba(113, 128, 150, 0.1);
      color: #718096;
    }

    .trend-icon {
      font-size: 0.875rem;
    }

    .kpi-value {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.25rem;
      line-height: 1;
    }

    .kpi-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 0.25rem;
    }

    .kpi-description {
      font-size: 0.75rem;
      color: #718096;
    }

    .content-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .analytics-panel,
    .actions-panel {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .panel-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .panel-actions {
      display: flex;
      gap: 0.5rem;
    }

    .panel-btn {
      padding: 0.5rem 1rem;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .panel-btn:hover {
      background: #edf2f7;
      border-color: #cbd5e0;
    }

    .chart-placeholder {
      background: #f7fafc;
      border-radius: 8px;
      padding: 1.5rem;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .chart-header h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .chart-period {
      font-size: 0.75rem;
      color: #718096;
    }

    .chart-bars {
      display: flex;
      align-items: end;
      gap: 0.5rem;
      height: 120px;
      margin-bottom: 0.5rem;
    }

    .bar {
      flex: 1;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 4px 4px 0 0;
      min-height: 20px;
      transition: all 0.3s ease;
    }

    .bar:hover {
      opacity: 0.8;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #718096;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }

    .quick-action-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
    }

    .quick-action-card:hover {
      background: white;
      border-color: #667eea;
      transform: translateX(4px);
    }

    .action-icon-wrapper {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .action-icon {
      font-size: 1.25rem;
      color: white;
    }

    .action-content {
      flex: 1;
    }

    .action-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 0.25rem 0;
    }

    .action-description {
      font-size: 0.75rem;
      color: #718096;
      margin: 0;
    }

    .action-arrow {
      color: #cbd5e0;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    .quick-action-card:hover .action-arrow {
      color: #667eea;
    }

    .activity-section {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .activity-table {
      overflow-x: auto;
    }

    .table-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1rem;
      padding: 0.75rem 1rem;
      background: #f7fafc;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #4a5568;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .table-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #f7fafc;
      transition: background-color 0.2s ease;
    }

    .table-row:hover {
      background: #f7fafc;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .cell-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cell-icon {
      font-size: 1rem;
      color: #718096;
    }

    .cell-icon.success {
      color: #48bb78;
    }

    .cell-icon.info {
      color: #4299e1;
    }

    .cell-icon.warning {
      color: #ed8936;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-badge.success {
      background: rgba(72, 187, 120, 0.1);
      color: #48bb78;
    }

    .status-badge.info {
      background: rgba(66, 153, 225, 0.1);
      color: #4299e1;
    }

    .status-badge.warning {
      background: rgba(237, 137, 54, 0.1);
      color: #ed8936;
    }

    .loading-small {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e2e8f0;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 1024px) {
      .content-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard-main {
        padding: 1rem;
      }

      .header-container {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .banner-content {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
      }

      .banner-title {
        font-size: 2rem;
      }

      .kpi-grid {
        grid-template-columns: 1fr;
      }

      .table-header,
      .table-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      .table-cell:not(:first-child) {
        display: none;
      }
    }

    /* RTL Support */
    [dir="rtl"] {
      direction: rtl;
    }

    [dir="rtl"] .header-container {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .header-right {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .header-actions {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .banner-content {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .visual-circles {
      transform: scaleX(-1);
    }

    [dir="rtl"] .action-arrow {
      transform: rotate(180deg);
    }

    [dir="rtl"] .table-header,
    [dir="rtl"] .table-row {
      direction: rtl;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalWorkers = 0;
  todayAttendance = 0;
  isLoadingWorkers = false;
  isLoadingAttendance = false;

  constructor(
    private workerService: WorkerService,
    private attendanceService: AttendanceService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoadingWorkers = true;
    this.isLoadingAttendance = true;
    this.cdr.detectChanges();

    // Load workers count
    this.workerService.getAllWorkers().subscribe({
      next: (workers) => {
        this.totalWorkers = workers.length;
        this.isLoadingWorkers = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoadingWorkers = false;
        this.cdr.detectChanges();
        console.error('Error loading workers:', error);
        this.snackBar.open('Error loading workers: ' + (error.message || 'Unknown error'), 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });

    // Load today's attendance
    this.attendanceService.getAttendanceByDate(new Date().toISOString().split('T')[0]).subscribe({
      next: (attendance) => {
        this.todayAttendance = attendance.length;
        this.isLoadingAttendance = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoadingAttendance = false;
        this.cdr.detectChanges();
        console.error('Error loading attendance:', error);
        this.snackBar.open('Error loading attendance: ' + (error.message || 'Unknown error'), 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  navigateToWorkers(): void {
    this.router.navigate(['/workers']);
  }

  navigateToAttendance(): void {
    this.router.navigate(['/attendance']);
  }

  navigateToReports(): void {
    this.router.navigate(['/reports']);
  }
}
