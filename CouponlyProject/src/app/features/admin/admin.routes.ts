import { Routes } from '@angular/router';
import { AuthRoleGuard } from '../../app.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthRoleGuard],
    data: {
      title: 'Admin',
      requiredRoles: ['Admin']
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./../../views/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'store',
        loadComponent: () => import('./components/store/store.component').then(m => m.StoreComponent),
        data: {
          title: 'Store'
        }

      },
      {
        path: 'couponlist',
        loadComponent: () => import('./components/coupon-list/coupon-list.component')  .then(m => m.CouponlistComponent),
        data: {
          title: 'Coupon List'
        }
      },
      {
        path: 'contact',
        loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent),
        data: {
          title: 'contact'
        }

      },
      {
        path: 'location',
        loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent),
        data: {
          title: 'Location'
        }
      },
      {
        path: 'generatecoupon/:id',
        loadComponent: () => import('./components/generate-coupon/generate-coupon.component').then(m => m.GenerateCouponComponent),
        data: {
          title: 'GenerateCoupon'
        }
      },
      {
        path: 'manageusers',
        loadComponent: () => import('./components/manage-users/manage-users.component').then(m => m.ManageUsersComponent),
        data: {
          title: 'ManageUsers'
        }
      },
      {
        path: 'redeemhistory',
        loadComponent: () => import('./components/redeem-history/redeem-history.component').then(m => m.RedeemHistoryComponent),
        data: {
          title: 'Redeem History'
        }
      },
      {
        path: 'cost-settings', // Route for platform fee
        loadComponent: () => import('./components/cost-setting-ui/cost-setting-ui.component').then(m => m.CostSettingUIComponent),
        data: {
          title: 'Cost Settings'
        }
      },
      {
        path: 'promotion',
        loadChildren: () => import('./components/promotion/promotions.routes').then(m => m.promotionRoutes),
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];

