import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <button class="btn btn-ghost btn-sm menu-toggle" (click)="toggleSidebar()" *ngIf="isMobile">
            <mat-icon>menu</mat-icon>
          </button>
          <div class="logo">
            <mat-icon class="logo-icon">business</mat-icon>
            <span class="logo-text">EquipePay</span>
          </div>
        </div>
        
        <div class="header-center">
          <nav class="nav-menu">
            <a routerLink="/dashboard" class="nav-link" routerLinkActive="active">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
            <a routerLink="/workers" class="nav-link" routerLinkActive="active">
              <mat-icon>people</mat-icon>
              <span>Workers</span>
            </a>
            <a routerLink="/attendance" class="nav-link" routerLinkActive="active">
              <mat-icon>event_available</mat-icon>
              <span>Attendance</span>
            </a>
          </nav>
        </div>
        
        <div class="header-right">
          <div class="user-menu">
            <button class="btn btn-ghost btn-sm" (click)="toggleUserMenu()">
              <mat-icon>account_circle</mat-icon>
              <span class="user-name">{{ getUsername() }}</span>
              <mat-icon>arrow_drop_down</mat-icon>
            </button>
            <div class="user-dropdown" *ngIf="showUserMenu">
              <div class="dropdown-item">
                <mat-icon>person</mat-icon>
                <span>Profile</span>
              </div>
              <div class="dropdown-item">
                <mat-icon>settings</mat-icon>
                <span>Settings</span>
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-item" (click)="logout()">
                <mat-icon>logout</mat-icon>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md) var(--spacing-lg);
      height: 64px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--primary-color);
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

    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .nav-menu {
      display: flex;
      gap: var(--spacing-xs);
      background: var(--bg-secondary);
      padding: var(--spacing-xs);
      border-radius: var(--radius-lg);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      position: relative;
    }

    .nav-link:hover {
      color: var(--primary-color);
      background: var(--bg-primary);
    }

    .nav-link.active {
      color: var(--primary-color);
      background: var(--bg-primary);
      box-shadow: var(--shadow-sm);
    }

    .nav-link mat-icon {
      font-size: 1.125rem;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .user-menu {
      position: relative;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      min-width: 200px;
      z-index: 1000;
      margin-top: var(--spacing-xs);
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      cursor: pointer;
      transition: background-color var(--transition-fast);
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .dropdown-item:hover {
      background: var(--bg-secondary);
    }

    .dropdown-divider {
      height: 1px;
      background: var(--border-light);
      margin: var(--spacing-xs) 0;
    }

    .menu-toggle {
      display: none;
    }

    @media (max-width: 768px) {
      .header-center {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .user-name {
        display: none;
      }

      .header-content {
        padding: var(--spacing-sm) var(--spacing-md);
      }
    }
  `]
})
export class HeaderComponent {
  showUserMenu = false;
  isMobile = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
  }

  getUsername(): string {
    const user = this.authService.getUser();
    return user?.username || 'User';
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleSidebar() {
    // Sidebar toggle logic
    document.querySelector('.app-sidebar')?.classList.toggle('open');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
