import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    data: {
      title: ''
    },
    children: [
      
      // {
      //   path: 'location',
      //   loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes)
      // },
      // {
      //   path: 'theme',
      //   loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'base',
      //   loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'pages',
      //   loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      // },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes)
      },
      {
        path: 'store',
        loadChildren: () => import('./features/store/store.routes').then((m) => m.storeRoutes)
      },
      
    ]
  },
  {
    path: 'payment',
    loadComponent: () => import('./features/admin/pages/payment/payment.component').then(m => m.PaymentComponent),
    data: {
      title: 'Payment'
    }
  },
  {
      path: 'redeem-store',
      loadComponent: () => import('./features/store/redeem-store/redeem-store.component').then(m => m.RedeemStoreComponent),
      data: {
          title: 'Redeem Store'
      }
  },
  {
      path: 'redeemdemo',
      loadComponent: () => import('./features/commons/redeem-store-demo/redeem-store-demo.component').then(m => m.RedeemStoreDemoComponent),
      data: {
          title: 'Redeem Demo'
      }
  },
  {
      path: 'logindemo',
      loadComponent: () => import('./features/commons/pages/logindemo/logindemo.component').then(m => m.LogindemoComponent),
      data: {
          title: 'Login Demo'
      }
  },
  {
    path: '401',
    loadComponent: () => import('./views/pages/page401/page401.component').then(m => m.Page401Component),
    data: {
      title: 'Page 401'
    }
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./features/authentication/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
    {
    path: 'forgot-password',
    loadComponent: () => import('./features/authentication/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    data: {
      title: 'forgot-password'
    }
  },
     {
    path: 'resetpassword',
    loadComponent: () => import('./features/authentication/resetpassword/resetpassword.component').then(m => m.ResetpasswordComponent),
    data: {
      title: 'resetpassword'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  
  { path: '**', redirectTo: '500' }
];
