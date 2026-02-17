import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="excellent-auth">
      <!-- Animated Background -->
      <div class="bg-animation">
        <div class="bg-layer layer-1"></div>
        <div class="bg-layer layer-2"></div>
        <div class="bg-layer layer-3"></div>
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
          <div class="shape shape-6"></div>
        </div>
      </div>

      <!-- Main Container -->
      <div class="auth-container">
        <div class="auth-card">
          <!-- Header Section -->
          <div class="auth-header">
            <div class="logo-section">
              <div class="logo-wrapper">
                <div class="logo-glow"></div>
                <div class="logo-circle">
                  <mat-icon class="logo-icon">business</mat-icon>
                </div>
              </div>
              <h1 class="logo-title">EquipePay</h1>
              <p class="logo-subtitle">Enterprise Workforce Management</p>
            </div>
            
            <div class="header-decoration">
              <div class="decoration-line"></div>
              <span class="decoration-text">Join Premium</span>
              <div class="decoration-line"></div>
            </div>
          </div>

          <!-- Register Form -->
          <div class="auth-body">
            <div class="form-intro">
              <h2 class="form-title">Create Account</h2>
              <p class="form-subtitle">Start your journey to smarter workforce management</p>
            </div>

            <form class="auth-form" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <!-- Name Fields -->
              <div class="form-row">
                <div class="form-field half">
                  <label class="field-label">
                    <mat-icon class="field-icon">person_outline</mat-icon>
                    <span>First Name</span>
                  </label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      class="field-input" 
                      formControlName="firstName" 
                      placeholder="Enter first name"
                      [class.error]="firstName?.invalid && firstName?.touched"
                    >
                    <div class="input-border"></div>
                  </div>
                  <div class="field-error" *ngIf="firstName?.invalid && firstName?.touched">
                    <mat-icon class="error-icon">error_outline</mat-icon>
                    <span>First name required</span>
                  </div>
                </div>

                <div class="form-field half">
                  <label class="field-label">
                    <mat-icon class="field-icon">person_outline</mat-icon>
                    <span>Last Name</span>
                  </label>
                  <div class="input-wrapper">
                    <input 
                      type="text" 
                      class="field-input" 
                      formControlName="lastName" 
                      placeholder="Enter last name"
                      [class.error]="lastName?.invalid && lastName?.touched"
                    >
                    <div class="input-border"></div>
                  </div>
                  <div class="field-error" *ngIf="lastName?.invalid && lastName?.touched">
                    <mat-icon class="error-icon">error_outline</mat-icon>
                    <span>Last name required</span>
                  </div>
                </div>
              </div>

              <!-- Email Field -->
              <div class="form-field">
                <label class="field-label">
                  <mat-icon class="field-icon">email_outline</mat-icon>
                  <span>Email Address</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    type="email" 
                    class="field-input" 
                    formControlName="email" 
                    placeholder="Enter your email"
                    [class.error]="email?.invalid && email?.touched"
                  >
                  <div class="input-border"></div>
                </div>
                <div class="field-error" *ngIf="email?.invalid && email?.touched">
                  <mat-icon class="error-icon">error_outline</mat-icon>
                  <span>Valid email required</span>
                </div>
              </div>

              <!-- Username Field -->
              <div class="form-field">
                <label class="field-label">
                  <mat-icon class="field-icon">badge_outline</mat-icon>
                  <span>Username</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    type="text" 
                    class="field-input" 
                    formControlName="username" 
                    placeholder="Choose a username"
                    [class.error]="username?.invalid && username?.touched"
                  >
                  <div class="input-border"></div>
                </div>
                <div class="field-error" *ngIf="username?.invalid && username?.touched">
                  <mat-icon class="error-icon">error_outline</mat-icon>
                  <span>Username required</span>
                </div>
              </div>

              <!-- Password Fields -->
              <div class="form-field">
                <label class="field-label">
                  <mat-icon class="field-icon">lock_outline</mat-icon>
                  <span>Password</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    type="password" 
                    class="field-input" 
                    formControlName="password" 
                    placeholder="Create strong password"
                    [class.error]="password?.invalid && password?.touched"
                  >
                  <div class="input-border"></div>
                </div>
                <div class="field-error" *ngIf="password?.invalid && password?.touched">
                  <mat-icon class="error-icon">error_outline</mat-icon>
                  <span>Min 6 characters</span>
                </div>
              </div>

              <div class="form-field">
                <label class="field-label">
                  <mat-icon class="field-icon">lock_outline</mat-icon>
                  <span>Confirm Password</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    type="password" 
                    class="field-input" 
                    formControlName="confirmPassword" 
                    placeholder="Confirm your password"
                    [class.error]="confirmPassword?.invalid && confirmPassword?.touched"
                  >
                  <div class="input-border"></div>
                </div>
                <div class="field-error" *ngIf="confirmPassword?.invalid && confirmPassword?.touched">
                  <mat-icon class="error-icon">error_outline</mat-icon>
                  <span>Passwords must match</span>
                </div>
              </div>

              <!-- Terms -->
              <div class="form-options">
                <label class="checkbox-wrapper">
                  <input type="checkbox" class="checkbox" formControlName="agreeTerms">
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-label">I agree to Terms & Privacy Policy</span>
                </label>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="submit-btn" [disabled]="registerForm.invalid || registerForm.pending || isLoading">
                <span class="btn-text" *ngIf="!isLoading">Create Account</span>
                <div class="btn-loading" *ngIf="isLoading">
                  <div class="loading-spinner"></div>
                  <span>Creating Account...</span>
                </div>
                <div class="btn-glow"></div>
              </button>
            </form>

            <!-- Social Section -->
            <div class="social-section">
              <div class="divider">
                <span class="divider-text">Or sign up with</span>
              </div>
              <div class="social-buttons">
                <button class="social-btn google">
                  <mat-icon class="social-icon">mail</mat-icon>
                  <span>Google</span>
                </button>
                <button class="social-btn microsoft">
                  <mat-icon class="social-icon">business</mat-icon>
                  <span>Microsoft</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="auth-footer">
            <p class="footer-text">
              Already have an account? 
              <a routerLink="/login" class="login-link">Sign In</a>
            </p>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <span class="separator">•</span>
              <a href="#" class="footer-link">Terms of Service</a>
            </div>
          </div>
        </div>

        <!-- Side Panel -->
        <div class="side-panel">
          <div class="side-content">
            <div class="side-header">
              <h3 class="side-title">Join 10,000+ Companies</h3>
              <p class="side-subtitle">Transform your workforce management with our premium platform</p>
            </div>
            
            <div class="benefits-list">
              <div class="benefit-item">
                <mat-icon class="benefit-icon">rocket_launch</mat-icon>
                <div class="benefit-content">
                  <h4 class="benefit-title">Quick Setup</h4>
                  <p class="benefit-desc">Get started in under 5 minutes</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon class="benefit-icon">workspace_premium</mat-icon>
                <div class="benefit-content">
                  <h4 class="benefit-title">Premium Features</h4>
                  <p class="benefit-desc">Access all advanced tools</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon class="benefit-icon">support_agent</mat-icon>
                <div class="benefit-content">
                  <h4 class="benefit-title">24/7 Support</h4>
                  <p class="benefit-desc">Expert help whenever needed</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon class="benefit-icon">security</mat-icon>
                <div class="benefit-content">
                  <h4 class="benefit-title">Secure Platform</h4>
                  <p class="benefit-desc">Bank-level security standards</p>
                </div>
              </div>
            </div>

            <div class="stats-section">
              <div class="stat-item">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Active Users</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">99.9%</span>
                <span class="stat-label">Uptime</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">4.9★</span>
                <span class="stat-label">User Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .excellent-auth {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* Animated Background */
    .bg-animation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .bg-layer {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .layer-1 {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #667eea 50%, #764ba2 75%, #f093fb 100%);
      animation: gradientShift 15s ease infinite;
    }

    .layer-2 {
      background: radial-gradient(circle at 20% 80%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.3) 0%, transparent 50%);
      animation: pulseLayer 20s ease infinite alternate;
    }

    .layer-3 {
      background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
      animation: pulseLayer 25s ease infinite alternate-reverse;
    }

    @keyframes gradientShift {
      0%, 100% { transform: translateX(0) scale(1); }
      50% { transform: translateX(-10%) scale(1.1); }
    }

    @keyframes pulseLayer {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }

    .floating-shapes {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .shape-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 5%;
      animation: floatShape 20s ease-in-out infinite;
    }

    .shape-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      left: 80%;
      animation: floatShape 25s ease-in-out infinite reverse;
    }

    .shape-3 {
      width: 100px;
      height: 100px;
      top: 30%;
      left: 60%;
      animation: floatShape 18s ease-in-out infinite;
    }

    .shape-4 {
      width: 180px;
      height: 180px;
      top: 70%;
      left: 20%;
      animation: floatShape 22s ease-in-out infinite reverse;
    }

    .shape-5 {
      width: 120px;
      height: 120px;
      top: 15%;
      left: 40%;
      animation: floatShape 30s ease-in-out infinite;
    }

    .shape-6 {
      width: 80px;
      height: 80px;
      top: 80%;
      left: 50%;
      animation: floatShape 15s ease-in-out infinite reverse;
    }

    @keyframes floatShape {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      25% { transform: translateY(-30px) rotate(90deg) scale(1.1); }
      50% { transform: translateY(-15px) rotate(180deg) scale(0.9); }
      75% { transform: translateY(-40px) rotate(270deg) scale(1.05); }
    }

    /* Main Container */
    .auth-container {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      min-height: 100vh;
      backdrop-filter: blur(10px);
    }

    .auth-card {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      padding: 3rem;
      overflow-y: auto;
    }

    .side-panel {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(30px);
      display: flex;
      align-items: center;
      padding: 3rem;
      overflow-y: auto;
    }

    /* Header Section */
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-section {
      margin-bottom: 2rem;
    }

    .logo-wrapper {
      position: relative;
      display: inline-block;
      margin-bottom: 1.5rem;
    }

    .logo-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      border-radius: 50%;
      filter: blur(20px);
      opacity: 0.6;
      animation: glowPulse 3s ease-in-out infinite;
    }

    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }

    .logo-circle {
      position: relative;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(240, 147, 251, 0.3);
      z-index: 1;
    }

    .logo-icon {
      font-size: 2.5rem;
      color: white;
    }

    .logo-title {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.02em;
    }

    .logo-subtitle {
      font-size: 0.95rem;
      color: #718096;
      margin: 0;
      font-weight: 500;
    }

    .header-decoration {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .decoration-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
    }

    .decoration-text {
      font-size: 0.75rem;
      color: #a0aec0;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Form Section */
    .auth-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .form-intro {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
    }

    .form-subtitle {
      font-size: 1rem;
      color: #718096;
      margin: 0;
      line-height: 1.5;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .form-field.half {
      width: 100%;
    }

    .field-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #4a5568;
      font-size: 0.875rem;
    }

    .field-icon {
      font-size: 1.125rem;
      color: #f093fb;
    }

    .input-wrapper {
      position: relative;
    }

    .field-input {
      width: 100%;
      padding: 1rem 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 0.95rem;
      background: #f7fafc;
      transition: all 0.3s ease;
      color: #2d3748;
    }

    .field-input:focus {
      outline: none;
      border-color: #f093fb;
      background: white;
      box-shadow: 0 0 0 4px rgba(240, 147, 251, 0.1);
    }

    .field-input.error {
      border-color: #f56565;
      background: #fff5f5;
    }

    .input-border {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #f093fb, #f5576c);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .field-input:focus ~ .input-border {
      transform: scaleX(1);
    }

    .field-error {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #f56565;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .error-icon {
      font-size: 0.875rem;
    }

    .form-options {
      margin: 0.5rem 0;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
    }

    .checkbox {
      position: relative;
      width: 20px;
      height: 20px;
      appearance: none;
      border: 2px solid #e2e8f0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .checkbox:checked {
      background: linear-gradient(135deg, #f093fb, #f5576c);
      border-color: #f093fb;
    }

    .checkbox-custom {
      position: absolute;
      top: 3px;
      left: 6px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .checkbox:checked ~ .checkbox-custom {
      opacity: 1;
    }

    .checkbox-label {
      font-size: 0.875rem;
      color: #4a5568;
      line-height: 1.4;
    }

    .submit-btn {
      position: relative;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      overflow: hidden;
      margin-top: 1rem;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(240, 147, 251, 0.4);
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .btn-glow {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }

    .submit-btn:hover .btn-glow {
      left: 100%;
    }

    .btn-text {
      position: relative;
      z-index: 1;
    }

    .btn-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      position: relative;
      z-index: 1;
    }

    .loading-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Social Section */
    .social-section {
      margin-top: 2rem;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e2e8f0;
    }

    .divider-text {
      font-size: 0.75rem;
      color: #a0aec0;
      font-weight: 500;
    }

    .social-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .social-btn:hover {
      border-color: #cbd5e0;
      background: #f7fafc;
      transform: translateY(-1px);
    }

    .social-icon {
      font-size: 1rem;
    }

    /* Footer */
    .auth-footer {
      margin-top: auto;
      padding-top: 2rem;
      text-align: center;
    }

    .footer-text {
      color: #718096;
      font-size: 0.875rem;
      margin: 0 0 1rem 0;
    }

    .login-link {
      color: #f093fb;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .login-link:hover {
      color: #f5576c;
      text-decoration: underline;
    }

    .footer-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 0.75rem;
    }

    .footer-link {
      color: #a0aec0;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-link:hover {
      color: #718096;
    }

    .separator {
      color: #e2e8f0;
    }

    /* Side Panel */
    .side-content {
      max-width: 500px;
      margin: 0 auto;
    }

    .side-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .side-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .side-subtitle {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      line-height: 1.6;
    }

    .benefits-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .benefit-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }

    .benefit-item:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateX(10px);
    }

    .benefit-icon {
      font-size: 2rem;
      color: white;
    }

    .benefit-title {
      font-size: 1rem;
      font-weight: 600;
      color: white;
      margin: 0 0 0.25rem 0;
    }

    .benefit-desc {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    .stats-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 1.5rem 1rem;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .auth-container {
        grid-template-columns: 1fr;
      }

      .side-panel {
        display: none;
      }

      .auth-card {
        border-right: none;
      }
    }

    @media (max-width: 768px) {
      .auth-card {
        padding: 2rem;
      }

      .logo-title {
        font-size: 2rem;
      }

      .form-title {
        font-size: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .social-buttons {
        grid-template-columns: 1fr;
      }

      .stats-section {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 1.5rem;
      }

      .logo-title {
        font-size: 1.75rem;
      }

      .form-options {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get agreeTerms() { return this.registerForm.get('agreeTerms'); }

  passwordMatchValidator(form: any) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      setTimeout(() => {
        this.isLoading = true;
      });
      const registerRequest: RegisterRequest = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      this.authService.register(registerRequest).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.isLoading = false;
          });
          this.snackBar.open('Registration successful! Please login.', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          setTimeout(() => {
            this.isLoading = false;
          });
          this.snackBar.open('Registration failed: ' + (error.message || 'Please try again'), 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
