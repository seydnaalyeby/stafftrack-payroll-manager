import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:30000/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, request);
  }

  saveLoginData(response: LoginResponse): void {
    this.saveToken(response.token);
    if (response.refreshToken) {
      this.saveRefreshToken(response.refreshToken);
    }
    this.saveUser({
      id: response.id,
      username: response.username,
      email: response.email
    });
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/register`, request);
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    return this.http.post<LoginResponse>(`${this.API_URL}/refresh-token`, { refreshToken });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    
    // Basic token validation - check if it's a valid JWT format
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.log('Invalid token format, clearing token');
        this.logout();
        return false;
      }
      
      // Check if token is expired (with 5 minute buffer)
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;
      if (payload.exp && payload.exp < now - 300) { // 5 minute buffer
        console.log('Token expired, clearing token');
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.log('Token validation error, clearing token:', error);
      this.logout();
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
