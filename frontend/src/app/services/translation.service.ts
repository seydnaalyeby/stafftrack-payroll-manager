import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  private translations: any = {};

  constructor(private http: HttpClient) {
    // Check for saved language preference first
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language || 'en';
    const lang = savedLang || (browserLang.startsWith('ar') ? 'ar' : 'en');
    this.setLanguage(lang);
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLang.asObservable();
  }

  getLanguage(): string {
    return this.currentLang.value;
  }

  setLanguage(lang: string): void {
    this.currentLang.next(lang);
    localStorage.setItem('preferredLanguage', lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string): void {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe(
      (translations) => {
        this.translations = translations;
      },
      (error) => {
        console.error('Failed to load translations:', error);
        // Fallback to English if translation file fails to load
        if (lang !== 'en') {
          this.setLanguage('en');
        }
      }
    );
  }

  translate(key: string, params?: any): string {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value === 'string' && params) {
      // Replace parameters in the translation string
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param] || match;
      });
    }
    
    return typeof value === 'string' ? value : key;
  }

  isRTL(): boolean {
    return this.currentLang.value === 'ar';
  }
}
