import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

/**
 * Role-Based Authorization Guard
 * Checks if the user's role in sessionStorage matches any required role defined in the route data.
 * Redirects to /login if unauthenticated, or /dashboard if unauthorized.
 */
export const AuthRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  // 1. Get the required roles from the route data (e.g., ['Admin'] or ['Store'])
  const requiredRoles = route.data['requiredRoles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    // If no roles are explicitly required, grant access (assuming a preceding AuthGuard handles login)
    return true;
  }

  // 2. Get the user's current role from sessionStorage
  const userRole = sessionStorage.getItem('role');

  // 3. Check for user session/role existence
  if (!userRole) {
    // User is not logged in or role is missing. Redirect to login.
    console.error('AuthRoleGuard: User role not found. Redirecting to login.');
    router.navigate(['/login']);
    return false;
  }

  // 4. Check authorization
  const isAuthorized = requiredRoles.includes(userRole);

  if (isAuthorized) {
    return true; // Role is authorized, grant access
  } else {
    // Role is NOT authorized. Redirect to the 404 page.
    console.error(`AuthRoleGuard: Role '${userRole}' not authorized. Required: ${requiredRoles.join(', ')}`);
    router.navigate(['/401']); // Redirect to a neutral, safe route
    return false;
  }
};