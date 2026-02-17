import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WorkerService } from '../services/worker.service';
import { AttendanceService } from '../services/attendance.service';
import { Worker } from '../models/worker.models';
import { Attendance, AttendanceRequest } from '../models/attendance.models';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceComponent implements OnInit {
  workers: Worker[] = [];
  todayAttendance: Attendance[] = [];
  filteredWorkers: Worker[] = [];
  attendanceStatus: { [key: number]: 'PRESENT' | 'ABSENT' } = {};
  absentReasons: { [key: number]: string } = {};
  attendanceForm: FormGroup;
  isLoading = false;
  isLoadingWorkers = false;
  isLoadingAttendance = false;
  todayDate = new Date().toISOString().split('T')[0];
  presentCount = 0;
  absentCount = 0;
  totalWorkers = 0;

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService,
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.attendanceForm = this.fb.group({
      date: [this.todayDate, Validators.required]
    });
  }

  ngOnInit() {
    this.loadWorkers();
    this.loadTodayAttendance();
    this.initializeAttendanceStatus();
  }

  loadWorkers(): void {
    this.isLoadingWorkers = true;
    this.cdr.detectChanges();

    this.workerService.getAllWorkers().subscribe({
      next: (workers) => {
        this.workers = workers;
        this.filteredWorkers = workers;
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
  }

  loadTodayAttendance(): void {
    this.isLoadingAttendance = true;
    this.cdr.detectChanges();

    this.attendanceService.getAttendanceByDate(this.todayDate).subscribe({
      next: (attendance) => {
        this.todayAttendance = attendance;
        this.presentCount = attendance.length;
        this.absentCount = this.totalWorkers - attendance.length;
        this.updateAttendanceStatus(attendance);
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

  initializeAttendanceStatus(): void {
    this.workers.forEach(worker => {
      this.attendanceStatus[worker.id] = 'PRESENT';
    });
  }

  updateAttendanceStatus(attendance: Attendance[]): void {
    this.attendanceStatus = {};
    this.workers.forEach(worker => {
      const hasAttendance = attendance.find(a => a.workerId === worker.id);
      this.attendanceStatus[worker.id] = hasAttendance ? hasAttendance.status : 'PRESENT';
    });
  }

  setAttendanceStatus(workerId: number, status: 'PRESENT' | 'ABSENT'): void {
    this.attendanceStatus[workerId] = status;
    this.cdr.detectChanges();
  }

  setAllPresent(): void {
    this.workers.forEach(worker => {
      this.attendanceStatus[worker.id] = 'PRESENT';
    });
    this.cdr.detectChanges();
  }

  setAllAbsent(): void {
    this.workers.forEach(worker => {
      this.attendanceStatus[worker.id] = 'ABSENT';
    });
    this.cdr.detectChanges();
  }

  setAbsentReason(workerId: number, event: any): void {
    this.absentReasons[workerId] = event.target.value;
    this.cdr.detectChanges();
  }

  getSavedAttendanceTime(workerId: number): string | null {
    const attendance = this.todayAttendance.find(a => a.workerId === workerId);
    return attendance ? attendance.createdAt : null;
  }

  getDailySalary(monthlySalary: number): number {
    return monthlySalary / 30; // Calculate daily rate based on 30-day month
  }

  getDaysPresent(workerId: number): number {
    // For now, we'll count today if marked as present
    // In a real implementation, you'd count all present days in the month
    return this.attendanceStatus[workerId] === 'PRESENT' ? 1 : 0;
  }

  getEarnedAmount(workerId: number, monthlySalary: number): number {
    const dailyRate = this.getDailySalary(monthlySalary);
    const daysPresent = this.getDaysPresent(workerId);
    return dailyRate * daysPresent;
  }

  getAbsentReasonDisplay(reason: string): string {
    const reasonMap: { [key: string]: string } = {
      'sick': 'Sick Leave',
      'vacation': 'Vacation',
      'personal': 'Personal Leave',
      'late': 'Late Arrival',
      'half-day': 'Half Day',
      'emergency': 'Emergency',
      'other': 'Other'
    };
    return reasonMap[reason] || reason;
  }

  saveIndividualAttendance(workerId: number): void {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return;

    this.isLoading = true;
    const request: AttendanceRequest = {
      workerId: workerId,
      date: this.todayDate,
      status: this.attendanceStatus[workerId] || 'PRESENT'
    };

    this.attendanceService.markAttendance(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open(`Attendance saved for ${worker.name}`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadTodayAttendance();
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error saving attendance:', error);
        this.snackBar.open('Error saving attendance: ' + (error.message || 'Unknown error'), 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  updateWorkerAttendance(workerId: number): void {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return;

    // For now, we'll just show a message. In a real implementation, 
    // you'd open a dialog or form to update the attendance
    this.snackBar.open(`Update functionality for ${worker.name} - Coming soon!`, 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }

  deleteWorkerAttendance(workerId: number): void {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return;

    // Find the attendance record for this worker
    const attendance = this.todayAttendance.find(a => a.workerId === workerId);
    if (!attendance) return;

    if (confirm(`Are you sure you want to delete attendance for ${worker.name}?`)) {
      // For now, we'll just show a message since the backend doesn't support delete yet
      this.snackBar.open(`Delete functionality for ${worker.name} - Coming soon!`, 'Close', {
        duration: 3000,
        panelClass: ['info-snackbar']
      });
    }
  }

  saveAttendance(): void {
    if (this.workers.length === 0) {
      this.snackBar.open('No workers available', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isLoading = true;
    const date = this.todayDate; // Use today's date automatically

    // Mark attendance for all workers with their selected status
    let completedCount = 0;
    const totalCount = this.workers.length;

    this.workers.forEach(worker => {
      const request: AttendanceRequest = {
        workerId: worker.id,
        date: date,
        status: this.attendanceStatus[worker.id] || 'PRESENT'
      };

      this.attendanceService.markAttendance(request).subscribe({
        next: () => {
          completedCount++;
          if (completedCount === totalCount) {
            this.isLoading = false;
            this.snackBar.open(`Attendance saved for all ${totalCount} workers`, 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadTodayAttendance();
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error saving attendance:', error);
          this.snackBar.open('Error saving attendance: ' + (error.message || 'Unknown error'), 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    });
  }

  updateAttendance(attendance: Attendance): void {
    // TODO: Implement update attendance functionality
    this.snackBar.open('Update functionality coming soon', 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }

  deleteAttendance(attendanceId: number): void {
    // TODO: Implement delete attendance functionality when backend supports it
    this.snackBar.open('Delete functionality coming soon', 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }
}
