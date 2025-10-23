import { Routes } from '@angular/router';
import { AuthRoleGuard } from '../../app.guard';

export const storeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../store/header/header.component').then(m => m.HeaderComponent),
        canActivate: [AuthRoleGuard],
        data: {
            title: 'Store Admin',
            requiredRoles: ['Store']
        },
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('../store/counts-tabs/counts-tabs.component').then(m => m.CountsTabsComponent),
                data: {
                    title: 'Dashboard'
                }
            },
            {
                path: 'counts-tabs',
                loadComponent: () => import('../store/counts-tabs/counts-tabs.component').then(m => m.CountsTabsComponent),
                data: {
                    title: 'Counts Tabs'
                }
            },
            {
                path: 'designed-coupons',
                loadComponent: () => import('../store/designed-coupons/designed-coupons.component').then(m => m.DesignedCouponsComponent),
                data: {
                    title: 'Designed Coupons'
                }
            },
            {
                path: 'store-info',
                loadComponent: () => import('../store/store-info/store-info.component').then(m => m.StoreInfoComponent),
                data: {
                    title: 'Store Info'
                }
            },
            {
                path: 'redeem-history',
                loadComponent: () => import('../store/redeem-history/redeem-history.component').then(m => m.RedeemHistoryComponent),
                data: {
                    title: 'Redeem History'
                }
            },
            {
                path: 'promotion-history',
                loadComponent: () => import('../store/promotion-history/promotion-history.component').then(m => m.PromotionHistoryComponent),
                data: {
                    title: 'Promotion History'
                }
            },
            {
                path: '', // Default redirect
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];