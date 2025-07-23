import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'store',
        loadComponent: () => import('./components/store/store.component').then(m => m.StoreComponent),
        data: {
          title: 'Buttons'
        }
      
      },
      {
        path: 'location',
        loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent ),
        data: {
          title: 'Location'
        }
      }
    ]
  }
];

