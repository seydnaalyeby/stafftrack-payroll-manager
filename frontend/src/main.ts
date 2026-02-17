/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Set document direction based on saved language preference
const savedLang = localStorage.getItem('preferredLanguage');
const browserLang = navigator.language || 'en';
const lang = savedLang || (browserLang.startsWith('ar') ? 'ar' : 'en');
const isRTL = lang === 'ar';

document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
document.documentElement.lang = lang;

bootstrapApplication(AppComponent, appConfig)
  .catch((err: any) => console.error(err));
