import { Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/location/location.component').then(m => m.LocationComponent ),
    data: {
      title: 'Location'
    }
  },
  {
    path: 'store',
    loadComponent: () => import('./components/store/store.component').then(m =>StoreComponent),
    data: {
      title: 'Store'
    }
  },
  
]