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
                path: 'redeem-store',
                loadComponent: () => import('../store/redeem-store/redeem-store.component').then(m => m.RedeemStoreComponent),
                data: {
                    title: 'Redeem Store'
                }
            },

            {
                path: 'promotion',
                data: {
                    title: 'Promotion'
                },
                children: [
                    {
                        path: 'history',
                        loadComponent: () => import('../store/promotion-history/promotion-history.component').then(m => m.PromotionHistoryComponent),
                        data: {
                            title: 'Promotion History'
                        }
                    },
                    {
                        path: 'new-promotion',
                        loadComponent: () => import('../commons/components/new-promotion/new-promotion.component').then(m => m.NewPromotionComponent),
                        data: {
                            title: 'New Promotion'
                        }
                    },
                    {
                        path: 'view/:id',
                        loadComponent: () => import('../commons/components/view-promotion-details/view-promotion-details.component').then(m => m.ViewPromotionDetailsComponent),
                        data: {
                            title: 'View Promotion'
                        }
                    }
                ]
            },

            {
                path: 'promotion-history',
                loadComponent: () => import('../store/promotion-history/promotion-history.component').then(m => m.PromotionHistoryComponent),
                data: {
                    title: 'Promotion History'
                }
            },
            {
                path: 'NewPromotion',
                loadComponent: () => import('../commons/components/new-promotion/new-promotion.component').then(m => m.NewPromotionComponent),
                data: {
                    title: 'New Promotion'
                }
            },
            {
                path: 'change-password',
                loadComponent: () => import('../store/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                data: {
                    title: 'Change Password'
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