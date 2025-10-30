import { Routes } from '@angular/router';
import { NewPromotionComponent } from '../../../commons/components/new-promotion/new-promotion.component';

/**
 * Child routes for the promotions feature.
 * Import and add these to your parent module's routes, e.g.:
 * { path: 'promotions', children: promotionRoutes }
 */
export const promotionRoutes: Routes = [
    {
        path: '',
        data: {
            title: "Promotion"
        },
        children: [
            {
                path: 'ViewPromotions',
                loadComponent: () => import('./view-promotions/view-promotions.component').then(m => m.ViewPromotionsComponent),
                data: {
                    title: 'View Promotions'
                }
            },
            {
                path: 'NewPromotion',
                loadComponent: () => import('../../../commons/components/new-promotion/new-promotion.component').then(m => m.NewPromotionComponent),
                data: {
                    title: 'New Promotion'
                }
            },
            {
                path: 'details/:id',
                loadComponent: () => import('../../../commons/components/view-promotion-details/view-promotion-details.component').then(m => m.ViewPromotionDetailsComponent),
                data: {
                    title: 'Promotion Details'
                }
            },
            {
                path: '', // Default redirect
                redirectTo: 'ViewPromotions',
                pathMatch: 'full'
            }
        ]
    }
];