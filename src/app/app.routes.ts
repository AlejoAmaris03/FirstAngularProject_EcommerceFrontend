import { Routes } from '@angular/router';
import { adminGuard, authenticatedGuard, authenticationGuard, customerGuard } from './core/guards';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/index-layout/index-layout.component'),
        canActivate: [authenticatedGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./components/index-layout/dashboard/dashboard.component'),
                canActivate: [authenticatedGuard]
            },
            {
                path: 'login',
                loadComponent: () => import('./components/index-layout/login/login.component'),
                canActivate: [authenticatedGuard]
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./components/index-layout/sign-up/sign-up.component'),
                canActivate: [authenticatedGuard]
            },
            {
                path: '',
                redirectTo: "dashboard",
                pathMatch: "full"
            }
        ]
    },
    {
        path: 'admin',
        loadComponent: () => import('./components/admin-layout/admin-layout.component'),
        canActivate: [authenticationGuard, adminGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./components/admin-layout/home/home.component'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'users',
                loadComponent: () => import('./components/admin-layout/users/users.component'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'products',
                loadComponent: () => import('./components/admin-layout/products/products.component'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'product/selected/:id',
                loadComponent: () => import('./components/admin-layout/products/edit-product/edit-product.component'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'sales',
                loadComponent: () => import('./components/admin-layout/sales/sales.component'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: 'sales/receipt/:id',
                loadComponent: () => import('./components/admin-layout/sales/receipt-details/receipt-details.component'),
                canActivate: [authenticationGuard, adminGuard]
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: "full"
            }
        ]
    },
    {
        path: 'home',
        loadComponent: () => import('./components/customer-layout/customer-layout.component'),
        canActivate: [authenticationGuard, customerGuard],
        children: [
            {
                path: 'products',
                loadComponent: () => import('./components/customer-layout/home/home.component'),
                canActivate: [authenticationGuard, customerGuard]
            },
            {
                path: 'purchases',
                loadComponent: () => import('./components/customer-layout/purchases/purchases.component'),
                canActivate: [authenticationGuard, customerGuard]
            },
            {
                path: 'purchases/receipt/:id',
                loadComponent: () => import('./components/customer-layout/purchases/receipt-details/receipt-details.component'),
                canActivate: [authenticationGuard, customerGuard]
            },
            {
                path: '',
                redirectTo: 'products',
                pathMatch: "full"
            }
        ]
    },
    { 
        path: '**', 
        redirectTo: "dashboard", 
        pathMatch: "full" 
    }
];
