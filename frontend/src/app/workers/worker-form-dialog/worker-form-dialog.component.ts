import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Worker, WorkerRequest } from '../../models/worker.models';
import { WorkerService } from '../../services/worker.service';

export interface WorkerDialogData {
  mode: 'add' | 'edit';
  worker?: Worker;
}

@Component({
  selector: 'app-worker-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>
        {{ data.mode === 'add' ? 'Add New Worker' : 'Edit Worker' }}
      </h2>
      
      <mat-dialog-content>
        <form [formGroup]="workerForm" class="worker-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter worker name">
            <mat-error *ngIf="workerForm.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone</mat-label>
            <input matInput formControlName="phone" placeholder="Enter phone number">
            <mat-error *ngIf="workerForm.get('phone')?.hasError('required')">
              Phone is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Position</mat-label>
            <input matInput formControlName="position" placeholder="Enter position">
            <mat-error *ngIf="workerForm.get('position')?.hasError('required')">
              Position is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Monthly Salary</mat-label>
            <input matInput type="number" formControlName="monthlySalary" placeholder="Enter monthly salary">
            <mat-error *ngIf="workerForm.get('monthlySalary')?.hasError('required')">
              Monthly salary is required
            </mat-error>
            <mat-error *ngIf="workerForm.get('monthlySalary')?.hasError('min')">
              Salary must be greater than 0
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Join Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="joinDate">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="workerForm.get('joinDate')?.hasError('required')">
              Join date is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Photo URL (Optional)</mat-label>
            <input matInput formControlName="photoUrl" placeholder="Enter photo URL">
          </mat-form-field>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSave()" 
                [disabled]="workerForm.invalid || isLoading">
          <span *ngIf="!isLoading">{{ data.mode === 'add' ? 'Add' : 'Save' }}</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 1rem;
      min-width: 400px;
    }

    .worker-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .full-width {
      width: 100%;
    }

    mat-dialog-actions {
      margin-top: 1rem;
    }

    mat-spinner {
      margin: 0 auto;
    }
  `]
})
export class WorkerFormDialogComponent {
  workerForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    position: ['', Validators.required],
    monthlySalary: [0, [Validators.required, Validators.min(0.01)]],
    joinDate: [new Date(), Validators.required],
    photoUrl: ['']
  });

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerService,
    private dialogRef: MatDialogRef<WorkerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkerDialogData
  ) {
    if (data.mode === 'edit' && data.worker) {
      this.workerForm.patchValue({
        name: data.worker.name,
        phone: data.worker.phone,
        position: data.worker.position,
        monthlySalary: data.worker.monthlySalary,
        joinDate: new Date(data.worker.joinDate),
        photoUrl: data.worker.photoUrl || ''
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.workerForm.valid) {
      this.isLoading = true;
      const formValue = this.workerForm.value;
      
      const workerRequest: WorkerRequest = {
        name: formValue.name!,
        phone: formValue.phone!,
        position: formValue.position!,
        monthlySalary: formValue.monthlySalary!,
        joinDate: formValue.joinDate!.toISOString().split('T')[0],
        photoUrl: formValue.photoUrl || undefined
      };

      if (this.data.mode === 'add') {
        this.workerService.createWorker(workerRequest).subscribe({
          next: () => {
            this.isLoading = false;
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error creating worker:', error);
          }
        });
      } else {
        this.workerService.updateWorker(this.data.worker!.id, workerRequest).subscribe({
          next: () => {
            this.isLoading = false;
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error updating worker:', error);
          }
        });
      }
    }
  }
}
