import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../models/worker.models';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    DatePipe,
    DecimalPipe,
    TranslatePipe
  ],
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit {
  workers: Worker[] = [];
  filteredWorkers: Worker[] = [];
  isLoading = false;
  searchForm: FormGroup;
  selectedWorker: Worker | null = null;
  showAddForm = false;
  showEditForm = false;
  workerForm: FormGroup;
  todayString = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  constructor(
    private workerService: WorkerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });

    this.workerForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      position: ['', [Validators.required]],
      monthlySalary: ['', [Validators.required, Validators.min(0)]],
      joinDate: ['', [Validators.required]],
      photoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadWorkers();
    
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(() => {
      this.filterWorkers();
    });
  }

  loadWorkers(): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.workerService.getAllWorkers().subscribe({
      next: (workers) => {
        this.workers = workers;
        this.filteredWorkers = workers;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error loading workers:', error);
        
        if (error.status === 401 || error.status === 403) {
          this.snackBar.open('Please login to view workers', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open('Error loading workers: ' + (error.message || 'Unknown error'), 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }

  filterWorkers(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value.toLowerCase() || '';
    
    this.filteredWorkers = this.workers.filter(worker =>
      worker.name.toLowerCase().includes(searchTerm) ||
      worker.position.toLowerCase().includes(searchTerm) ||
      worker.phone.includes(searchTerm)
    );
    
    this.cdr.detectChanges();
  }

  showAddWorkerForm(): void {
    this.showAddForm = true;
    this.showEditForm = false;
    this.workerForm.reset({
      id: 0,
      name: '',
      phone: '',
      position: '',
      monthlySalary: '',
      joinDate: new Date().toISOString().split('T')[0],
      photoUrl: ''
    });
    this.cdr.detectChanges();
  }

  showEditWorkerForm(worker: Worker): void {
    this.showEditForm = true;
    this.showAddForm = false;
    this.selectedWorker = worker;
    this.workerForm.patchValue({
      id: worker.id,
      name: worker.name,
      phone: worker.phone,
      position: worker.position,
      monthlySalary: worker.monthlySalary,
      joinDate: worker.joinDate,
      photoUrl: worker.photoUrl || ''
    });
    this.cdr.detectChanges();
  }

  hideForms(): void {
    this.showAddForm = false;
    this.showEditForm = false;
    this.selectedWorker = null;
    this.workerForm.reset();
    this.cdr.detectChanges();
  }

  saveWorker(): void {
    if (this.workerForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const formValue = this.workerForm.value;
    const workerData = {
      ...formValue,
      monthlySalary: parseFloat(formValue.monthlySalary)
    };
    
    if (this.showAddForm) {
      this.addWorker(workerData);
    } else if (this.showEditForm) {
      this.updateWorker(workerData);
    }
  }

  addWorker(workerData: any): void {
    console.log('Adding worker with data:', workerData);
    this.isLoading = true;
    this.cdr.detectChanges();

    this.workerService.createWorker(workerData).subscribe({
      next: (newWorker) => {
        console.log('Worker added successfully:', newWorker);
        this.isLoading = false;
        this.snackBar.open('Worker added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.hideForms();
        this.loadWorkers();
      },
      error: (error) => {
        console.error('Full error object:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
        
        let errorMessage = 'Unknown error';
        if (error.status === 403) {
          errorMessage = 'Access denied. Please login again.';
        } else if (error.status === 401) {
          errorMessage = 'Session expired. Please login again.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid data. Please check your form.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.snackBar.open('Error adding worker: ' + errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  updateWorker(workerData: any): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.workerService.updateWorker(workerData.id, workerData).subscribe({
      next: (updatedWorker) => {
        this.isLoading = false;
        this.snackBar.open('Worker updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.hideForms();
        this.loadWorkers();
      },
      error: (error) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error('Error updating worker:', error);
        
        let errorMessage = 'Unknown error';
        if (error.status === 403) {
          errorMessage = 'Access denied. Please login again.';
        } else if (error.status === 401) {
          errorMessage = 'Session expired. Please login again.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.snackBar.open('Error updating worker: ' + errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deleteWorker(workerId: number): void {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return;
    
    if (confirm(`Are you sure you want to delete ${worker.name}?`)) {
      this.workerService.deleteWorker(workerId).subscribe({
        next: () => {
          this.snackBar.open('Worker deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadWorkers();
        },
        error: (error) => {
          console.error('Error deleting worker:', error);
          this.snackBar.open('Error deleting worker: ' + (error.message || 'Unknown error'), 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  getSalaryColor(salary: number): string {
    if (salary >= 10000) return '#10b981';
    if (salary >= 5000) return '#3b82f6';
    return '#f59e0b';
  }

  getPositionColor(position: string): string {
    const colors: { [key: string]: string } = {
      'Manager': '#8b5cf6',
      'Developer': '#06b6d4',
      'Designer': '#ec4899',
      'Accountant': '#84cc16',
      'HR': '#f97316',
      'Sales': '#ef4444'
    };
    return colors[position] || '#6b7280';
  }
}
