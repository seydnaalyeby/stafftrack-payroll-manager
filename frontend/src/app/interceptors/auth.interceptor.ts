import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  // Don't intercept auth endpoints to prevent login loops
  if (req.url.includes('/api/auth/')) {
    return next(req);
  }
  
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Auth interceptor error:', error.status, error.url);
        // Only redirect on 401 (unauthorized) - 403 might be permission issues
        if (error.status === 401) {
          console.log('Token invalid, redirecting to login');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          // Only redirect if not already on login page to prevent loops
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
        return throwError(() => error);
      })
    );
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('No token interceptor error:', error.status, error.url);
      // Only redirect on 401 (unauthorized)
      if (error.status === 401) {
        console.log('No token, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        // Only redirect if not already on login page to prevent loops
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      return throwError(() => error);
    })
  );
};
