import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, from, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = new AuthService(null); // This is a simplified approach
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && authService.getRefreshToken()) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            authService.saveLoginData(response);
            
            // Clone the original request with the new token
            const newReq = req.clone({
              setHeaders: req.headers.set('Authorization', `Bearer ${response.token}`)
            });
            
            return next(newReq);
          }),
          catchError((refreshError) => {
            // Refresh failed, logout user
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      
      return throwError(() => error);
    })
  );
};
