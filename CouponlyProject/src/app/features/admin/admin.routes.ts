import { Routes } from '@angular/router';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
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
        path: 'contact',
        loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent),
        data: {
          title: 'contact'
        }
      
      },
      {
        path: 'location',
        loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent ),
        data: {
          title: 'Location'
        }
      },
      {
        path: 'generatecoupon',
        loadComponent: () => import('./components/generate-coupon/generate-coupon.component').then(m => m.GenerateCouponComponent ),
        data: {
          title: 'GenerateCoupon'
        }
      },
      {
        path: 'manageusers',
        loadComponent: () => import('./components/manage-users/manage-users.component').then(m => m.ManageUsersComponent ),
        data: {
          title: 'ManageUsers'
        }
      },
      {
        path: 'redeemhistory',
        loadComponent: () => import('./components/redeem-history/redeem-history.component').then(m => m.RedeemHistoryComponent ),
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
        path: 'promotion', // Route for service costs
        loadComponent: () => import('./components/promotion/promotion.component').then(m => m.PromotionComponent),
        data: {
          title: 'Promotion'
        }
      },
    ]
  }
];

