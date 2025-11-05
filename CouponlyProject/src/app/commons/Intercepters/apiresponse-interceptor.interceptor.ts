import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // Correct import
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the Router service
  const router = inject(Router);

  return next(req).pipe(
    // Use 'tap' for side effects like logging or navigation
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401 && event.headers.get('www-authenticate')) {
            // redirect to login page when server requests authentication
            window.location.replace('/login');
          }
        }
      },
      // You must check for the header on the ERROR response (e.g., 401)
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          // Check if it's a 401 Unauthorized and has the header
          if (err.status === 401 && !err.headers.get('www-authenticate')) {
            // redirect to login page using Angular's Router
            console.log('Authentication required. Redirecting to login...');
            router.navigate(['/login']);
          }
        }
      }
      // 'next' (for successful responses) is not needed for this logic
    })
  );
};