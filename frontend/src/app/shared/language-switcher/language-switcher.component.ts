import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <div class="language-switcher">
      <button mat-icon-button [matMenuTriggerFor]="languageMenu" class="language-btn">
        <mat-icon>language</mat-icon>
      </button>
      <mat-menu #languageMenu="matMenu" class="language-menu">
        <button mat-menu-item (click)="switchLanguage('en')" 
                [class.active]="currentLanguage === 'en'">
          <span class="flag">🇺🇸</span>
          <span class="lang-name">English</span>
          <mat-icon *ngIf="currentLanguage === 'en'">check</mat-icon>
        </button>
        <button mat-menu-item (click)="switchLanguage('ar')" 
                [class.active]="currentLanguage === 'ar'">
          <span class="flag">🇸🇦</span>
          <span class="lang-name">العربية</span>
          <mat-icon *ngIf="currentLanguage === 'ar'">check</mat-icon>
        </button>
      </mat-menu>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: inline-block;
    }

    .language-btn {
      position: relative;
    }

    .language-menu {
      min-width: 150px;
    }

    .language-menu button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
    }

    .language-menu button.active {
      background: rgba(66, 153, 225, 0.1);
      color: #4299e1;
    }

    .flag {
      font-size: 1.2em;
    }

    .lang-name {
      flex: 1;
      font-weight: 500;
    }

    .language-menu mat-icon {
      font-size: 1.2em;
      color: #4299e1;
    }
  `]
})
export class LanguageSwitcherComponent {
  currentLanguage = 'en';

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.translationService.getCurrentLanguage().subscribe(lang => {
      this.currentLanguage = lang;
      this.cdr.detectChanges();
    });
  }

  switchLanguage(lang: string): void {
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Set document direction and language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update translation service
    this.translationService.setLanguage(lang);
    
    // Reload page to apply all changes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
