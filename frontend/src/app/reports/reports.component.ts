import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { Worker } from '../models/worker.models';
import { Attendance } from '../models/attendance.models';
import { WorkerService } from '../services/worker.service';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="reports-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Attendance & Payroll Reports</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="reportForm" class="report-form">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Start Date</mat-label>
                <input matInput [matDatepicker]="startPicker" formControlName="startDate">
                <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                <mat-datepicker #startPicker></mat-datepicker>
                <mat-error *ngIf="reportForm.get('startDate')?.hasError('required')">
                  Start date is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>End Date</mat-label>
                <input matInput [matDatepicker]="endPicker" formControlName="endDate">
                <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                <mat-datepicker #endPicker></mat-datepicker>
                <mat-error *ngIf="reportForm.get('endDate')?.hasError('required')">
                  End date is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Worker (Optional)</mat-label>
                <mat-select formControlName="workerId">
                  <mat-option [value]="null">All Workers</mat-option>
                  <mat-option *ngFor="let worker of workers" [value]="worker.id">
                    {{ worker.name }} - {{ worker.position }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="button-group">
              <button mat-raised-button color="primary" (click)="generateReport()" 
                      [disabled]="reportForm.invalid || isLoading">
                <mat-icon>assessment</mat-icon>
                Generate Report
              </button>
              <button mat-raised-button color="accent" (click)="exportReport()" 
                      [disabled]="!reportData.length || isLoading">
                <mat-icon>download</mat-icon>
                Export CSV
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="report-results" *ngIf="reportData.length > 0">
        <mat-card-header>
          <mat-card-title>Report Results</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="summary-cards">
            <mat-card class="summary-card">
              <mat-card-content>
                <div class="summary-item">
                  <span class="summary-label">Total Workers:</span>
                  <span class="summary-value">{{ summary.totalWorkers }}</span>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="summary-card">
              <mat-card-content>
                <div class="summary-item">
                  <span class="summary-label">Present Days:</span>
                  <span class="summary-value present">{{ summary.totalPresent }}</span>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="summary-card">
              <mat-card-content>
                <div class="summary-item">
                  <span class="summary-label">Absent Days:</span>
                  <span class="summary-value absent">{{ summary.totalAbsent }}</span>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="summary-card">
              <mat-card-content>
                <div class="summary-item">
                  <span class="summary-label">Total Payroll:</span>
                  <span class="summary-value payroll">{{ summary.totalPayroll.toFixed(2) }}</span>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="reportData" class="report-table">
              <ng-container matColumnDef="workerName">
                <th mat-header-cell *matHeaderCellDef>Worker</th>
                <td mat-cell *matCellDef="let row">{{ row.workerName }}</td>
              </ng-container>

              <ng-container matColumnDef="position">
                <th mat-header-cell *matHeaderCellDef>Position</th>
                <td mat-cell *matCellDef="let row">{{ row.position }}</td>
              </ng-container>

              <ng-container matColumnDef="presentDays">
                <th mat-header-cell *matHeaderCellDef>Present Days</th>
                <td mat-cell *matCellDef="let row">{{ row.presentDays }}</td>
              </ng-container>

              <ng-container matColumnDef="absentDays">
                <th mat-header-cell *matHeaderCellDef>Absent Days</th>
                <td mat-cell *matCellDef="let row">{{ row.absentDays }}</td>
              </ng-container>

              <ng-container matColumnDef="dailySalary">
                <th mat-header-cell *matHeaderCellDef>Daily Salary</th>
                <td mat-cell *matCellDef="let row">{{ row.dailySalary.toFixed(2) }}</td>
              </ng-container>

              <ng-container matColumnDef="totalEarnings">
                <th mat-header-cell *matHeaderCellDef>Total Earnings</th>
                <td mat-cell *matCellDef="let row" class="earnings">{{ row.totalEarnings.toFixed(2) }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="loading-spinner" *ngIf="isLoading">
        <mat-spinner></mat-spinner>
      </div>

      <div class="no-data" *ngIf="!isLoading && reportData.length === 0 && hasGenerated">
        <p>No data found for the selected criteria.</p>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .report-form {
      padding: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .button-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .report-results {
      margin-top: 1rem;
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .summary-card {
      text-align: center;
    }

    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .summary-label {
      font-size: 0.875rem;
      color: #666;
    }

    .summary-value {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .summary-value.present {
      color: #4caf50;
    }

    .summary-value.absent {
      color: #f44336;
    }

    .summary-value.payroll {
      color: #2196f3;
    }

    .table-container {
      overflow-x: auto;
    }

    .report-table {
      width: 100%;
      min-width: 800px;
    }

    .earnings {
      font-weight: 600;
      color: #4caf50;
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .no-data {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    mat-form-field {
      width: 100%;
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `]
})
export class ReportsComponent implements OnInit {
  workers: Worker[] = [];
  reportData: any[] = [];
  displayedColumns: string[] = ['workerName', 'position', 'presentDays', 'absentDays', 'dailySalary', 'totalEarnings'];
  isLoading = false;
  hasGenerated = false;

  reportForm = this.fb.group({
    startDate: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), [Validators.required]],
    endDate: [new Date(), [Validators.required]],
    workerId: [null]
  });

  summary = {
    totalWorkers: 0,
    totalPresent: 0,
    totalAbsent: 0,
    totalPayroll: 0
  };

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  loadWorkers(): void {
    this.workerService.getAllWorkers().subscribe({
      next: (workers) => {
        this.workers = workers;
      },
      error: (error) => {
        console.error('Error loading workers:', error);
      }
    });
  }

  generateReport(): void {
    if (this.reportForm.valid) {
      this.isLoading = true;
      this.hasGenerated = true;
      const formValue = this.reportForm.value;
      const startDate = formValue.startDate!.toISOString().split('T')[0];
      const endDate = formValue.endDate!.toISOString().split('T')[0];

      if (formValue.workerId) {
        this.generateWorkerReport(formValue.workerId!, startDate, endDate);
      } else {
        this.generateAllWorkersReport(startDate, endDate);
      }
    }
  }

  generateWorkerReport(workerId: number, startDate: string, endDate: string): void {
    this.attendanceService.getAttendanceByWorkerAndDateRange(workerId, startDate, endDate).subscribe({
      next: (attendance) => {
        const worker = this.workers.find(w => w.id === workerId);
        if (worker) {
          const presentDays = attendance.filter(a => a.status === 'PRESENT').length;
          const absentDays = attendance.filter(a => a.status === 'ABSENT').length;
          const totalEarnings = presentDays * worker.dailySalary;

          this.reportData = [{
            workerName: worker.name,
            position: worker.position,
            presentDays,
            absentDays,
            dailySalary: worker.dailySalary,
            totalEarnings
          }];

          this.updateSummary();
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error generating report:', error);
      }
    });
  }

  generateAllWorkersReport(startDate: string, endDate: string): void {
    const reports: any[] = [];
    let completed = 0;

    this.workers.forEach(worker => {
      this.attendanceService.getAttendanceByWorkerAndDateRange(worker.id, startDate, endDate).subscribe({
        next: (attendance) => {
          const presentDays = attendance.filter(a => a.status === 'PRESENT').length;
          const absentDays = attendance.filter(a => a.status === 'ABSENT').length;
          const totalEarnings = presentDays * worker.dailySalary;

          reports.push({
            workerName: worker.name,
            position: worker.position,
            presentDays,
            absentDays,
            dailySalary: worker.dailySalary,
            totalEarnings
          });

          completed++;
          if (completed === this.workers.length) {
            this.reportData = reports;
            this.updateSummary();
            this.isLoading = false;
          }
        },
        error: (error) => {
          completed++;
          if (completed === this.workers.length) {
            this.isLoading = false;
          }
          console.error('Error generating report for worker:', error);
        }
      });
    });
  }

  updateSummary(): void {
    this.summary.totalWorkers = this.reportData.length;
    this.summary.totalPresent = this.reportData.reduce((sum, row) => sum + row.presentDays, 0);
    this.summary.totalAbsent = this.reportData.reduce((sum, row) => sum + row.absentDays, 0);
    this.summary.totalPayroll = this.reportData.reduce((sum, row) => sum + row.totalEarnings, 0);
  }

  exportReport(): void {
    const csv = this.convertToCSV(this.reportData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(data: any[]): string {
    const headers = ['Worker Name', 'Position', 'Present Days', 'Absent Days', 'Daily Salary', 'Total Earnings'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.workerName,
        row.position,
        row.presentDays,
        row.absentDays,
        row.dailySalary.toFixed(2),
        row.totalEarnings.toFixed(2)
      ].join(','))
    ].join('\n');
    
    return csvContent;
  }
}
