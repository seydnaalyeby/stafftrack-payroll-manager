import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <aside class="app-sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <div class="logo">
            <mat-icon class="logo-icon">business</mat-icon>
            <span class="logo-text">{{ 'app.title' | translate }}</span>
          </div>
          <button class="btn btn-ghost btn-sm close-btn" (click)="closeSidebar()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <h3 class="nav-section-title">Main</h3>
            <a routerLink="/dashboard" class="nav-item" routerLinkActive="active" (click)="closeSidebar()">
              <mat-icon class="nav-icon">dashboard</mat-icon>
              <span class="nav-text">{{ 'nav.dashboard' | translate }}</span>
              <span class="nav-badge" *ngIf="notificationCount > 0">{{ notificationCount }}</span>
            </a>
            <a routerLink="/workers" class="nav-item" routerLinkActive="active" (click)="closeSidebar()">
              <mat-icon class="nav-icon">people</mat-icon>
              <span class="nav-text">{{ 'nav.workers' | translate }}</span>
            </a>
            <a routerLink="/attendance" class="nav-item" routerLinkActive="active" (click)="closeSidebar()">
              <mat-icon class="nav-icon">event_available</mat-icon>
              <span class="nav-text">{{ 'nav.attendance' | translate }}</span>
            </a>
          </div>

          <div class="nav-section">
            <h3 class="nav-section-title">Management</h3>
            <a routerLink="/salary" class="nav-item" routerLinkActive="active" (click)="closeSidebar()">
              <mat-icon class="nav-icon">payments</mat-icon>
              <span class="nav-text">{{ 'nav.salary' | translate }}</span>
            </a>
            <a routerLink="/reports" class="nav-item" routerLinkActive="active" (click)="closeSidebar()">
              <mat-icon class="nav-icon">assessment</mat-icon>
              <span class="nav-text">{{ 'nav.reports' | translate }}</span>
            </a>
          </div>
        </nav>

        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="user-avatar">
              <mat-icon>account_circle</mat-icon>
            </div>
            <div class="user-info">
              <div class="user-name">{{ getUsername() }}</div>
              <div class="user-role">Administrator</div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm w-full" (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>{{ 'auth.logout' | translate }}</span>
          </button>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar-content {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
    }

    .sidebar-header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-weight: 700;
      font-size: 1.25rem;
    }

    .logo-icon {
      font-size: 1.5rem;
      color: var(--primary-color);
    }

    .logo-text {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .close-btn {
      display: none;
    }

    .sidebar-nav {
      flex: 1;
      padding: var(--spacing-md);
      overflow-y: auto;
    }

    .nav-section {
      margin-bottom: var(--spacing-lg);
    }

    .nav-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 var(--spacing-sm) 0;
      padding: 0 var(--spacing-sm);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      margin: var(--spacing-xs) 0;
      border-radius: var(--radius-md);
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all var(--transition-fast);
      position: relative;
    }

    .nav-item:hover {
      background: var(--bg-secondary);
      color: var(--primary-color);
      transform: translateX(4px);
    }

    .nav-item.active {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: var(--text-inverse);
      box-shadow: var(--shadow-md);
    }

    .nav-icon {
      font-size: 1.25rem;
      min-width: 24px;
    }

    .nav-text {
      flex: 1;
      font-size: 0.875rem;
    }

    .nav-badge {
      background: var(--error-color);
      color: var(--text-inverse);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      min-width: 18px;
      text-align: center;
    }

    .sidebar-footer {
      padding: var(--spacing-lg);
      border-top: 1px solid var(--border-light);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-inverse);
    }

    .user-avatar mat-icon {
      font-size: 1.5rem;
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .w-full {
      width: 100%;
    }

    @media (max-width: 768px) {
      .close-btn {
        display: flex;
      }
    }
  `]
})
export class SidebarComponent {
  notificationCount = 3; // This would come from a service

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  getUsername(): string {
    const user = this.authService.getUser();
    return user?.username || 'User';
  }

  closeSidebar() {
    document.querySelector('.app-sidebar')?.classList.remove('open');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
