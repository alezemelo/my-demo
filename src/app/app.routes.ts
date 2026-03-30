
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./products/components/product-page/product-page.component').then(m => m.ProductPageComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./randomUsers/pages/random-users-page/random-users-page.component').then(m => m.RandomUsersPageComponent)
    },
    {
        path: 'second-observable',
        loadComponent: () => import('./products/components/second-osservable-component/second-osservable-component.component').then(m => m.SecondOsservableComponentComponent)
    },
    {
        path: 'welcome',
        loadComponent: () => import('./shared/welcome/welcome.component').then(m => m.WelcomeComponent)
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
